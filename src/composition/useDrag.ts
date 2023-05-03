import { reactive, ref, watch } from 'vue';
import { CallHookDrag } from 'src/types/hook';
import { Position } from 'src/types/component-props';
import { CompositionUseDrag } from 'src/types/composition';

const useDrag: CompositionUseDrag = (refElement, position, hook) => {
  const dragOffset = reactive<Position>({ ...position });
  const shift = reactive<Position>({ x: 0, y: 0 });
  const scene = ref<HTMLElement>(document.body);
  let elemRect: DOMRect | null = null;
  let sceneRect: DOMRect = scene.value.getBoundingClientRect();

  const callHook: CallHookDrag = (type) => {
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
    refElement.value.addEventListener('mouseup', dragStop);
  }

  function dragStop() {
    if (!refElement.value) return;
    scene.value.removeEventListener('mousemove', moveAt);
    refElement.value.removeEventListener('mouseup', dragStop);
    callHook('dragStop');
  }

  function moveAt(e: MouseEvent) {
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

  return {
    position: dragOffset,
    dragStart,
    dragStop
  };
};

export default useDrag;
