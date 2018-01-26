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
    if (event) {
      window.ga(`${trackerName}.send`, type, category, event);
    } else {
      window.ga(`${trackerName}.send`, type, category);
    }
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
  trackEvent('HeaderFooter', `Link: ${name}`);
};

const trackShow = () => {
  trackEvent('HeaderFooter', `Show`);
};

export {
  trackPage,
  trackEvent,
  trackHeaderLink,
  trackShow
};
