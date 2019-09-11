/**
 * The Header can only determine the environment via URL
 */

const getEnvironment = () => {
    const environments = ['test', 'accp', 'ofdata'];
    const domain = window.location.origin;
    const isUrlWithEnvironment = (environment: string) =>
        [
            '-[env].mendixcloud.com',
            'home-[env].mendix.com',
            'home-[env].mendix.dev',
        ]
            .map(url => url.replace('[env]', environment))
            .filter(url => domain.includes(url));

    const found = environments.filter(isUrlWithEnvironment)[0];

    return found ? `-${found}` : '';
};

const sprintrRegEx = /https:\/\/(.+?\.|)sprintr\.home(-test|-accp)?\.(mendix\.(com|dev)|dev\.mendix\.com)/;
const cloudRegEx = /https:\/\/(.+?\.|)cloud\.home(-test|-accp)?\.(mendix\.(com|dev)|dev\.mendix\.com)/;

const heimdDalRegEx = /https:\/\/(.+?\.|)cdp(-test|-accp)?\.(mendixcloud\.com|mendix\.dev|dev\.mendix\.com)/;
const brokkrRegEx = /https:\/\/(.+?\.|)clp(-test|-accp)?\.(mendixcloud\.com|mendix\.dev|dev\.mendix\.com)/;

const appstoreRegEx = /https:\/\/(.+?\.|)appstore\.home(-test|-accp)?\.(mendix\.(com|dev)|dev\.mendix\.com)/;
const beaverRegEx = /https:\/\/(.+?\.|)sapodatamodelcreator(-test|-accp)?\.(mendixcloud\.com|mendix\.dev|dev\.mendix\.com)/;

const modelShareRegEx = /https:\/\/modelshare\.mendixcloud\.com/;

const forumRegEx = /https:\/\/forum\.mendixcloud\.com/;
const supportRegEx = /https:\/\/support\.mendix\.com/;
const datahubRegEx = /https:\/\/hub(-test|-ofdata)?\.mendixcloud\.com/;

export const onSprintr = () => sprintrRegEx.test(window.location.origin);
export const onCloud = () => cloudRegEx.test(window.location.origin);

export const onHeimdal = () => heimdDalRegEx.test(window.location.origin);
export const onBrokkr = () => brokkrRegEx.test(window.location.origin);

export const onAppStore = () => appstoreRegEx.test(window.location.origin);
export const onBeaver = () => beaverRegEx.test(window.location.origin);

export const onModelShare = () => modelShareRegEx.test(window.location.origin);
export const onForum = () => forumRegEx.test(window.location.origin);
export const onSupport = () => supportRegEx.test(window.location.origin);
export const onDatahub = () => datahubRegEx.test(window.location.origin);

export const SPRINTR = 'sprintr';
export const CLOUD = 'cloud';
export const APPSTORE = 'appstore';
export const HEIMDAL = 'heimdal';
export const BROKKR = 'brokkr';
export const BEAVER = 'beaver';
export const MODELSHARE = 'modelshare';
export const FORUM = 'forum';
export const COMMUNITY = 'community';
export const SUPPORT = 'support';
export const DATAHUB = 'datahub';

export const getCurrentApp = () => {
    if (onSprintr()) return SPRINTR;
    if (onCloud()) return CLOUD;
    if (onAppStore()) return APPSTORE;
    if (onHeimdal()) return HEIMDAL;
    if (onBrokkr()) return BROKKR;
    if (onBeaver()) return BEAVER;
    if (onModelShare()) return MODELSHARE;
    if (onForum()) return FORUM;
    if (onSupport()) return SUPPORT;
    if (onDatahub()) return DATAHUB;

    return COMMUNITY;
};

const getMendixCloudUrl = (link: string) => {
    const mendixcloudUrlCollection = [
        'developer.mendixcloud.com',
        'hub.mendixcloud.com',
    ];

    return mendixcloudUrlCollection.filter(url => link.includes(url))[0];
};

const getMxLabUrl = (link: string) => {
    // MXLAB integration (https://prefix.app.home.dev.mendix.com)
    const urlParts = window.location.origin
        .split('.')
        .map(part => part.replace(/http(s)?:\/\//, ''));
    const firstPart = urlParts[0];
    const includesFirstPart = [
        'sprintr',
        'home',
        'cloud',
        'cdp',
        'cdp-test',
        'cdp-accp',
        'clp',
        'clp-test',
        'clp-accp',
        'appstore',
    ].includes(firstPart);
    if (!includesFirstPart) {
        return link
            .replace(/(http(s)?:\/\/)/, `$1${firstPart}.`)
            .replace('home.mendix.com', `home.dev.mendix.com`);
    }
    return link.replace('home.mendix.com', `home.dev.mendix.com`);
};

export const getEnvironmentLink = (link: string) => {
    if (!link) return link;

    if (getMendixCloudUrl(link))
        return link.replace(
            '.mendixcloud.com',
            `${getEnvironment()}.mendixcloud.com`
        );

    if (window.location.origin.includes('home.mendix.dev'))
        return link.replace('home.mendix.com', `home.mendix.dev`);

    if (window.location.origin.includes('dev.mendix.com'))
        return getMxLabUrl(link);

    return link.includes('home.mendix.com')
        ? link.replace('home.mendix.com', `home${getEnvironment()}.mendix.com`)
        : link;
};
