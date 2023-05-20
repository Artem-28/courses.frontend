import { Directive, DirectiveBinding, createApp } from 'vue';
import { ICustomHTMLElement } from 'src/types/type-component-props';
import BaseLoader from 'src/components/base/BaseLoader.vue';

const loading: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    updateLoadingState(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    updateLoadingState(el, binding);
  }
};

function updateLoadingState(el: ICustomHTMLElement, binding: DirectiveBinding) {
  const isLoading = binding.value;
  if (isLoading) {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.zIndex = '99999';
    container.style.width = '100%';
    container.style.height = '100%';
    el.insertBefore(container, el.firstChild);
    const app = createApp(BaseLoader);
    app.mount(container);
    el.__app = app;
    return;
  }
  const app = el.__app;
  if (!app) return;
  app.unmount();
  el.removeChild(app._container);
  delete el.__app;
}

export default loading;
