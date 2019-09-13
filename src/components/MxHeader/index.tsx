import React from 'react';
import debounce from 'tiny-debounce';

// import observe from '../../utils/observe';
import Authenticate from './Authenticate';
import MobileMenuToggle from './MobileMenuToggle';
import Logo from './Logo';
import NavBar from './NavBar';
import Settings from './Settings';
import { getCurrentApp, BEAVER, SUPPORT } from '../../utils/environmentHelpers';
import { getWindowSize, PHONE, SCREEN_SM } from '../../utils/screenSizeHelpers';
import { Provider } from '../../context/store';

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

    closeMobileMenuOnBigScreen = debounce(() => {
        const { isMobileNavBarOpen } = this.state;
        const windowSize = getWindowSize(window.innerWidth);
        const shouldShowMobileMenu = [PHONE, SCREEN_SM].includes(windowSize);
        if (!shouldShowMobileMenu && isMobileNavBarOpen)
            this.setState({ isMobileNavBarOpen: false });
    }, 100);

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
