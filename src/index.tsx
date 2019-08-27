import React from 'react';
import ReactDOM from 'react-dom';

import MxHeader from './components/MxHeader';
import MxFooter from './components/MxFooter';

import './style/MxHeader.scss';
import './style/MxFooter.scss';

ReactDOM.render(<MxHeader />, document.getElementById('mxHeader'));
ReactDOM.render(<MxFooter />, document.getElementById('mxFooter'));
