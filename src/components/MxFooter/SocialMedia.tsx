import React from 'react';

const socialMedia = [
    { label: 'github', url: '', image: '' },
    { label: 'instagram', url: '', image: '' },
    { label: 'twitter', url: '', image: '' },
    { label: 'linkedin', url: '', image: '' },
    { label: 'googleplus', url: '', image: '' },
    { label: 'facebook', url: '', image: '' },
];

const SocialMedia = () => (
    <div className="MxFooter__social-media-group">
        {socialMedia.map(({ label, url, image }) => (
            <a href={url} key={label}>
                <img src={image} alt={label} />
            </a>
        ))}
    </div>
);

export default SocialMedia;
