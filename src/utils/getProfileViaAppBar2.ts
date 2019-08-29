// This is ported from the old version
// Once Identity Service include user profile info into JWT token
// This can be removed

import fetchJsonp from 'fetch-jsonp';

import { AppBar2Response } from '../typings/Authenticate';
import { PROFILE_URL } from '../config';

const profileUrl = `${PROFILE_URL}?q=${Number(new Date())}`;

const getProfileViaAppBar2 = (): Promise<AppBar2Response> =>
    fetchJsonp(profileUrl, {
        jsonpCallbackFunction: 'getProfileFeedback',
    })
        .then(response => response.json())
        .then(json => json && !!json.length && json[0])
        .catch(e => {
            console.warn('Error loading profile for feedback widget: ', e);
        });

export default getProfileViaAppBar2;
