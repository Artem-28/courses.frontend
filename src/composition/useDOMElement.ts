import { FCompositionUseDOMElement } from 'src/types/type-composition';

const useDOMElement: FCompositionUseDOMElement = (setCacheCallback, getCacheCallback) => {
  function getElement(elementId: string, cache = false) {
    let element: HTMLElement | null = null;
    if (cache && typeof getCacheCallback === 'function') {
      element = getCacheCallback(elementId);
    }
    if (element) return element;

    element = document.getElementById(elementId);
    if (cache && element && typeof setCacheCallback === 'function') {
      setCacheCallback(elementId, element);
    }
    return element;
  }
  return { getElement };
};

export default useDOMElement;
