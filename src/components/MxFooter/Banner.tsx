import React from 'react';

import SocialMedia from './SocialMedia';
import Copyright from './Copyright';

const Banner = () => {
    return (
        <div className="MxFooter__banner">
            <Copyright />
            <SocialMedia />
        </div>
    );
};

export default Banner;
