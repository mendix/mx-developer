const trackerId = process.env.OPTIONS.trackerId;

let gaEnabled = false;
let gaCheck = false;

const trackerName = 'bannerTracker';

const tracker = (type, category, event) => {
  if (!gaCheck) {
    if (typeof window.ga !== 'undefined') {
      gaEnabled = true;
      window.ga('create', trackerId, 'auto', trackerName);
    }
    gaCheck = true;
  }
  if (gaEnabled) {
    window.ga(`${trackerName}.send`, type, category, event);
  }
};

const trackEvent = (category, event) => {
  tracker('event', category, event);
};

const trackPage = () => {
  const page = document.location.host + document.location.pathname;
  tracker('pageview', page);
};

const trackHeaderLink = name => {
  trackEvent('Header', `Link: ${name}`);
};

const trackShow = () => {
  trackEvent('Banner', `Show`);
};

export {
  trackPage,
  trackEvent,
  trackHeaderLink,
  trackShow
};
