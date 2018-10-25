import {renderComponent} from 'Resources/specHelpers';
import Main from './index.vue';

describe('Footer', () => {
  it('should be a footer-block', () => {
    expect(Main.name).toEqual('footer-block');
  });
  it('has data', () => {
    const data = Main.data();
    const copy = `Copyright &copy; ${(new Date()).getFullYear()} Mendix.`;

    expect(data.copyRight).toEqual(copy);
    expect(data.links.length).not.toBe(0);
    expect(data.urls.length).not.toBe(0);
  });
  it('should render', () => {
    const comp = renderComponent(Main).component;
    expect(comp.$el.textContent.length).not.toBe(0);
  });
});
