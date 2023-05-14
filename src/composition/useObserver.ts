import { ref, onBeforeUnmount } from 'vue';
import { FCompositionUseObserver, IObserverType } from 'src/types/type-composition';

const useObserver: FCompositionUseObserver = (type, elem, callback = () => ({})) => {
  onBeforeUnmount(() => {
    disconnectObserver();
  });
  const observers: IObserverType = {
    resize: () => new ResizeObserver(callback),
    mutation: () => new MutationObserver(callback)
  };

  const observer = ref<ResizeObserver | MutationObserver | null>(null);

  function createObserver(elem: HTMLElement) {
    const observer = observers[type]();
    observer.observe(elem, { attributes: true });
    return observer;
  }

  function enableObserver() {
    if (!elem.value) return;
    observer.value = createObserver(elem.value);
  }

  function disconnectObserver() {
    if (!observer.value) return;
    observer.value.disconnect();
    observer.value = null;
  }

  return {
    enable: enableObserver,
    disconnect: disconnectObserver
  };
};

export default useObserver;
