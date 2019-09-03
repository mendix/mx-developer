/**
 * Naming follows the definitions in the scss file `_helpers.scss`
 */
const BREAK_POINT = {
    PHONE: 480,
    SCREEN_SM: 992,
};

export const PHONE = 'phone';
export const SCREEN_SM = 'screen-small';
export const SCREEN_MD = 'screen-medium';

export const getWindowSize = (width: number) => {
    if (width <= BREAK_POINT.PHONE) return PHONE;
    if (width <= BREAK_POINT.SCREEN_SM) return SCREEN_SM;
    return SCREEN_MD;
};
