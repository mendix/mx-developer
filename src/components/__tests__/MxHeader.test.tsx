import React from 'react';
import { render } from '@testing-library/react';

import MxHeader from '../MxHeader';

jest.mock('../../utils/getProfileViaAppBar2', () =>
    jest.fn(() => ({
        loginUrl: 'login-url',
        loggedIn: true,
    }))
);

jest.mock('../../utils/mxHelpers', () => ({
    getEnvironmentLink: jest.fn(link => link),
    getCurrentApp: jest.fn(() => 'forum'),
    callMicroflow: jest.fn(() => Promise.resolve('response-of-microflow')),
    onSprintr: jest.fn(() => true),
    onCloud: jest.fn(() => true),
    getAdminInfo: jest.fn(() =>
        Promise.resolve({
            hasCompanyAdmin: true,
            hasPlatformAdmin: true,
            hasOperationsDesk: true,
        })
    ),
}));

jest.mock('../../utils/parseIdToken', () =>
    jest.fn(() => ({
        username: 'mock-username',
        displayName: 'mock-displayName',
        email: 'mock-email',
        avatarThumbUrl: 'mock-avatarThumbUrl',
        avatarUrl: 'mock-avatarUrl',
        companyId: 'mock-companyId',
        companyName: 'mock-companyName',
        idToken: 'mock-idToken',
    }))
);

describe('MxHeader', () => {
    it('should render correctly', () => {
        const { container } = render(
            <MxHeader style={{}} idTokenProviderMF="idTokenProviderMF" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
