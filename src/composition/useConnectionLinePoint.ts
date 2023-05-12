import { computed, reactive } from 'vue';
import { FCompositionUseConnectionLinePoint } from 'src/types/type-composition';
import { IPosition, ISize } from 'src/types/type-component-props';

const useConnectionLinePoint: FCompositionUseConnectionLinePoint = (fromElement, toElement) => {
  const fromElementSize = reactive<ISize>({ width: 0, height: 0 });
  const toElementSize = reactive<ISize>({ width: 0, height: 0 });
  const fromElementPosition = reactive<IPosition>({ x: 0, y: 0 });
  const toElementPosition = reactive<IPosition>({ x: 0, y: 0 });

  const fromPoints = computed(() => {
    const { x, y } = fromElementPosition;
    const { height, width } = fromElementSize;
    return {
      left: { x, y: y + height / 2 },
      right: { x: x + width, y: y + height / 2 }
    };
  });

  const toPoints = computed(() => {
    const { x, y } = toElementPosition;
    const { width, height } = toElementSize;
    return {
      top: { x: x + width / 2, y },
      bottom: { x: x + width / 2, y: y + height },
      left: { x, y: y + 15 },
      right: { x: x + width, y: y + 15 }
    };
  });

  function updateSize(type: 'from' | 'to', zoom = 1) {
    switch (type) {
      case 'from':
        updateFromElementSize(zoom);
        break;
      case 'to':
        updateToElementSize(zoom);
    }
  }

  function updatePosition(type: 'from' | 'to', offset: IPosition = { x: 0, y: 0 }, zoom = 1) {
    switch (type) {
      case 'from':
        updateFromElementPosition(offset, zoom);
        break;
      case 'to':
        updateToElementPosition(offset, zoom);
    }
  }

  function updateFromElementSize(zoom: number) {
    if (!fromElement.value) return;
    const { width, height } = fromElement.value.getBoundingClientRect();
    fromElementSize.width = width / zoom;
    fromElementSize.height = height / zoom;
  }
  function updateToElementSize(zoom: number) {
    if (!toElement.value) return;
    const { width, height } = toElement.value.getBoundingClientRect();
    toElementSize.width = width / zoom;
    toElementSize.height = height / zoom;
  }

  function updateFromElementPosition(offset: IPosition, zoom: number) {
    if (!fromElement.value) return;
    const { left, top } = fromElement.value.getBoundingClientRect();
    fromElementPosition.x = (left + pageXOffset - offset.x) / zoom;
    fromElementPosition.y = (top + pageYOffset - offset.y) / zoom;
  }
  function updateToElementPosition(offset: IPosition, zoom: number) {
    if (!toElement.value) return;
    const { left, top } = toElement.value.getBoundingClientRect();
    toElementPosition.x = (left + pageXOffset - offset.x) / zoom;
    toElementPosition.y = (top + pageYOffset - offset.y) / zoom;
  }

  return {
    fromPoints,
    toPoints,
    updateSize,
    updatePosition
  };
};
export default useConnectionLinePoint;
