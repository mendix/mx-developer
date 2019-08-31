import React from 'react';
import ReactDOM from 'react-dom';

import MxHeader from './components/MxHeader';
import MxFooter from './components/MxFooter';

import observe from './utils/observe';

import './style/MxHeader.scss';
import './style/MxFooter.scss';

let header: Element;
let footer: Element;

const mount = (className: string, Component: React.ComponentType<any>) => {
    const element = document.getElementsByClassName(className)[0];
    if (element) ReactDOM.render(<Component />, element);
    return element;
};
observe(observer => {
    header = mount('mxHeader', MxHeader);
    footer = mount('mxFooter', MxFooter);
    if (header && footer) {
        observer.disconnect();
    }
});

/**
 * Testing locally
 */

if (process.env.NODE_ENV === 'development') {
    setTimeout(function() {
        const headerElement = document.createElement('div');
        headerElement.className = 'mxHeader';
        document.body.appendChild(headerElement);
    }, 100);
    setTimeout(function() {
        const contentElement = document.createElement('div');
        contentElement.setAttribute('style', 'height: 800px; width: 100%');
        document.body.appendChild(contentElement);
    }, 200);
    setTimeout(function() {
        const footerElement = document.createElement('div');
        footerElement.className = 'mxFooter';
        document.body.appendChild(footerElement);
    }, 300);
    // when a modal is open
    setTimeout(function() {
        const modalElement = document.createElement('div');
        modalElement.setAttribute(
            'style',
            `
            height: 1200px; 
            width: 100%; 
            position: absolute;
            top: 0;
            z-index: 100;
            background: rgba(0, 0, 0, 0.3);
        `
        );

        modalElement.className = 'mx-underlay';
        document.body.appendChild(modalElement);
    }, 1000);
}
