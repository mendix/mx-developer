import React from 'react';
import { connect } from '../../context/store';

import loginAvatar from '../../resources/img/header/avatar.png';

const LoginButton = ({ loginUrl }: { loginUrl: string }) => {
    return (
        <a
            href={loginUrl}
            className="MxHeader__profile"
            title="Click here to login"
        >
            <img
                src={loginAvatar}
                alt="Click here to login"
                className="MxHeader__avatar"
            />
        </a>
    );
};

export default connect()(React.memo(LoginButton));
