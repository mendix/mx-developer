import {
    getEnvironment,
    getMendixCloudUrl,
    getEnvironmentLink,
} from '../environmentHelpers';

describe('getEnvironment', () => {
    it('should get correct environment from URL', () => {
        const url = 'https://hub-test.mendixcloud.com';
        const environment = getEnvironment(url);
        expect(environment).toEqual('-test');
    });
});

describe('getMendixCloudUrl', () => {
    it('should get correct environment from URL', () => {
        const link = 'https://hub.mendixcloud.com/foo/bar';
        const url = getMendixCloudUrl(link);
        expect(url).toEqual('hub.mendixcloud.com');
    });
});

describe('getEnvironmentLink', () => {
    it('should get correct environment URL for mendixcloud', () => {
        const link = 'https://hub.mendixcloud.com/foo/bar';
        const linkWithEnvironment = getEnvironmentLink(
            link,
            'https://hub-test.mendixcloud.com'
        );
        expect(linkWithEnvironment).toEqual(
            'https://hub-test.mendixcloud.com/foo/bar'
        );
    });
});
