import React from 'react';

import { getCurrentApp, BEAVER, DATAHUB } from '../../utils/environmentHelpers';

import navbarItemData from '../../resources/menu/navbar.json';
import NavBarItem from './NavBarItem';

const NavBar = ({ isOpenOnMobile = false }: { isOpenOnMobile: boolean }) => {
    const currentApp = getCurrentApp();
    /**
     * Since we're using BEM, every css class is unique.
     * So, we should also make its implementation independent.
     * instead of requiring multiple classes `MxHeader__nav-bar MxHeader__nav-bar--mobile-menu-open`,
     * one class should be a self-contained state of the UI component, i.e. `MxHeader__nav-bar--mobile-menu-open`
     */
    const className = isOpenOnMobile
        ? 'MxHeader__nav-bar--mobile-menu-open'
        : 'MxHeader__nav-bar'; // use media-query to hide it on mobile when closed

    return (
        <div className={className}>
            {navbarItemData
                .filter(itemData => {
                    /**
                     * hide Sprintr-related NavBarItems on `beaver` (apps owned by digital ecosystem team)
                     *  */
                    return (
                        currentApp !== BEAVER ||
                        (currentApp === BEAVER && !itemData.microflow)
                    );
                })
                .filter(itemData => {
                    /**
                     * only show `Data Hub` when it's on `https://hub.mendixcloud.com`
                     *  */

                    return currentApp === DATAHUB || itemData.key !== DATAHUB;
                })
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
