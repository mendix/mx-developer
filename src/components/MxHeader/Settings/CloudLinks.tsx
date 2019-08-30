import React from 'react';

import { connect } from '../../../context/store';
import { getEnvironmentLink } from '../../../utils/mxHelpers';
import { microflows, links } from '../../../resources/mendix.json';

const operationsDeskLink = getEnvironmentLink(links.cloudportal.operationsDesk);
const platformAdminLink = getEnvironmentLink(links.sprintr.platformAdmin);
const companyAdminLink = getEnvironmentLink(links.sprintr.companyAdmin);

const CloudLinks = ({
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
    const onClickOperationsDesk = getOnClick(
        microflows.cloudportal.operationsDesk,
        operationsDeskLink
    );

    return (
        <>
            {hasCompanyAdmin && (
                <a className="MxHeader_admin-link" href={companyAdminLink}>
                    Company Admin
                </a>
            )}
            {hasPlatformAdmin && (
                <a className="MxHeader_admin-link" href={platformAdminLink}>
                    Platform Admin
                </a>
            )}
            {hasOperationsDesk && (
                <span
                    className="MxHeader_admin-link"
                    onClick={onClickOperationsDesk}
                >
                    Operations Desk
                </span>
            )}
        </>
    );
};

export default connect()(React.memo(CloudLinks));
