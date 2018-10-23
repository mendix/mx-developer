export default {
  profile(state, mut) {
    state.profile = mut;
  },
  loaded(state, mut) {
    state.loaded = mut;
  },
  messageStatus(state, mut) {
    state.messageStatus = mut;
  },
  bgShown(state, mut) {
    state.bgShown = mut;
  },
  adminDetails(state, mut) {
    state.adminDetails = mut;
  },
  mobState(state, mut) {
    if (mut === null) {
      state.isMob = !state.isMob;
    } else if (typeof mut === 'boolean') {
      state.isMob = mut;
    }
  }
};
