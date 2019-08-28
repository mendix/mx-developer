import React from 'react';

import facebookImage from '../../resources/img/footer/fb.svg';
import googleplusImage from '../../resources/img/footer/googleplus.svg';
import linkedinImage from '../../resources/img/footer/linkedin.svg';
import twitterImage from '../../resources/img/footer/twitter.svg';
import instagramImage from '../../resources/img/footer/instagram.svg';
import githubImage from '../../resources/img/footer/git.svg';

const socialMedia = [
    { label: 'github', url: 'https://github.com/mendix', image: githubImage },
    {
        label: 'instagram',
        url: 'https://www.instagram.com/mendixinc/',
        image: instagramImage,
    },
    {
        label: 'twitter',
        url: 'https://twitter.com/MendixDeveloper',
        image: twitterImage,
    },
    {
        label: 'linkedin',
        url: 'https://www.linkedin.com/company/mendix',
        image: linkedinImage,
    },
    {
        label: 'googleplus',
        url: 'https://plus.google.com/+MendixSocial',
        image: googleplusImage,
    },
    {
        label: 'facebook',
        url: 'https://www.facebook.com/mendixsoftware',
        image: facebookImage,
    },
];

const SocialMedia = () => (
    <div className="MxFooter__social-media">
        {socialMedia.map(({ label, url, image }) => (
            <a
                href={url}
                key={label}
                className="MxFooter__social-media-item"
                target="_blank"
            >
                <img src={image} alt={label} />
            </a>
        ))}
    </div>
);

export default SocialMedia;
