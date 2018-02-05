const trackerId = process.env.OPTIONS.trackerId;

let gaEnabled = false;
let gaCheck = false;

const trackerName = 'bannerTracker';

const track = (type, category, action, label, value, fieldsObject) => { // eslint-disable-line max-params
  if (!gaCheck) {
    if (typeof window.ga !== 'undefined') {
      gaEnabled = true;
      window.ga('create', trackerId, 'auto', trackerName);
    }
    gaCheck = true;
  }
  if (gaEnabled) {
    if (!type) {
      return;
    }
    const trackArr = [
      `${trackerName}.send`,
      type
    ];
    if (typeof category !== 'undefined') {
      trackArr.push(category);
      if (typeof action !== 'undefined') {
        trackArr.push(action);
      }
    }
    if (typeof category !== 'undefined' && typeof action !== 'undefined' && typeof label !== 'undefined') {
      trackArr.push(label);
      if (typeof value !== 'undefined') {
        trackArr.push(value);
        if (typeof fieldsObject !== 'undefined') {
          trackArr.push(fieldsObject);
        }
      }
    }
    if (process.env.NODE_ENV === 'production') {
      window.ga.apply(window.ga, trackArr);
    } else {
      console.log('tracker send:', trackArr);
    }
  }
};

const trackEvent = (category, event) => {
  track('event', category, event);
};

const trackPage = () => {
  const page = document.location.host + document.location.pathname;
  if (gaEnabled) {
    if (process.env.NODE_ENV === 'production') {
      window.ga(`${trackerName}.set`, 'page', page);
    } else {
      console.log(`${trackerName}.set`, 'page', page);
    }
  }
  track('pageView', page);
};

const trackHeaderLink = url => {
  track('event', {
    eventCategory: 'HeaderFooter',
    eventAction: 'click',
    eventLabel: url,
    transport: 'beacon'
  });
};

const trackShow = () => {
  trackPage();
  trackEvent('HeaderFooter', `Show`);
};

const trackerObj = {
  track,
  trackEvent,
  trackPage,
  trackHeaderLink,
  trackShow
};

export default function install(Vue) {
  Vue.prototype.$tracker = Vue.$tracker = trackerObj;

  const onClickLink = evt => {
    if (evt.target.href) {
      trackHeaderLink(evt.target.href);
    } else if (evt.target.parentElement && evt.target.parentElement.href) {
      trackHeaderLink(evt.target.parentElement.href);
    }
  };

  Vue.directive('track-link', {
    isFn: true,
    bind: el => { // eslint-disable-line object-shorthand
      el.addEventListener('click', onClickLink, true);
    },
    unbind: el => {
      el.removeEventListener('click', onClickLink, true);
    }
  });
}
