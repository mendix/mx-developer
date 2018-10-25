export const StickyDirective = {
  bind(el, binding) {
    if (binding.value === undefined) {
      el.style.position = 'fixed';
    } else {
      el.style.position = binding.value.active ? 'fixed' : 'relative';
      el.style.top = binding.value.top + 'px';
    }
  }
};
