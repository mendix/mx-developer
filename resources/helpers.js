/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }] */
import Vue from 'vue';

const constants = {
  copyRight: `Copyright &copy; ${(new Date()).getFullYear()} Mendix.`
};

const urls = {
  platform: 'https://home.mendix.com/',
  developer: 'https://sprintr.home.mendix.com/link/myprofile',
  community: 'https://developer.mendixcloud.com/link/ownprofile/',
  github: 'https://github.com/mendix',
  twitter: 'https://twitter.com/MendixDeveloper',
  linkedin: 'https://www.linkedin.com/company/mendix',
  googleplus: 'https://plus.google.com/+MendixSocial',
  facebook: 'https://www.facebook.com/mendixsoftware',
  instagram: 'https://www.instagram.com/mendixinc/'
};

const isSmallViewport = () => window.innerWidth <= 992;

const waitForElementId = (id, vueComponent, num = 200) => {
  const el = document.getElementById(id);
  if (el !== null) {
    const ignoredElement = new Vue({
      el: `#${id}`,
      render: h => h(vueComponent)
    });
    return;
  }
  if (num <= 0) {
    return; // console.log(`[MX-HEADER-FOOTER] Cannot find element with ID: ${id}`);
  }
  setTimeout(() => {
    waitForElementId(id, vueComponent, num - 1);
  }, 10);
};

const waitForElementClass = (className, vueComponent, num = 200) => {
  const el = document.getElementsByClassName(className);
  if (el.length === 1) {
    const ignoredElement = new Vue({
      el: `#${className}`,
      render: h => h(vueComponent)
    });
    return;
  }
  if (num <= 0) {
    return; // console.log(`[MX-HEADER-FOOTER] Cannot find element with ID: ${id}`);
  }
  setTimeout(() => {
    waitForElementClass(className, vueComponent, num - 1);
  }, 10);
};

export {
  urls,
  isSmallViewport,
  constants,
  waitForElementId,
  waitForElementClass
};
