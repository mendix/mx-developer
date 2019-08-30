interface AppBar2Base {
    avatarUrl: string;
    loggedIn: boolean;
    loginUrl?: string;
    logoutUrl: string;
    openId: string;
    profileUrl: string;
}

export interface AppBar2Response extends AppBar2Base {
    displayName: string;
    userName: string;
}

export interface AppBar2Profile extends AppBar2Base {
    username: string;
    email: string;
}

export interface AuthenticateProps {
    idTokenProviderMF: string;
    setIdentityData: Function;
}

export interface IdTokenProfile {
    username: string | undefined;
    email: any;
    avatarThumbUrl?: string | undefined;
    avatarUrl?: string | undefined;
    companyId?: string | undefined;
    companyName?: string | undefined;
    idToken: string;
}
