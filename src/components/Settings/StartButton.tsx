import React from 'react';

import { links } from '../../resources/mendix.json';

const StartButton = () => (
    <a href={links.signup} className="MxHeader__start-button">
        Start For Free
    </a>
);

export default StartButton;
