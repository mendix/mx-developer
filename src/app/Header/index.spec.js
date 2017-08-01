import {renderComponent} from 'Resources/specHelpers';
import Main from './index.vue';

describe('Header', () => {
  it('should be a header', () => {
    expect(Main.name).toEqual('header');
  });
  it('has data', () => {
    const data = Main.data();

    expect(data.mob).toEqual(false);
  });
  it('should render', () => {
    const comp = renderComponent(Main).component;
    expect(comp.$el.textContent.length).not.toBe(0);
  });
  it('should flip when menu is triggered', () => {
    const comp = renderComponent(Main).component;
    expect(comp.$data.mob).toEqual(false);
    comp.menu();
    expect(comp.$data.mob).toEqual(true);
  });
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
