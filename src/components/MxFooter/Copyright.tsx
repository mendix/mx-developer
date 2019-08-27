import React from 'react';

const links = [
    {
        label: 'Mendix.com',
        url: 'http://www.mendix.com/',
    },
    {
        label: 'Terms of Use',
        url: 'http://www.mendix.com/terms-of-use/',
    },
    {
        label: 'Privacy Policy',
        url: 'http://www.mendix.com/privacy-policy/',
    },
];

const Copyright = () => (
    <span className="MxFooter__copyright">
        Copyright © 2019 Mendix Technology B.V. All rights reserved.
        {links.map(({ label, url }) => (
            <>
                <span className="MxFooter__divider"></span>
                <a href={url} target="_blank" className="MxFooter__link">
                    {label}
                </a>
            </>
        ))}
    </span>
);

export default Copyright;
