import {renderComponent} from 'Resources/specHelpers';
import Main from './Profile.vue';

describe('Profile', () => {
  it('should be a profile', () => {
    expect(Main.name).toEqual('profile');
  });
  it('should render', () => {
    const comp = renderComponent(Main).component;
    expect(comp.$el.textContent.length).not.toBe(0);
  });
});
