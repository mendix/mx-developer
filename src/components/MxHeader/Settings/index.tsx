import React from 'react';

import { connect } from '../../../context/store';
import Search from './Search';
import Support from './Support';
import Notification from './Notification';
import Profile from './Profile';
import StartButton from './StartButton';
import LoginButton from './LoginButton';

const Settings = ({
    loggedIn,
    loaded,
}: {
    loggedIn: boolean;
    loaded: boolean;
}) => {
    const ProfileComponents = () => (
        <>
            {loggedIn && <Notification />}
            {loggedIn && <Profile />}
            {!loggedIn && <StartButton />}
            {!loggedIn && <LoginButton />}
        </>
    );
    return (
        <div className="MxHeader__Setting">
            <Search />
            <Support />
            {loaded && <ProfileComponents />}
        </div>
    );
};

export default connect()(React.memo(Settings));
