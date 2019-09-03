import React from 'react';
import { render } from '@testing-library/react';

import MxHeader from '../index';

jest.mock('../../../utils/getProfileViaAppBar2', () =>
    jest.fn(() => ({
        loginUrl: 'login-url',
        loggedIn: true,
    }))
);

jest.mock('../../../utils/environmentHelpers', () => ({
    getEnvironmentLink: jest.fn(link => link),
    getCurrentApp: jest.fn(() => 'forum'),
    onSprintr: jest.fn(() => true),
    onCloud: jest.fn(() => true),
}));

jest.mock('../../../utils/mxHelpers', () => ({
    callMicroflow: jest.fn(() => Promise.resolve('response-of-microflow')),
    getAdminInfo: jest.fn(() =>
        Promise.resolve({
            hasCompanyAdmin: true,
            hasPlatformAdmin: true,
            hasOperationsDesk: true,
        })
    ),
}));

jest.mock('../../../utils/parseIdToken', () =>
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
            <MxHeader idTokenProviderMF="idTokenProviderMF" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
