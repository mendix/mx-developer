import jwtDecode from 'jwt-decode';

interface DecodedToken {
    ['mx:user:profile:v1']: {
        display_name: string;
        user_name: string;
        avatar_thumb_url: string;
        avatar_url: string;
        company_id: string;
        company_name: string;
        [key: string]: any;
    };
}

interface Parsed {
    displayName?: string;
    username?: string;
    avatarThumbUrl?: string;
    avatarUrl?: string;
    companyId?: string;
    companyName?: string;
    [key: string]: any;
}

const parseIdToken = (idToken: string): Parsed => {
    if (!idToken) return {};

    const { ['mx:user:profile:v1']: profileData, ...decoded } = jwtDecode<
        DecodedToken
    >(idToken);
    const {
        display_name: displayName,
        user_name: username,
        avatar_thumb_url: avatarThumbUrl,
        avatar_url: avatarUrl,
        company_id: companyId,
        company_name: companyName,
        ...rest
    } = profileData;
    return {
        displayName,
        username,
        avatarThumbUrl,
        avatarUrl,
        companyId,
        companyName,
        ...rest,
        ...decoded,
    };
};

export default parseIdToken;
