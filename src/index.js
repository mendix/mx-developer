/*! Copyright 2017 Mendix. Author: J.W. Lagendijk <jelte.lagendijk@mendix.com>. Released under the MIT license. */
/* eslint camelcase: ["error",{properties: "never"}] */
import 'es6-promise';
import Vue from 'vue';
import vueBemCn from 'Resources/vendor/bem';

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
import {waitForElement} from 'Resources/helpers';

import './sass/mx-header.scss';

waitForElement('mxHeader', Header, 500); // 500 * 10ms timeout = 5s timeout
waitForElement('mxFooter', Footer, 500); // 500 * 10ms timeout = 5s timeout
