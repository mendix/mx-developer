import React, { useState, useEffect, DOMElement } from 'react';
import classNames from 'classnames';

import {
    getCurrentApp,
    hasElement,
    FORUM,
    getWindowSize,
    SMALL_SCREEN,
    observe,
} from '../../resources/helpers';

import NavBar from './NavBar';
import Notification from './Notification';
import { headerOptions } from '../../config.json';

const Header: React.FC = () => {
    const currentApp = getCurrentApp();
    const isBannerEnabled = headerOptions.banner;
    const initialScreenSize = getWindowSize(window.innerWidth);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [screenSize, setScreenSize] = useState(initialScreenSize);
    const [isBackground, setIsBackground] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);
    const handleResize = () => {
        const newScreenSize = getWindowSize(window.innerWidth);
        setScreenSize(newScreenSize);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        if (screenSize !== SMALL_SCREEN) closeMobileMenu();

        return () => window.removeEventListener('resize', handleResize);
    }, [screenSize]);

    /**
     * Use Observer to observe all the mutations of the DOM tree
     * We cannot use useEffect here, because we also need to observe things outside of the React app.
     */
    observe(document, () => {
        const shouldHeaderBeBackground = hasElement('mx-underlay');
        setIsBackground(shouldHeaderBeBackground);
    });

    return (
        <div
            className={classNames('mx-developer__header', {
                'mx-developer__header--bg': isBackground,
            })}
        >
            <div className="mx-developer__row">
                <button
                    onClick={toggleMobileMenu}
                    className="mx-developer__header__hamburger"
                    type="button"
                >
                    <span className="mx-developer__header__hamburger-box">
                        <span
                            className={classNames(
                                'mx-developer__header__hamburger-inner',
                                {
                                    'mx-developer__header__hamburger-inner--active': isMobileMenuOpen,
                                }
                            )}
                        />
                    </span>
                </button>
                <NavBar isMobileMenuOpen={isMobileMenuOpen} />
            </div>
            {isBannerEnabled && currentApp === FORUM && <Notification />}
        </div>
    );
};

export default Header;
