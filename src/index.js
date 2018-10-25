/*! Copyright 2017 Mendix. Author: J.W. Lagendijk <jelte.lagendijk@mendix.com>. Released under the MIT license. */
/* eslint camelcase: ["error",{properties: "never"}] */
/* eslint no-new: 0 */
import 'es6-promise';
require('es6-object-assign').polyfill();
import 'js-polyfills/dom'; // IE element.append polyfills (fix =< IE11)
import 'location-origin';

import Vue from 'vue';

import vueBemCn from 'Resources/vendor/bem';
import Observer from 'mutation-observer';
import debounce from 'tiny-debounce';

import store from './app/store/';
import Tracker from './app/plugins/tracker';

import {StickyDirective} from './app/directives/sticky-directive';
Vue.directive('sticky', StickyDirective);

Vue.use(vueBemCn, {
  ns: 'mx-developer__', // namespace
  el: '__', // element delimeter
  mod: '--', // modifier delimeter
  modValue: '-' // value delimeter for modifier
});

Vue.use(Tracker);

if (process.env.NODE_ENV === 'production') {
  Vue.config.productionTip = false;
  Vue.config.silent = true;
}

import Header from './app/Header/index.vue';
import Footer from './app/Footer/index.vue';
import {waitForElementId, waitForElementClass} from 'Resources/helpers';

import './sass/mx-header.scss';
// 500 * 10ms timeout = 5s timeout

waitForElementId('mxHeader', Header, store, 500);
waitForElementClass('mxHeader', Header, store, 500);
waitForElementId('mxFooter', Footer, store, 500);
waitForElementClass('mxFooter', Footer, store, 500);

const load = function () {
  let elementHeaderSelector = null;
  const headerEl = document.getElementById('mxHeader');
  if (headerEl === null) {
    if (document.getElementsByClassName('mxHeader').length > 0) {
      elementHeaderSelector = '.mxHeader';
    }
  } else {
    elementHeaderSelector = '#mxHeader';
  }

  let elementFooterSelector = null;
  const footerEl = document.getElementById('mxFooter');
  if (footerEl === null) {
    if (document.getElementsByClassName('mxFooter').length > 0) {
      elementFooterSelector = '.mxFooter';
    }
  } else {
    elementFooterSelector = '#mxFooter';
  }

  if (elementHeaderSelector !== null) {
    new Vue({
      el: elementHeaderSelector,
      store,
      render: h => h(Header)
    });
  }

  if (elementFooterSelector !== null) {
    new Vue({
      el: elementFooterSelector,
      store,
      render: h => h(Footer)
    });
  }
};

window._headerObserver = new Observer(debounce(load, 100));

if (!window.__mxToggleGuidanceButton) {
  window.__mxToggleGuidanceTemp = {
    cb: null,
    start: true
  };
  window.__mxToggleGuidanceButton = (cb, start = true) => {
    window.__mxToggleGuidanceTemp = {
      cb,
      start
    };
  };
}

if (!window.__mxToggleWhatsNextButton) {
  window.__mxToggleWhatsNextTemp = {
    cb: null
  };
  window.__mxToggleWhatsNextButton = cb => {
    window.__mxToggleWhatsNextTemp = {
      cb
    };
  };
}

window._headerObserver.observe(document, {
  subtree: true,
  childList: true,
  attributes: false,
  characterData: false,
  attributeOldValue: false,
  characterDataOldValue: false
});
