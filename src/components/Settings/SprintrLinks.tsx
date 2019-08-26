import React from 'react';

import { connect } from '../../context/store';
import { getEnvironmentLink } from '../../utils/mxHelpers';
import { microflows, links } from '../../resources/mendix.json';

const operationsDeskLink = getEnvironmentLink(links.cloudportal.operationsDesk);
const platformAdminLink = getEnvironmentLink(links.sprintr.platformAdmin);
const companyAdminLink = getEnvironmentLink(links.sprintr.companyAdmin);

const SprintrLinks = ({
    hasCompanyAdmin,
    hasPlatformAdmin,
    hasOperationsDesk,
    getOnClick,
}: {
    hasCompanyAdmin: boolean;
    hasPlatformAdmin: boolean;
    hasOperationsDesk: boolean;
    getOnClick: (microflow: string, url: string) => () => void;
}) => {
    const onClickCompanyAdmin = getOnClick(
        microflows.sprintr.companyAdmin,
        companyAdminLink
    );
    const onClickPlatformAdmin = getOnClick(
        microflows.sprintr.platformAdmin,
        platformAdminLink
    );

    return (
        <>
            {hasCompanyAdmin && (
                <span
                    className="MxHeader_admin-link"
                    onClick={onClickCompanyAdmin}
                >
                    Company Admin
                </span>
            )}
            {hasPlatformAdmin && (
                <span
                    className="MxHeader_admin-link"
                    onClick={onClickPlatformAdmin}
                >
                    Platform Admin
                </span>
            )}
            {hasOperationsDesk && (
                <a href={operationsDeskLink} className="MxHeader_admin-link">
                    Operations Desk
                </a>
            )}
        </>
    );
};

export default connect()(SprintrLinks);
