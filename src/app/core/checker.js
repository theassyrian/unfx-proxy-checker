import rp from 'request-promise';
import ProxyAgent from 'proxy-agent';
import store from '../store/index';
import { uniq } from '../misc/uniq';
import { getCountryByIP } from './country/main';
import { EventEmitter } from 'events';

EventEmitter.defaultMaxListeners = 0;

class Checker {
    constructor(proxies, options, judges, checkProtocols) {
        this.list = []; // for complete proxies state
        this.checkProtocols = checkProtocols;
        this.doneLevel = checkProtocols.length;
        this.tempStates = {
            // for temporary check states
            // this.initProxyState()
        };

        this.timeout = options.timeout;
        this.judges = judges;
        this.pool = {
            running: 0,
            limit: options.threads,
            queue: proxies
        };

        this.counter = this.initCounter();
        this.checkAt = {
            async http(proxy) {
                try {
                    const response = await rp.get(this.getRequestConfig({ agent: this.getAgentConfig('http://', proxy) }));
                    this.onResponse(response, proxy, 'http', 'usual');
                } catch (error) {
                    this.handleError(proxy);
                }
            },
            async https(proxy) {
                try {
                    const response = await rp.get(this.getRequestConfig({ url: this.judges.ssl.url, agent: this.getAgentConfig('http://', proxy) }));
                    this.onResponse(response, proxy, 'https', 'ssl');
                } catch (error) {
                    this.handleError(proxy);
                }
            },
            async socks4(proxy) {
                try {
                    const response = await rp.get(this.getRequestConfig({ agent: this.getAgentConfig('socks4://', proxy) }));
                    this.onResponse(response, proxy, 'socks4', 'usual');
                } catch (error) {
                    this.handleError(proxy);
                }
            },
            async socks5(proxy) {
                try {
                    const response = await rp.get(this.getRequestConfig({ agent: this.getAgentConfig('socks5://', proxy) }));
                    this.onResponse(response, proxy, 'socks5', 'usual');
                } catch (error) {
                    this.handleError(proxy);
                }
            }
        };

        this.check = this.buildCheck(this.checkProtocols);
    }

    initCounter() {
        let counter = {
            all: this.pool.queue.length,
            done: 0
        };

        this.checkProtocols.forEach(protocol => {
            counter[protocol] = 0;
        });

        return counter;
    }

    getIp() {
        return rp.get({ url: 'https://api.openproxy.space/ip', timeout: 15000, headers: { 'User-Agent': 'UNFX IP LOOKUP' } });
    }

    initTempState(proxy) {
        this.tempStates[proxy] = {
            timeouts: [],
            anons: [],
            doneLevel: 0,
            protocols: []
        };
    }

    getAnon(text) {
        if (text.match(new RegExp(this.ip, 'g'))) {
            return 'transparent';
        }

        if (text.match(new RegExp('HTTP_VIA', 'g'))) {
            return 'anonymous';
        }

        return 'elite';
    }

    isMaxed() {
        return this.pool.running >= this.pool.limit;
    }

    next() {
        this.pool.running--;
        this.run();
    }

    validateResponse(body, judge) {
        return body.match(new RegExp(this.judges[judge].validateString, 'g'));
    }

    onResponse(response, proxy, type, judge) {
        if (this.validateResponse(response.body, judge)) {
            this.tempStates[proxy].timeouts.push(response.elapsedTime);
            this.tempStates[proxy].protocols.push(type);
            this.tempStates[proxy].anons.push(this.getAnon(response.body));
            this.counter[type]++;
        }

        this.tempStates[proxy].doneLevel++;
        this.isDone(proxy);
    }

    handleError(proxy) {
        this.tempStates[proxy].doneLevel++;
        this.isDone(proxy);
    }

    getAgentConfig(scheme, proxy) {
        let agent = new ProxyAgent(scheme + proxy);
        agent.timeout = this.timeout;
        return agent;
    }

    getRequestConfig(mergeConfig) {
        const initial = {
            time: true,
            timeout: this.timeout,
            resolveWithFullResponse: true,
            url: this.judges.usual.url
        };

        return {
            ...initial,
            ...mergeConfig
        };
    }

    buildCheck(protocols) {
        if (protocols.length == 1) {
            return this.checkAt[protocols[0]];
        }

        if (protocols.length == 4) {
            const all = proxy => {
                this.checkAt.http.call(this, proxy);
                this.checkAt.https.call(this, proxy);
                this.checkAt.socks4.call(this, proxy);
                this.checkAt.socks5.call(this, proxy);
            };

            return all;
        }

        const other = proxy => {
            protocols.forEach(protocol => {
                this.checkAt[protocol].call(this, proxy);
            });
        };

        return other;
    }

    isDone(proxy) {
        if (this.tempStates[proxy].doneLevel == this.doneLevel) {
            this.counter.done++;

            if (this.tempStates[proxy].protocols.length > 0) {
                const split = proxy.split(':');
                const country = getCountryByIP(split[0]);

                this.list.push({
                    ip: split[0],
                    port: split[1],
                    timeouts: this.tempStates[proxy].timeouts,
                    anons: uniq(this.tempStates[proxy].anons),
                    protocols: this.tempStates[proxy].protocols,
                    country: {
                        name: country.name,
                        city: country.city,
                        flag: country.flag
                    }
                });
            }

            delete this.tempStates[proxy];

            if (this.counter.done == this.counter.all) {
                store.dispatch({ type: 'ADD_PROXY', list: this.list });
                this.dispatchDone();
            } else {
                this.next();
            }
        }

        store.dispatch({ type: 'UP_STATUS', counter: this.counter });
    }

    run() {
        if (this.isMaxed() || this.pool.queue.length == 0) {
            return;
        }

        this.pool.running++;
        const proxy = this.pool.queue.shift();
        this.initTempState(proxy);
        this.check.call(this, proxy);
    }

    async start(dispatchDone) {
        try {
            this.ip = await this.getIp();
        } catch (error) {
            alert('Ip lookup fail. Try later.');
            dispatchDone();
            return;
        }

        this.dispatchDone = dispatchDone;
        this.counter.all = this.pool.queue.length;
        store.dispatch({ type: 'UP_STATUS', counter: this.counter });
        let startPoolThreadsCount = this.pool.queue.length > this.pool.limit ? this.pool.limit : this.pool.queue.length;

        setTimeout(() => {
            for (let index = 0; index < startPoolThreadsCount; index++) {
                this.run();
            }
        }, 300);
    }
}

export default Checker;
