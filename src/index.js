/*! Copyright 2017 Mendix. Author: J.W. Lagendijk <jelte.lagendijk@mendix.com>. Released under the MIT license. */
/* eslint camelcase: ["error",{properties: "never"}] */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }] */
import 'es6-promise';
import Vue from 'vue';
import vueBemCn from 'Resources/vendor/bem';
import Observer from 'mutation-observer';
import debounce from 'tiny-debounce';

Vue.use(vueBemCn, {
  ns: 'mx-developer__', // namespace
  el: '__', // element delimeter
  mod: '--', // modifier delimeter
  modValue: '-' // value delimeter for modifier
});

if (process.env.NODE_ENV === 'production') {
  Vue.config.productionTip = false;
  Vue.config.silent = true;
}

import Header from './app/Header/index.vue';
import Footer from './app/Footer/index.vue';
import {waitForElementId, waitForElementClass} from 'Resources/helpers';

import './sass/mx-header.scss';
// 500 * 10ms timeout = 5s timeout

waitForElementId('mxHeader', Header, 500);
waitForElementClass('mxHeader', Header, 500);
waitForElementId('mxFooter', Footer, 500);
waitForElementClass('mxFooter', Footer, 500);

const load = () => {
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
    const ignoredElement = new Vue({
      el: elementHeaderSelector,
      render: h => h(Header)
    });
  }

  if (elementFooterSelector !== null) {
    const ignoredElement = new Vue({
      el: elementFooterSelector,
      render: h => h(Footer)
    });
  }
};

window._headerObserver = new Observer(debounce(load, 100));

window._headerObserver.observe(document, {
  subtree: true,
  childList: true,
  attributes: false,
  characterData: false,
  attributeOldValue: false,
  characterDataOldValue: false
});
