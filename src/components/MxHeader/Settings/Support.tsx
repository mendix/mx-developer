import React from 'react';

import supportMenuItems from '../../../resources/menu/support.json';

const SupportMenu = () => (
    <ul className="MxHeader__support-menu">
        {supportMenuItems.map(item => (
            <li className="MxHeader__support-menu-item" key={item.url}>
                <a className="MxHeader__support-menu-item-link" href={item.url}>
                    {item.label}
                </a>
            </li>
        ))}
    </ul>
);

const Support = () => (
    <div className="MxHeader__support">
        <SupportMenu />
    </div>
);

export default Support;
