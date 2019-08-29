import React from 'react';
import ReactDOM from 'react-dom';

import MxHeader from './components/MxHeader';
import MxFooter from './components/MxFooter';

import './style/MxHeader.scss';
import './style/MxFooter.scss';

const observer = new MutationObserver(() => {
    const headerElements = document.getElementsByClassName('mxHeader');
    const footerElements = document.getElementsByClassName('mxFooter');

    if (headerElements.length > 0 && footerElements.length > 0) {
        ReactDOM.render(<MxHeader />, headerElements[0]);
        ReactDOM.render(<MxFooter />, footerElements[0]);

        observer.disconnect();
    }
});

observer.observe(document.body, { childList: true });

/**
 * Testing locally
 */

setTimeout(function() {
    const headerElement = document.createElement('div');
    const contentElement = document.createElement('div');
    const footerElement = document.createElement('div');
    headerElement.className = 'mxHeader';
    contentElement.setAttribute('style', 'height: 800px; width: 100%');
    footerElement.className = 'mxFooter';
    document.body.appendChild(headerElement);
    document.body.appendChild(contentElement);
    document.body.appendChild(footerElement);
}, 100);
