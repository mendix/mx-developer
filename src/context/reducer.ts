const SET_IDENTITY_DATA = 'action/set_identity_data';
const SET_ADMIN_INFO = 'action/set_admin_info';

interface Action {
    type: string;
    payload?: {
        [key: string]: any;
    };
}

interface State {
    loginUrl?: string;
    loggedIn?: boolean;
    username?: string;
    email?: string;
    idToken?: string;
}

export default function reducer(state: State = {}, { type, payload }: Action) {
    switch (type) {
        case SET_IDENTITY_DATA:
        case SET_ADMIN_INFO: {
            return { ...state, ...payload };
        }

        default:
            return state;
    }
}

export const setIdentityDataAction = (props: { [key: string]: any }) => ({
    type: SET_IDENTITY_DATA,
    payload: props,
});

export interface AdminInfo {
    hasCompanyAdmin: boolean;
    hasPlatformAdmin: boolean;
    hasOperationsDesk: boolean;
}

export const setAdminInfoAction = (props: AdminInfo) => ({
    type: SET_ADMIN_INFO,
    payload: props,
});
