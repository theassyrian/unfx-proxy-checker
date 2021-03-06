import Core from '../core';
import Judges from '../core/judges';
import check from 'check-types';
import { uniq } from '../misc/uniq';
import { findProxies, isURL, isIP } from '../misc/regexes';
import { saveSettings } from '../core/settings';
import { IpLookup } from './OverlayIpActions';
import { UP_COUNTER_STATUS, TOGGLE_CHECKING_OPEN } from '../constants/ActionTypes';

const validateCore = options => {
    options.threads = parseInt(options.threads);
    options.timeout = parseInt(options.timeout);

    if (check.inRange(options.threads, 1, 500) && check.inRange(options.timeout, 1000, 60000)) {
        return true;
    }

    throw new Error('Min threads 1, Max 500. Min timeout 1000, Max 60000');
};

const validateJudges = (judges, targetProtocols) => {
    if (targetProtocols.includes('https') && !judges.some(item => item.ssl)) {
        throw new Error('You have no judges for HTTPS');
    }

    if (targetProtocols.some(protocol => ['http', 'socks4', 'socks5'].includes(protocol)) && !judges.some(item => !item.ssl)) {
        throw new Error('You have no judges for HTTP/SOCKS4/SOCKS5');
    }

    if (judges.every(item => isURL(item.url))) {
        return true;
    }

    throw new Error('Judge URL is not correct');
};

const transformProtocols = protocols => {
    const enabledProtocols = Object.keys(protocols).filter(protocol => protocols[protocol]);

    if (enabledProtocols.length > 0) {
        return enabledProtocols;
    }

    throw new Error('Select protocols');
};

const parseInputProxies = list => {
    try {
        return uniq(findProxies(list));
    } catch (error) {
        throw new Error('No proxies found');
    }
};

export const start = () => async (dispatch, getState) => {
    try {
        const { core, judges, ip, input, checking, overlay } = getState();

        if (overlay.judges.locked || overlay.ip.locked || checking.isOpened) {
            return;
        }

        const proxies = parseInputProxies(input);
        const protocols = transformProtocols(core.protocols);

        validateJudges(judges.items, protocols);
        validateCore(core);

        const initJudges = await new Judges(judges, protocols);
        const chainCheck = ip => Core.start(proxies, core, initJudges, protocols, ip);

        if (isIP(ip.current)) {
            chainCheck(ip.current);
        } else {
            dispatch(IpLookup(chainCheck));
        }

        saveSettings({
            core,
            judges,
            ip: {
                lookupUrl: ip.lookupUrl
            }
        });
    } catch (error) {
        alert(error);
    }
};

export const stop = () => () => Core.stop();

export const toggleOpen = () => ({
    type: TOGGLE_CHECKING_OPEN
});

export const upCounterStatus = counter => ({
    type: UP_COUNTER_STATUS,
    counter
});
