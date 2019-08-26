import React from 'react';

import {
    navigateByCallingMicroflow,
    onSprintr,
    getEnvironmentLink,
} from '../../utils/mxHelpers';
import { links, microflows } from '../../resources/mendix.json';

const Notification = () => {
    const deepLink = getEnvironmentLink(links.sprintr.notifications);
    const onClick = () =>
        navigateByCallingMicroflow(microflows.sprintr.notifications, deepLink);

    return onSprintr() ? (
        <a
            href={getEnvironmentLink(links.sprintr.notifications)}
            className="MxHeader__notification"
        >
            Notification
        </a>
    ) : (
        <button
            className="MxHeader__notification"
            role="button"
            onClick={onClick}
            onKeyDown={onClick}
        >
            Notification
        </button>
    );
};

export default Notification;
