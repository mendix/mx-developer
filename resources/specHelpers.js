import Vue from 'vue';
import vueBemCn from './vendor/bem';

const vueExport = () => {
  Vue.use(vueBemCn, {
    ns: 'mx-developer__', // namespace
    el: '__', // element delimeter
    mod: '--', // modifier delimeter
    modValue: '-' // value delimeter for modifier
  });
  return Vue;
};

const renderComponent = (Component, ...props) => {
  const Vue = vueExport();
  const Constructor = Vue.extend(Component);
  const component = new Constructor(props).$mount();
  return {
    component,
    Vue
  };
};

export {
  vueExport,
  renderComponent
};
