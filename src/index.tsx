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
