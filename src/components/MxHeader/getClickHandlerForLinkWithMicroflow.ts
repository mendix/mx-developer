import React from 'react';

import { navigateByCallingMicroflow } from '../../utils/mxHelpers';

const getClickHandlerForLinkWithMicroflow = ({
    microflow,
    url,
    predicate,
    callback,
}: {
    microflow: string;
    url: string;
    predicate?: () => boolean;
    callback?: () => void;
}) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if ((predicate && predicate()) || !predicate) {
        event.preventDefault();
        navigateByCallingMicroflow(microflow, url);
        callback && callback();
    }
};

export default getClickHandlerForLinkWithMicroflow;
