/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }] */
import Vue from 'vue';

const getEnvironment = () => {
  const domain = location.origin;
  if (domain.indexOf('home-test.mendix.com') !== -1) {
    return '-test';
  } else if (domain.indexOf('home-accp.mendix.com') !== -1) {
    return '-accp';
  }
  return '';
};

const onSprintr = () => [
  'https://sprintr.home.mendix.com',
  'https://sprintr.home-test.mendix.com',
  'https://sprintr.home-accp.mendix.com'
].indexOf(location.origin) !== -1;

const replaceEnvLink = link => {
  if (!link || link.indexOf('home.mendix.com') === -1) {
    return link;
  }
  return link.replace('home.mendix.com', `home${getEnvironment()}.mendix.com`);
};

const constants = {
  copyRight: `Copyright &copy; ${(new Date()).getFullYear()} Mendix.`
};

const urls = {
  platform: replaceEnvLink('https://home.mendix.com/'),
  developer: replaceEnvLink('https://sprintr.home.mendix.com/link/myprofile'),
  community: 'https://developer.mendixcloud.com/link/dashboard/',
  github: 'https://github.com/mendix',
  twitter: 'https://twitter.com/MendixDeveloper',
  linkedin: 'https://www.linkedin.com/company/mendix',
  googleplus: 'https://plus.google.com/+MendixSocial',
  facebook: 'https://www.facebook.com/mendixsoftware',
  instagram: 'https://www.instagram.com/mendixinc/'
};

const isSmallViewport = () => window.innerWidth <= 992;
const isPhoneViewport = () => window.innerWidth <= 480;

const waitForElementIdCb = (id, func, num = 200) => {
  const el = document.getElementById(id);
  if (el !== null) {
    func(el, num);
    return;
  }
  if (num <= 0) {
    return; // console.log(`[MX-HEADER-FOOTER] Cannot find element with ID: ${id}`);
  }
  setTimeout(() => {
    waitForElementIdCb(id, func, num - 1);
  }, 10);
};

const waitForElementId = (id, vueComponent, store, num = 200) => {
  const el = document.getElementById(id);
  if (el !== null) {
    const ignoredElement = new Vue({
      el: `#${id}`,
      store,
      render: h => h(vueComponent)
    });
    return;
  }
  if (num <= 0) {
    return; // console.log(`[MX-HEADER-FOOTER] Cannot find element with ID: ${id}`);
  }
  setTimeout(() => {
    waitForElementId(id, vueComponent, store, num - 1);
  }, 10);
};

const waitFor = (predicate, callback, timeoutCallback = () => {}, num = 200) => {
  if (predicate()) {
    callback();
    return;
  }
  if (num <= 0) {
    timeoutCallback();
    return;
  }
  setTimeout(() => {
    waitFor(predicate, callback, timeoutCallback, num - 1);
  }, 10);
};

const waitForMX = (callback, timeoutCallback = () => {}) =>
  waitFor(() => typeof window.mx !== 'undefined' && window.mx.session, callback, timeoutCallback);

const hasElement = className => document.getElementsByClassName(className).length > 0;

const waitForElementClass = (className, vueComponent, store, num = 200) => {
  const el = document.getElementsByClassName(className);
  if (el.length === 1) {
    const ignoredElement = new Vue({
      el: `.${className}`,
      store,
      render: h => h(vueComponent)
    });
    return;
  }
  if (num <= 0) {
    return; // console.log(`[MX-HEADER-FOOTER] Cannot find element with ID: ${id}`);
  }
  setTimeout(() => {
    waitForElementClass(className, vueComponent, store, num - 1);
  }, 10);
};

export {
  urls,
  isSmallViewport,
  isPhoneViewport,
  constants,
  getEnvironment,
  hasElement,
  onSprintr,
  waitForElementId,
  waitForElementIdCb,
  waitForElementClass,
  waitForMX,
  replaceEnvLink
};
