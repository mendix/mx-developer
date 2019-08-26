import React from 'react';

import { connect } from '../../context/store';
import { setAdminInfoAction, AdminInfo } from '../../context/reducer';
import { onSprintr, onCloud, getAdminInfo } from '../../utils/mxHelpers';
import { microflows } from '../../resources/mendix.json';
import getClickHandlerForLinkWithMicroflow from '../getClickHandlerForLinkWithMicroflow';
import SprintrLinks from './SprintrLinks';
import CloudLinks from './CloudLinks';

interface AdminLinksProps extends AdminInfo {
    closeMenu: () => void;
    setAdminInfo: (props: AdminInfo) => void;
}

const isOnSprintr = onSprintr();
const isOnCloud = onCloud();
const getMicroflow = () => {
    if (isOnSprintr) return microflows.sprintr.profileMenu;
    if (isOnCloud) return microflows.cloudportal.profileMenu;
    return null;
};

class AdminLinks extends React.Component<AdminLinksProps> {
    componentDidMount() {
        this.getAdminInfo();
    }

    getAdminInfo = async () => {
        const { setAdminInfo } = this.props;
        const microflow = getMicroflow();
        if (microflow) {
            const {
                HasCompanyAdmin: hasCompanyAdmin = false,
                HasPlatformAdmin: hasPlatformAdmin = false,
                HasOperationsDesk: hasOperationsDesk = false,
            } = await getAdminInfo(microflow);
            setAdminInfo({
                hasCompanyAdmin,
                hasPlatformAdmin,
                hasOperationsDesk,
            });
        }
    };

    render() {
        const getOnClick = (microflow: string, url: string) => {
            const { closeMenu } = this.props;
            return getClickHandlerForLinkWithMicroflow({
                microflow,
                url,
                callback: closeMenu,
            });
        };

        return (
            <>
                {isOnSprintr && <SprintrLinks getOnClick={getOnClick} />}
                {isOnCloud && <CloudLinks getOnClick={getOnClick} />}
            </>
        );
    }
}

const mapDispatchToProps = (dispatch: Function) => ({
    setAdminInfo: (props: AdminInfo) => dispatch(setAdminInfoAction(props)),
});

export default connect(
    null,
    mapDispatchToProps
)(React.memo(AdminLinks));
