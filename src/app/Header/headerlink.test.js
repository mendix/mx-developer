import { shallowMount, createLocalVue } from '@vue/test-utils';
import HeaderLink from "./HeaderLink.vue";
import HeaderLinkMixin from "../mixins/HeaderLink.vue";
import headerLinkData from "../../../resources/menu/header.json";

describe('HeaderLink component', () => {
  it('Should return headerlink component name', () => {
    expect(HeaderLink.name).toBe('headerlink');
  });
  // it('Headerlink component has data', () => {
  //   const localVue = createLocalVue();
  //   const component = shallowMount(HeaderLink, {
  //     localVue,
  //     mixins: [HeaderLinkMixin],
  //     propsData: {
  //       link: headerLinkData[5]
  //     }
  //   });
  //   expect(typeof HeaderLink.data).toBe('function');
  // });
  // it('Headerlink component has correct default data', () => {
    // const data = HeaderLink.data();
    // expect(data.on).toEqual(false);
  // });
});