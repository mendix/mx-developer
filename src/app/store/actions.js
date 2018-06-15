/* eslint prefer-arrow-callback:0 */
import fetchJsonp from 'fetch-jsonp';

import {replaceEnvLink, onSprintr, onCloud} from 'Resources/helpers';

import {microflows, links} from 'Resources/mendix.json';

const profileUrl = replaceEnvLink(links.profile) + `?q=${Number(new Date())}`;

export default {
  getProfile({commit, dispatch}) {
    fetchJsonp(profileUrl, {
      jsonpCallbackFunction: 'getProfile'
    })
      .then(function (response) {
        return response.json();
      }).then(function (json) {
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
      }).catch(function (ex) {
        commit('loaded', true);
        commit('messageStatus', 1);
        console.log(`Failed to get profile: `, ex);
      });
  },
  getPartnerStatus({commit}, openID) {
    const url = links.isPartner + escape(openID);
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
  },
  getAdminAttributes({commit}) {
    if (window.mx && window.mx.data && window.mx.data.action) {
      let MF = false;
      if (onSprintr()) {
        MF = microflows.sprintr.profileMenu;
      } else if (onCloud()) {
        MF = microflows.cloudportal.profileMenu;
      }

      if (MF) {
        window.mx.data.action({
          params: {
            actionname: MF
          },
          callback: obj => {
            if (obj.length) {
              const mxObj = obj[0];
              const returnObj = {};
              mxObj.getAttributes().forEach(attr => {
                returnObj[attr] = mxObj.get(attr);
              });
              commit('adminDetails', returnObj);
            }
          },
          error: () => {
            // console.error(err);
          }
        });
      }
    }
  }
};
