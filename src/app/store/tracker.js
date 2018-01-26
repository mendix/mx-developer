const trackerId = process.env.OPTIONS.trackerId;

let gaEnabled = false;
let gaCheck = false;

const trackerName = 'bannerTracker';

const trackEvent = (category, event) => {
  if (!gaCheck) {
    if (typeof window.ga !== 'undefined') {
      gaEnabled = true;
      window.ga('create', trackerId, 'auto', trackerName);
    }
    gaCheck = true;
  }
  if (gaEnabled) {
    window.ga(`${trackerName}.send`, 'event', category, event);
  }
};

const trackHeaderLink = name => {
  trackEvent('Header', `Link: ${name}`);
};

const trackShow = () => {
  trackEvent('Banner', `Show`);
};

export {
  trackEvent,
  trackHeaderLink,
  trackShow
};
