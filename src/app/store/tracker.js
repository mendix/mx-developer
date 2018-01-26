const trackerId = process.env.OPTIONS.trackerId;

let gaEnabled = false;
let gaCheck = false;

const trackerName = 'bannerTracker';
const sendId = `${trackerName}.send`;

const gaChecker = () => {
  if (!gaCheck) {
    if (typeof window.ga !== 'undefined') {
      gaEnabled = true;
      window.ga('create', trackerId, 'auto', trackerName);
    }
    gaCheck = true;
  }
};

const tracker = (type, category, opts) => {
  gaChecker();
  if (gaEnabled) {
    const evtArr = [sendId, type, category];
    if (opts.action) {
      evtArr.push(opts.action);
    }
    if (opts.action && opts.label) {
      evtArr.push(opts.label);
      if (opts.value) {
        evtArr.push(opts.value);
        if (opts.fields) {
          evtArr.push(opts.fields);
        }
      }
    }
    window.ga.apply(window, evtArr);
  }
};

const outBoundLinkTracker = url => {
  tracker('event', 'outbound', {
    action: 'click',
    label: url,
    fields: {
      transport: 'beacon',
      hitCallback: () => {
        document.location = url;
      }
    }
  });
  gaChecker();
};

const trackEvent = (category, eventName) => {
  tracker('event', category, {action: eventName});
};

const trackPage = () => {
  const page = document.location.host + document.location.pathname;
  tracker('pageview', page);
};

const trackShow = () => {
  trackEvent('HeaderFooter', `Show`);
};

export {
  trackPage,
  trackEvent,
  trackShow,
  outBoundLinkTracker
};
