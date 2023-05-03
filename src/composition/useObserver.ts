import { CompositionUseObserver, ObserverType } from 'src/types/composition';
import { ref, onBeforeUnmount } from 'vue';

const useObserver: CompositionUseObserver = (type, elem, callback = () => ({})) => {
  onBeforeUnmount(() => {
    disconnectObserver();
  });
  const observers: ObserverType = {
    resize: () => new ResizeObserver(callback)
  };

  const observer = ref<ResizeObserver | null>(null);

  function createObserver(elem: HTMLDivElement) {
    const observer = observers[type]();
    observer.observe(elem);
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
