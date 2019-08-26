import React from 'react';

import { getCurrentApp, BEAVER } from '../utils/mxHelpers';

import navbarItemData from '../resources/menu/navbar.json';
import NavBarItem from './NavBarItem';

const NavBar = ({ isOpenOnMobile = false }: { isOpenOnMobile: boolean }) => {
    const currentApp = getCurrentApp();
    /**
     * Since we're using BEM, every css class is unique.
     * So, we should also make its implementation independent.
     * instead of requiring multiple classes `MxHeader__nav-bar MxHeader__nav-bar--open-mobile`,
     * one class should be a self-contained state of the UI component, i.e. `MxHeader__nav-bar--open-mobile`
     */
    const className = isOpenOnMobile
        ? 'MxHeader__nav-bar--open-mobile'
        : 'MxHeader__nav-bar'; // use media-query to hide it on mobile when closed

    /**
     * Why the `filter`?
     * We need to hide Sprintr-related NavBarItems on `beaver` (apps owned by digital ecosystem team)
     *  */
    return (
        <div className={className}>
            {navbarItemData
                .filter(
                    itemData =>
                        currentApp !== BEAVER ||
                        (currentApp === BEAVER && !itemData.microflow)
                )
                .map(({ key, ...data }) => (
                    <NavBarItem
                        key={key}
                        {...data}
                        isOnMobile={isOpenOnMobile}
                    />
                ))}
        </div>
    );
};

export default NavBar;
