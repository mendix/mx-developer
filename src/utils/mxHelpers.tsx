interface MxDataActionParams {
    actionname: string;
    applyto?: string | undefined;
    guids?: string[] | undefined;
    xpath?: string | undefined;
    constraints?: string | undefined;
    sort?: [string, 'desc' | 'asc'][] | undefined;
    gridid?: string | undefined;
}

interface MxDataGetParams {
    guid: string;
    noCache?: boolean | undefined;
    count?: boolean | undefined;
    path?: string | undefined;
    filter?:
        | {
              id?: string | undefined;
              attributes?: string[] | undefined;
              offset?: number | undefined;
              sort?: [string, 'desc' | 'asc'][] | undefined;
              amount?: number | undefined;
              distinct?: boolean | undefined;
              references?: mx.ReferencesSpec | undefined;
          }
        | undefined;
}

type ActionResponse =
    | string
    | number
    | boolean
    | mendix.lib.MxObject
    | mendix.lib.MxObject[];

function action(params: MxDataActionParams) {
    return new Promise<ActionResponse>((resolve, reject) => {
        window.mx.data.action({
            params,
            callback: resolve,
            error: reject,
        });
    });
}

function get(params: MxDataGetParams) {
    return new Promise((resolve, reject) => {
        window.mx.data.get({ ...params, callback: resolve, error: reject });
    });
}

export const mxData = {
    action,
    get,
};

export const getData = get;
export const callMicroflow = (actionname: string) => action({ actionname });

export const showProgress = () =>
    window.mx && window.mx.ui && window.mx.ui.showProgress();

export const hideProgress = (id: number | null = null) => {
    if (id !== null) {
        window.mx && window.mx.ui && window.mx.ui.hideProgress(id);
    }
};

export const navigateByCallingMicroflow = async (
    microflow: string | undefined | null,
    fallbackLink: string
) => {
    const progressId = showProgress();
    const directNavigate = () => {
        hideProgress(progressId);
        window.location.href = fallbackLink;
    };

    if (!microflow) {
        directNavigate();
        return;
    }

    try {
        await callMicroflow(microflow);
        hideProgress(progressId);
    } catch (error) {
        directNavigate();
    }
};

const getEnvironment = () => {
    const domain = window.location.origin;

    if (
        domain.indexOf('-test.mendixcloud.com') !== -1 ||
        domain.indexOf('home-test.mendix.com') !== -1 ||
        domain.indexOf('home-test.mendix.dev') !== -1
    )
        return '-test';

    if (
        domain.indexOf('-accp.mendixcloud.com') !== -1 ||
        domain.indexOf('home-accp.mendix.com') !== -1 ||
        domain.indexOf('home-accp.mendix.dev') !== -1
    )
        return '-accp';

    return '';
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

export const onSprintr = () => sprintrRegEx.test(window.location.origin);
export const onCloud = () => cloudRegEx.test(window.location.origin);

export const onHeimdal = () => heimdDalRegEx.test(window.location.origin);
export const onBrokkr = () => brokkrRegEx.test(window.location.origin);

export const onAppStore = () => appstoreRegEx.test(window.location.origin);
export const onBeaver = () => beaverRegEx.test(window.location.origin);

export const onModelShare = () => modelShareRegEx.test(window.location.origin);
export const onForum = () => forumRegEx.test(window.location.origin);
export const onSupport = () => supportRegEx.test(window.location.origin);

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

    return COMMUNITY;
};

export const getEnvironmentLink = (link: string) => {
    if (link && link.indexOf('developer.mendixcloud.com') !== -1) {
        return link.replace(
            'developer.mendixcloud.com',
            `developer${getEnvironment()}.mendixcloud.com`
        );
    }
    if (!link || link.indexOf('home.mendix.com') === -1) {
        return link;
    }
    if (window.location.origin.indexOf('home.mendix.dev') !== -1) {
        return link.replace('home.mendix.com', `home.mendix.dev`);
    }
    if (window.location.origin.indexOf('dev.mendix.com') !== -1) {
        // MXLAB integration (https://prefix.app.home.dev.mendix.com)
        const urlParts = window.location.origin
            .split('.')
            .map(part => part.replace(/http(s)?:\/\//, ''));
        const firstPart = urlParts[0];
        const nonIndex =
            [
                'sprintr',
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
            ].indexOf(firstPart) === -1;
        if (nonIndex) {
            return link
                .replace(/(http(s)?:\/\/)/, `$1${firstPart}.`)
                .replace('home.mendix.com', `home.dev.mendix.com`);
        }
        return link.replace('home.mendix.com', `home.dev.mendix.com`);
    }
    return link.replace(
        'home.mendix.com',
        `home${getEnvironment()}.mendix.com`
    );
};

/**
 * Naming follows the definitions in the scss file `_helpers.scss`
 */
export const BREAK_POINT = {
    PHONE: 480,
    SCREEN_SM: 992,
};

export const PHONE = 'phone';
export const SCREEN_SM = 'screen-small';
export const SCREEN_MD = 'screen-medium';

export const isSmallViewport = () => window.innerWidth <= BREAK_POINT.SCREEN_SM;
export const isPhoneViewport = () => window.innerWidth <= BREAK_POINT.PHONE;

export const getWindowSize = (width: number) => {
    if (width <= 480) return PHONE;
    if (width <= 992) return SCREEN_SM;
    return SCREEN_MD;
};

interface AdminInfo {
    HasCompanyAdmin?: boolean;
    HasPlatformAdmin?: boolean;
    HasOperationsDesk?: boolean;
    [key: string]: any;
}

export const getAdminInfo = async (microflow: string): Promise<AdminInfo> => {
    const objects = await callMicroflow(microflow);
    if (Array.isArray(objects) && objects.length > 0) {
        const mxObj = objects[0];
        const attributes: string[] = mxObj.getAttributes();
        return attributes.reduce(
            (allInfo, attribute) => ({
                ...allInfo,
                [attribute]: mxObj.get(attribute),
            }),
            {}
        );
    }
    return {};
};
