import Vue from 'vue';
import Vuex from 'vuex';

import Observer from 'mutation-observer';
import debounce from 'tiny-debounce';
import {hasElement} from 'Resources/helpers';

Vue.use(Vuex);

import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
});

const checkForMxBgs = () => {
  store.commit('bgShown', hasElement('mx-underlay'));
};

window._bgObserver = new Observer(debounce(checkForMxBgs, 100));

window._bgObserver.observe(document, {
  subtree: true,
  childList: true,
  attributes: false,
  characterData: false,
  attributeOldValue: false,
  characterDataOldValue: false
});

export default store;
