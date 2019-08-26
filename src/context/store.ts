import createStore from 'react-simple-redux';
import reducer from './reducer';

const { Provider, Consumer, connect } = createStore(reducer, {});

export { Provider, Consumer, connect };
