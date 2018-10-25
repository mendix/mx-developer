import Vue from "vue";
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import HeaderLink from "./HeaderLink.vue";
import HeaderLinkMixin from "../mixins/HeaderLink.vue";
import headerLinkData from "../../../resources/menu/header.json";
import {renderComponent} from "../../../resources/specHelpers";

const localVue = createLocalVue();
localVue.use(Vuex);

describe('HeaderLink component', () => {
  let comp;
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

    // comp = shallowMount(HeaderLinkMixin);
    // jest.resetModules();
    // jest.clearAllMocks();
  });

  it('Should return headerlink component name', () => {
    expect(HeaderLink.name).toBe('headerlink');
  });
  it('HeaderlinkMixin has data', () => {
    expect(typeof HeaderLinkMixin.data).toBe('function');
  });
  it('HeaderlinkMixin component has correct default data', () => {
    const data = HeaderLinkMixin.data();
    expect(data.on).toEqual(false);
  });
  it('Should check for default mob state store getter, mounting component with links data', () => {
    // const vm = new Vue(HeaderLinkMixin, {
    //   store,
    //   propsData: {
    //     link: headerLinkData[5]
    //   }
    // }).$mount();

    // const vm = shallowMount(HeaderLink, {
    //   localVue,
    //   store,
    //   mixins: [HeaderLinkMixin],
    //   propsData: {
    //     link: headerLinkData[5]
    //   }
    // });
    //  const renderer = renderComponent(HeaderLinkMixin, {
    //    store,
    //    mixins: [HeaderLinkMixin],
    //    propsData: {
    //      link: headerLinkData[5]
    //    }
    //  });
    //  const vm = renderer.component;
    //
    // Vue.nextTick(() => {
    //   expect(vm.mobStateGetter).toBeFalsy();
    // });
  });
});