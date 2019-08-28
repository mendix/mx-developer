import React from 'react';
import ReactDOM from 'react-dom';

// import { waitForElementId } from './utils/mxHelpers';
import MxHeader from './components/MxHeader';
import MxFooter from './components/MxFooter';

import './style/MxHeader.scss';
import './style/MxFooter.scss';

// waitForElementId('mxHeader', MxHeader);
// waitForElementId('mxFooter', MxFooter);

ReactDOM.render(<MxHeader />, document.getElementById('mxHeader'));
ReactDOM.render(<MxFooter />, document.getElementById('mxFooter'));
