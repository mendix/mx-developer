import React from 'react';

import { AuthenticateProps, IdTokenProfile, AppBar2Profile } from '../typings';
import { connect } from '../context/store';
import { setIdentityDataAction } from '../context/reducer';

import getProfileViaAppBar2 from '../utils/getProfileViaAppBar2';
import { callMicroflow } from '../utils/mxHelpers';
import parseIdToken from '../utils/parseIdToken';

/**
 * If user logs in with SSO (AppCloudService / MendixSSO), userObject is always System.User. Then it does not contain email.
 * Source of userInfo: **idToken => appbar2 => local user**.
 *  - idToken (if idTokenProviderMF is not provided or it fails to get the idToken, fallback to appbar2)
 *  - appbar2 (if it fails to get userInfo, fallback to local user)
 */

class Authenticate extends React.Component<AuthenticateProps> {
    componentDidMount() {
        this.authenticate();
    }

    authenticate = async () => {
        try {
            const { setIdentityData } = this.props;
            const profileData = await this.getProfileData();
            setIdentityData(profileData);
        } catch (error) {
            console.error('Failed to authenticate', error);
        }
    };

    /**
     * Source Order:
     * 1. MendixSSO (idToken)
     * 2. Appbar2 (login via Sprintr, but not yet migrated to MendixSSO, so no idToken), will be deprecated soon
     */

    getProfileData = async (): Promise<IdTokenProfile | AppBar2Profile> => {
        const { idTokenProviderMF } = this.props;

        /**
         * if the app allows anonymous users, idToken will be null, even if you set idTokenProviderMF correctly
         * So we need to fallback to (appbar2 or local login)
         */
        const idToken = idTokenProviderMF
            ? await callMicroflow(idTokenProviderMF)
            : null;

        return idToken
            ? this.getProfileViaIdToken(idToken as string)
            : this.getProfileViaAppBar2(); // AppBar2 will be deprecated soon, here it serves as a fallback solution
    };

    getProfileViaIdToken = (idToken: string): IdTokenProfile => {
        const {
            username: usernameAsEmail,
            displayName,
            email: idTokenEmail,
            ...idTokenInfo
        } = parseIdToken(idToken);

        // map the response to username and email in the context of this widget
        const username = displayName;
        const email = idTokenEmail || usernameAsEmail;

        return { idToken, ...idTokenInfo, username, email };
    };

    getProfileViaAppBar2 = async (): Promise<AppBar2Profile> => {
        const {
            displayName: username,
            userName: email,
            ...profile
        } = await getProfileViaAppBar2();

        return { username, email, ...profile };
    };

    render() {
        const { children } = this.props;
        return children || null;
    }
}

const mapDispatchToProps = (dispatch: Function) => ({
    setIdentityData: (props: IdTokenProfile | AppBar2Profile) =>
        dispatch(setIdentityDataAction(props)),
});

export default connect(
    null,
    mapDispatchToProps
)(React.memo(Authenticate));
