/*
  Installing the plugin failed in webpack, so this is a copy
  Copied from https://github.com/c01nd01r/vue-bem-cn
  Copyright (c) 2017 Stanislav Eremenko (c01nd01r)
 */
import bemCn from 'bem-cn-lite';

export default {
  install(Vue, config) {
    const cfg = Object.assign({
      el: '__',
      mod: '--',
      modValue: '-'
    }, config);

    bemCn.setup(cfg);

    Vue.mixin({
      created() {
        const block = this.$options.block || this.$options.name;

        if (typeof block !== 'string') {
          return;
        }

        const generator = bemCn(block);
        this.b = (...args) => generator(...args);
      }
    });
  }
};
