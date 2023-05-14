import { reactive, ref, watch } from 'vue';
import { FCallHookDrag } from 'src/types/type-hook';
import { FCompositionUseDrag } from 'src/types/type-composition';
import { IPosition } from 'src/types/type-component-props';

const useDrag: FCompositionUseDrag = (refElement, position, hook) => {
  const dragOffset = reactive<IPosition>({ ...position });
  const shift = reactive<IPosition>({ x: 0, y: 0 });
  const scene = ref<HTMLElement>(document.body);
  let elemRect: DOMRect | null = null;
  let sceneRect: DOMRect = scene.value.getBoundingClientRect();

  const callHook: FCallHookDrag = (type) => {
    if (hook && type in hook) {
      const data = {
        elem: refElement.value as HTMLElement,
        elemRect: elemRect as DOMRect,
        position: { ...dragOffset }
      };
      hook[type]!(data);
    }
  };

  watch(refElement, () => {
    if (!refElement.value) return;
    refElement.value.ondragstart = () => false;
    const parent = refElement.value?.parentElement;
    if (!parent) return;
    scene.value = parent;
  });

  /* Methods */
  // promote your methods...
  function dragStart(e: MouseEvent) {
    if (!refElement.value) return;
    const coords = getCoords(refElement.value);
    sceneRect = scene.value.getBoundingClientRect();
    shift.x = e.pageX - coords.left;
    shift.y = e.pageY - coords.top;
    callHook('dragStart');
    moveAt(e);

    scene.value.addEventListener('mousemove', moveAt);
    scene.value.addEventListener('wheel', wheelSceneHandler);
    refElement.value.addEventListener('mouseup', dragStop);
  }

  function dragStop() {
    if (!refElement.value) return;
    scene.value.removeEventListener('mousemove', moveAt);
    scene.value.removeEventListener('wheel', wheelSceneHandler);
    refElement.value.removeEventListener('mouseup', dragStop);
    callHook('dragStop');
  }

  function moveAt(e: MouseEvent) {
    e.preventDefault();
    const rect = sceneRect as DOMRect;
    dragOffset.x = (e.pageX - rect.left - shift.x);
    dragOffset.y = (e.pageY - rect.top - shift.y);
    callHook('move');
  }

  function getCoords(elem: HTMLElement) {
    elemRect = elem.getBoundingClientRect();
    return {
      top: elemRect.top + pageYOffset,
      left: elemRect.left + pageXOffset
    };
  }

  function wheelSceneHandler(e: WheelEvent) {
    e.preventDefault();
  }

  return {
    position: dragOffset,
    dragStart,
    dragStop
  };
};

export default useDrag;
