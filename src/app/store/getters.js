export default {
  profile: state => state.profile,
  hasProfile: state => state.profile && state.profile.loggedIn,
  loaded: state => state.loaded,
  messageStatus: state => state.messageStatus,
  bgShown: state => state.bgShown,
  adminDetails: state => state.adminDetails,
  environment: state => state.env,
  mobStateGetter: state => state.isMob
};
