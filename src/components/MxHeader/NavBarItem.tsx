import React from 'react';

import { NodeInJsonFile } from '../../typings';

import NavBarMenu from './NavBarMenu';
import { navigateByCallingMicroflow } from '../../utils/mxHelpers';
import { onSprintr, getEnvironmentLink } from '../../utils/environmentHelpers';

interface NavBarItemProps extends NodeInJsonFile {
    isOnMobile: boolean;
    nodes?: NodeInJsonFile[];
}

interface NavBarItemState {
    isMenuOpen: boolean;
}

/**
 * Use hyperlink or microflow
 * 1. if user is *on Sprintr*, use microflow to navigate *within* Sprintr
 *    because it's a lot faster than deeplink
 * 2. if the above condition is not met, always use deeplink (i.e. use hyperlink), e.g.
 *    - on Forum, go to Apps
 *    - on Sprintr, go to Apps
 *  */

class NavBarItem extends React.Component<NavBarItemProps, NavBarItemState> {
    state = { isMenuOpen: false };

    toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        this.setState(({ isMenuOpen }) => ({ isMenuOpen: !isMenuOpen }));
    };

    render() {
        const {
            label,
            link: rawLink,
            microflow,
            nodes,
            external,
            isOnMobile,
        } = this.props;
        const { isMenuOpen } = this.state;
        const link = getEnvironmentLink(rawLink);
        const navigate = () => navigateByCallingMicroflow(microflow, link);

        const MenuToggle = ({
            isOpen = false,
            onClick,
        }: {
            isOpen: boolean;
            onClick: (event: React.MouseEvent<HTMLElement>) => void;
        }) => (
            <button
                className={
                    isOpen
                        ? 'MxHeader__nav-bar-menu-toggle--open'
                        : 'MxHeader__nav-bar-menu-toggle'
                }
                onClick={onClick}
                type="button"
            >
                {isOpen ? 'Close' : 'Expand'}
            </button>
        );

        return (
            <div
                className={
                    isOnMobile
                        ? 'MxHeader__nav-bar-item'
                        : 'MxHeader__nav-bar-item--desktop'
                }
            >
                {onSprintr() || (isOnMobile && nodes && nodes.length > 0) ? (
                    <span
                        className="MxHeader__nav-bar-item-link"
                        onClick={navigate}
                        role="button"
                        onKeyPress={navigate}
                    >
                        {label}
                        {isOnMobile && (
                            <MenuToggle
                                isOpen={isMenuOpen}
                                onClick={this.toggleMenu}
                            />
                        )}
                    </span>
                ) : (
                    <a
                        href={link}
                        className={
                            isOnMobile
                                ? 'MxHeader__nav-bar-item-link'
                                : 'MxHeader__nav-bar-item-link--desktop'
                        }
                        target={external ? '_blank' : '_self'}
                    >
                        {label}
                    </a>
                )}
                {((isOnMobile && isMenuOpen) || !isOnMobile) && (
                    <NavBarMenu
                        nodes={nodes}
                        isOnMobile={isOnMobile}
                    ></NavBarMenu>
                )}
            </div>
        );
    }
}

export default NavBarItem;
