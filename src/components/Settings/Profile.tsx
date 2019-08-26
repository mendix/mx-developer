import React from 'react';

import { connect } from '../../context/store';
import defaultAvatar from '../../resources/img/header/avatar-empty.png';

import ProfileMenu from './ProfileMenu';

interface ProfileProps {
    avatarUrl: string;
    username: string;
}

interface ProfileState {
    isMenuOpen: boolean;
}

class Profile extends React.Component<ProfileProps, ProfileState> {
    state = { isMenuOpen: false };

    toggleMenu = () =>
        this.setState(({ isMenuOpen }) => ({ isMenuOpen: !isMenuOpen }));

    render() {
        const { avatarUrl, username } = this.props;
        const { isMenuOpen } = this.state;

        return (
            <div className="MxHeader__profile">
                <button className="MxHeader__avatar" onClick={this.toggleMenu}>
                    <img src={avatarUrl || defaultAvatar} alt={username} />
                </button>
                {isMenuOpen && <ProfileMenu closeMenu={this.toggleMenu} />}
            </div>
        );
    }
}

export default connect()(Profile);
