import React from 'react';
import ReactDOM from 'react-dom';

import MxHeader from './components/MxHeader';
import MxFooter from './components/MxFooter';

import observe from './utils/observe';

import './style/MxHeader.scss';
import './style/MxFooter.scss';

let header: Element | undefined;
let footer: Element | undefined;

const mount = (className: string, Component: React.ComponentType<any>) => {
    try {
        const element = document.getElementsByClassName(className)[0];
        if (element) ReactDOM.render(<Component />, element);
        return element;
    } catch (error) {
        console.error(`
Cannot find any tag with the specific css classes. Please do the following:
-   Create a container with css class 'mxHeader' at the top of your layout.
-   Create a container with css class 'mxFooter' at the bottom of your layout.
        `);
    }
};
observe(observer => {
    header = mount('mxHeader', MxHeader);
    footer = mount('mxFooter', MxFooter);
    if (header && footer) {
        observer.disconnect();
    }
});
