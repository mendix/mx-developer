import fetchJsonp from 'fetch-jsonp';

import {getEnvironment} from 'Resources/helpers';

const profileUrl = `https://home${getEnvironment()}.mendix.com/mxid/appbar2?q=${Number(new Date())}`;
const isPartnerUrl = 'https://developer.mendixcloud.com/rest/checkpartner?openid=';

export default {
  getProfile({commit, dispatch}) {
    fetchJsonp(profileUrl)
      .then(response => {
        return response.json();
      }).then(json => {
        commit('loaded', true);
        if (json && json.length === 1) {
          const profile = json[0];
          commit('profile', profile);
          if (typeof profile.openId === 'undefined' || !process.env.OPTIONS.banner) {
            commit('messageStatus', 1);
          } else {
            dispatch('getPartnerStatus', profile.openId);
          }
        } else {
          commit('messageStatus', 1);
          console.log(`Failed to find profile, got response: `, json);
        }
      }).catch(ex => {
        commit('loaded', true);
        commit('messageStatus', 1);
        console.log(`Failed to get profile: `, ex);
      });
  },
  getPartnerStatus({commit}, openID) {
    const url = isPartnerUrl + escape(openID);
    fetchJsonp(url, {
      jsonpCallbackFunction: 'partnerstatus'
    })
      .then(response => response.json())
      .then(json => {
        commit('messageStatus', typeof json.isPartner === 'undefined' ? 1 : json.isPartner ? 3 : 2);
      })
      .catch(ex => {
        commit('messageStatus', false);
        console.log(`Failed to check profile status: `, ex);
      });
  }
};
