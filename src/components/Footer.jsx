import React from 'react';
import { shell } from 'electron';
import { currentVersion } from '../core/updater';

import '../../public/styles/Footer.postcss';

const Footer = () => {
    const openLink = e => {
        e.preventDefault();
        shell.openExternal(e.currentTarget.href || e.currentTarget.getAttribute('xlink:href'));
    };

    return (
        <div className="footer">
            <div className="marks">
                <span className="copyright">©</span>
                <span className="copyright">assnctr</span>
                <a href="https://openproxy.space" title="Open https://openproxy.space" onClick={openLink}>openproxy.space</a>
                <h4>Unfx proxy checker <span>v{currentVersion}</span></h4>
                <span>2018</span>
            </div>
            <div className="socials">
                <a title="Donate">
                    <svg xlinkHref="https://openproxy.space/donate" onClick={openLink} className="donate-svg" x="0px" y="0px" viewBox="0 0 51.997 51.997">
                        <path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905   c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478   c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014   C52.216,18.553,51.97,16.611,51.911,16.242z M49.521,21.261c-0.984,4.172-3.265,7.973-6.59,10.985L25.855,47.481L9.072,32.25   c-3.331-3.018-5.611-6.818-6.596-10.99c-0.708-2.997-0.417-4.69-0.416-4.701l0.015-0.101C2.725,9.139,7.806,3.826,14.158,3.826   c4.687,0,8.813,2.88,10.771,7.515l0.921,2.183l0.921-2.183c1.927-4.564,6.271-7.514,11.069-7.514   c6.351,0,11.433,5.313,12.096,12.727C49.938,16.57,50.229,18.264,49.521,21.261z" />
                    </svg>
                </a>
                <a title="Facebook">
                    <svg xlinkHref="https://www.facebook.com/openproxyspace/" onClick={openLink} className="fb-svg" x="0px" y="0px" viewBox="0 0 512 512">
                        <path d="M134.941,272.691h56.123v231.051c0,4.562,3.696,8.258,8.258,8.258h95.159  c4.562,0,8.258-3.696,8.258-8.258V273.78h64.519c4.195,0,7.725-3.148,8.204-7.315l9.799-85.061c0.269-2.34-0.472-4.684-2.038-6.44  c-1.567-1.757-3.81-2.763-6.164-2.763h-74.316V118.88c0-16.073,8.654-24.224,25.726-24.224c2.433,0,48.59,0,48.59,0  c4.562,0,8.258-3.698,8.258-8.258V8.319c0-4.562-3.696-8.258-8.258-8.258h-66.965C309.622,0.038,308.573,0,307.027,0  c-11.619,0-52.006,2.281-83.909,31.63c-35.348,32.524-30.434,71.465-29.26,78.217v62.352h-58.918c-4.562,0-8.258,3.696-8.258,8.258  v83.975C126.683,268.993,130.379,272.691,134.941,272.691z"/>
                    </svg>
                </a>
                <a title="Github">
                    <svg xlinkHref="https://github.com/assnctr" onClick={openLink} className="github-svg" x="0px" y="0px" viewBox="0 0 90 90">
                        <path d="M65.709,10.5c1.17,2.657,1.928,7.07,0.797,10.301c4.625,3.949,6.215,13.549,3.982,21.394   C77.08,42.698,84.932,41.953,90,43.976c-4.738-0.609-11.209-1.804-17.32-1.388c-1.158,0.079-2.873-0.044-2.789,1.585   c7.074,0.555,14.104,1.16,19.912,2.973c-5.761-0.941-12.754-2.375-19.912-2.574c-2.957,5.835-8.908,8.703-17.123,9.307   c0.883,1.922,2.574,2.653,2.987,5.744c0.616,4.618-0.964,11.381,0.595,14.459c0.748,1.475,1.967,1.514,2.789,2.775   c-2.012,2.381-7-0.268-7.568-2.775c-0.973-4.295,1.482-10.953-1.192-13.865c0.188,4.685-1.108,11.264,0.199,15.449   c0.515,1.646,2.002,2.281,1.593,3.766c-9.352,0.949-5.443-12.104-6.972-19.81c-1.411,0.101-0.791,2.113-0.796,2.972   c-0.04,7.524,1.54,17.844-6.57,16.838c-0.237-1.582,1.088-2.119,1.593-3.563c1.479-4.233-0.277-10.542,0.401-15.651   c-3.095,2.334,0.325,10.48-1.593,14.657c-1.105,2.404-4.666,3.45-7.367,2.377c0.352-1.79,2.2-1.501,2.984-3.169   c1.096-2.324,0.008-5.674,0.399-9.111c-5.729,1.144-10.173-0.166-12.348-3.764c-0.973-1.615-1.214-3.52-2.39-4.951   c-1.17-1.432-3.04-1.625-3.582-3.563c7.095-1.708,7.367,7.302,13.739,7.524c1.954,0.071,2.97-0.563,4.778-0.988   c0.506-2.272,1.589-3.967,3.186-5.153c-7.929-1.085-14.477-3.554-17.522-9.504c-7.208,0.354-13.804,1.317-19.913,2.771   c5.545-2.014,12.384-2.736,19.715-2.973c-0.432-2.596-4.219-1.882-6.57-1.782C8.973,42.781,3.473,43.324,0,43.976   c5.034-1.795,12.098-1.571,18.918-1.585c-2.086-6.54-1.363-16.929,3.186-20.798C20.815,18.344,21.215,13.03,22.9,10.5   c5.079,0.228,8.159,2.443,11.35,4.557c3.957-1.125,8.118-1.685,13.54-1.387c2.28,0.126,4.651,1.151,6.369,0.989   c1.685-0.158,3.542-2.049,5.178-2.771C61.468,10.947,63.271,10.588,65.709,10.5z"/>
                    </svg>
                </a>
                <a title="VK">
                    <svg xlinkHref="https://vk.com/openproxyspace" onClick={openLink} className="vk-svg" x="0px" y="0px" viewBox="0 0 512 512">
                        <path d="M440.649,295.361c16.984,16.582,34.909,32.182,50.142,50.436  c6.729,8.112,13.099,16.482,17.973,25.896c6.906,13.382,0.651,28.108-11.348,28.907l-74.59-0.034  c-19.238,1.596-34.585-6.148-47.489-19.302c-10.327-10.519-19.891-21.714-29.821-32.588c-4.071-4.444-8.332-8.626-13.422-11.932  c-10.182-6.609-19.021-4.586-24.84,6.034c-5.926,10.802-7.271,22.762-7.853,34.8c-0.799,17.564-6.108,22.182-23.751,22.986  c-37.705,1.778-73.489-3.926-106.732-22.947c-29.308-16.768-52.034-40.441-71.816-67.24  C58.589,258.194,29.094,200.852,2.586,141.904c-5.967-13.281-1.603-20.41,13.051-20.663c24.333-0.473,48.663-0.439,73.025-0.034  c9.89,0.145,16.437,5.817,20.256,15.16c13.165,32.371,29.274,63.169,49.494,91.716c5.385,7.6,10.876,15.201,18.694,20.55  c8.65,5.923,15.236,3.96,19.305-5.676c2.582-6.11,3.713-12.691,4.295-19.234c1.928-22.513,2.182-44.988-1.199-67.422  c-2.076-14.001-9.962-23.065-23.933-25.714c-7.129-1.351-6.068-4.004-2.616-8.073c5.995-7.018,11.634-11.387,22.875-11.387h84.298  c13.271,2.619,16.218,8.581,18.035,21.934l0.072,93.637c-0.145,5.169,2.582,20.51,11.893,23.931  c7.452,2.436,12.364-3.526,16.836-8.251c20.183-21.421,34.588-46.737,47.457-72.951c5.711-11.527,10.622-23.497,15.381-35.458  c3.526-8.875,9.059-13.242,19.056-13.049l81.132,0.072c2.406,0,4.84,0.035,7.17,0.434c13.671,2.33,17.418,8.211,13.195,21.561  c-6.653,20.945-19.598,38.4-32.255,55.935c-13.53,18.721-28.001,36.802-41.418,55.634  C424.357,271.756,425.336,280.424,440.649,295.361L440.649,295.361z"/>
                    </svg>
                </a>
                <a title="Google plus">
                    <svg xlinkHref="https://plus.google.com/communities/114960069036189268869" onClick={openLink} className="g-plus-svg" x="0px" y="0px" viewBox="0 0 458.246 458.246">
                        <path d="M160.777,259.368h71.594c-12.567,35.53-46.603,61.004-86.45,60.71   c-48.349-0.357-88.327-39.035-90.204-87.349c-2.012-51.789,39.537-94.563,90.887-94.563c23.479,0,44.905,8.946,61.058,23.605   c3.826,3.473,9.65,3.495,13.413-0.047l26.296-24.749c4.112-3.871,4.127-10.408,0.027-14.292   c-25.617-24.269-59.981-39.396-97.876-40.136C68.696,80.969,0.567,147.238,0.004,228.078   c-0.568,81.447,65.285,147.649,146.6,147.649c78.199,0,142.081-61.229,146.36-138.358c0.114-0.967,0.189-33.648,0.189-33.648   H160.777c-5.426,0-9.824,4.398-9.824,9.824v35.999C150.953,254.97,155.352,259.368,160.777,259.368z"/>
                        <path d="M414.464,206.99v-35.173c0-4.755-3.854-8.609-8.609-8.609h-29.604c-4.755,0-8.609,3.854-8.609,8.609   v35.173h-35.173c-4.755,0-8.609,3.854-8.609,8.609v29.604c0,4.755,3.854,8.609,8.609,8.609h35.173v35.173   c0,4.755,3.854,8.609,8.609,8.609h29.604c4.755,0,8.609-3.854,8.609-8.609v-35.173h35.173c4.755,0,8.609-3.854,8.609-8.609v-29.604   c0-4.755-3.854-8.609-8.609-8.609L414.464,206.99L414.464,206.99z"/>
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default Footer;