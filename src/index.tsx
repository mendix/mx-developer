import React from 'react';
import ReactDOM from 'react-dom';
import Observer from 'mutation-observer';
import debounce from 'tiny-debounce';

import MxHeader from './components/MxHeader';
import MxFooter from './components/MxFooter';

import './style/MxHeader.scss';
import './style/MxFooter.scss';

const mount = (id: string, Component: React.ComponentType<any>) => {
    const elements = document.getElementsByClassName(id);
    const element =
        document.getElementById(id) || (elements.length > 0 && elements[0]);
    if (element) {
        ReactDOM.render(<Component />, element);
    }
};

const observer = new Observer(
    debounce(() => {
        mount('mxHeader', MxHeader);
        mount('mxFooter', MxFooter);
    }, 100)
);

observer.observe(document, {
    subtree: true,
    childList: true,
    attributes: false,
    characterData: false,
    attributeOldValue: false,
    characterDataOldValue: false,
});

/**
 * Testing locally
 */

if (process.env.NODE_ENV === 'development') {
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
}
