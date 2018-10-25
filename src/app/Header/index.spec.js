import {renderComponent} from 'Resources/specHelpers';
import { mount, createLocalVue } from "@vue/test-utils";
import Main from './index.vue';
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Header', () => {
  let actions;
  let store;
  let getters;

  beforeEach(() => {
    actions = {
      mobStateSetAction: jest.fn()
    };
    store = new Vuex.Store({
      state: {},
      actions,
      getters
    });
  });

  it('should be a header-block', () => {
    expect(Main.name).toEqual('header-block');
  });
  // it('has data', () => {
  //   const data = Main.data();
  //   expect(data.phone).toEqual(false);
  // });
  // it('Should trigger hamburger button', () => {
  //   const component = mount(Main, {localVue, store});
  //
  //   expect(component.html()).toMatchSnapshot();
  //   component.find('[jest="hamburger-button"]').trigger('click');
  //   expect(component.html()).toMatchSnapshot();
  //
  // });
  // it('should flip when menu is triggered', () => {
  //   const comp = renderComponent(Main).component;
  //   expect(comp.$data.phone).toEqual(false);
  //   comp.menu();
  //   expect(comp.$data.phone).toEqual(true);
  // });
  // it('should flip when menu is and keep on handleResize', done => {
  //   const rendered = renderComponent(Main);
  //   const comp = rendered.component;
  //   comp.menu();
  //   comp.handleResize();
  //   rendered.Vue.nextTick(() => {
  //     setTimeout(() => {
  //       expect(comp.$data.mob).toEqual(true);
  //       done();
  //     }, 100);
  //   });
  // });
  // it('should flip when menu is and switch on handleResize', done => {
  //   const rendered = renderComponent(Main);
  //   const comp = rendered.component;
  //   expect(comp.$data.mob).toEqual(false);
  //   window.innerWidth = 1000;
  //   comp.menu();
  //   comp.handleResize();
  //   rendered.Vue.nextTick(() => {
  //     setTimeout(() => {
  //       expect(comp.$data.mob).toEqual(false);
  //       done();
  //     }, 100);
  //   });
  // });
});
