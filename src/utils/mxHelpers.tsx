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
