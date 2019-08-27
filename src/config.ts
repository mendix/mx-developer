export const STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
};

export const PROFILE_URL =
    process.env.REACT_APP_MX_ENV === 'prod'
        ? process.env.REACT_APP_PROFILE_URL
        : process.env.REACT_APP_PROFILE_URL_TEST;
