import React from 'react';

import { connect } from '../../../context/store';
import avatarImage from '../../../resources/img/header/avatar.svg';
import {
    getEnvironmentLink,
    onSprintr,
} from '../../../utils/environmentHelpers';
import { links, microflows } from '../../../resources/mendix.json';

import AdminLinks from './AdminLinks';
import getClickHandlerForLinkWithMicroflow from '../getClickHandlerForLinkWithMicroflow';

const ProfileMenu = ({
    avatarUrl,
    username,
    email,
    logoutUrl,
    closeMenu,
}: {
    avatarUrl: string;
    username: string;
    email: string;
    logoutUrl: string;
    closeMenu: () => void;
}) => {
    const homeUrl = getEnvironmentLink(links.home);
    const onClickDevPortal = getClickHandlerForLinkWithMicroflow({
        microflow: microflows.sprintr.home,
        url: homeUrl,
        predicate: onSprintr,
        callback: closeMenu,
    });

    return (
        <div className="MxHeader__profile-menu">
            <img
                src={avatarUrl || avatarImage}
                alt={username}
                className="MxHeader__profile-menu-photo"
            />
            <span className="MxHeader__profile-menu-username">{username}</span>
            <span className="MxHeader__profile-menu-email">{email}</span>
            <div className="MxHeader__profile-menu-divider"></div>
            <a
                className="MxHeader__developer-portal"
                href={homeUrl}
                onClick={onClickDevPortal}
                id="mx-header-link-devportal"
            >
                Developer Portal
            </a>
            <a
                className="MxHeader__community-profile"
                href={links.community}
                id="mx-header-link-dashboard"
            >
                My Profile
            </a>
            <AdminLinks closeMenu={closeMenu} />
            {logoutUrl && (
                <a
                    className="MxHeader__logout"
                    href={logoutUrl}
                    id="mx-header-link-logout"
                >
                    Log out
                </a>
            )}
        </div>
    );
};

export default connect()(React.memo(ProfileMenu));
