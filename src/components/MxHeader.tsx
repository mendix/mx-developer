import React from 'react';

import Authenticate from './Authenticate';
import MobileMenuToggle from './MobileMenuToggle';
import Logo from './Logo';
import NavBar from './NavBar';
import Settings from './Settings';
import {
    getCurrentApp,
    BEAVER,
    SUPPORT,
    getWindowSize,
    PHONE,
    SCREEN_SM,
} from '../utils/mxHelpers';
import { Provider } from '../context/store';

interface MxHeaderProps {
    idTokenProviderMF?: string;
}

interface MxHeaderState {
    isMobileNavBarOpen: boolean;
}

class MxHeader extends React.Component<MxHeaderProps, MxHeaderState> {
    state = { isMobileNavBarOpen: false };

    componentDidMount() {
        window.addEventListener('resize', this.closeMobileMenuOnBigScreen);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.closeMobileMenuOnBigScreen);
    }

    closeMobileMenuOnBigScreen = () => {
        const { isMobileNavBarOpen } = this.state;
        const windowSize = getWindowSize(window.innerWidth);
        const shouldShowMobileMenu = [PHONE, SCREEN_SM].includes(windowSize);
        if (!shouldShowMobileMenu && isMobileNavBarOpen)
            this.setState({ isMobileNavBarOpen: false });
    };

    toggleMobileNavBar = () =>
        this.setState(({ isMobileNavBarOpen }) => ({
            isMobileNavBarOpen: !isMobileNavBarOpen,
        }));

    render() {
        const { idTokenProviderMF } = this.props;
        const { isMobileNavBarOpen } = this.state;

        const currentApp = getCurrentApp();
        const showSettings = ![BEAVER, SUPPORT].includes(currentApp);

        const initialState = { idTokenProviderMF };
        return (
            <Provider initialState={initialState}>
                <div className="MxHeader__container">
                    <div className="MxHeader">
                        <Authenticate />
                        <MobileMenuToggle
                            toggle={this.toggleMobileNavBar}
                            isOn={isMobileNavBarOpen}
                        />
                        <Logo />
                        <NavBar isOpenOnMobile={isMobileNavBarOpen} />
                        <div className="MxHeader__white-space"></div>
                        {showSettings && <Settings />}
                    </div>
                </div>
            </Provider>
        );
    }
}

export default MxHeader;
