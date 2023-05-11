import { FCompositionUseConnectionLinePoint } from 'src/types/type-composition';
import { computed, reactive } from 'vue';
import { IPosition, ISize } from 'src/types/type-component-props';

const useConnectionLinePoint: FCompositionUseConnectionLinePoint = (fromElement, toElement) => {
  const fromElementSize = reactive<ISize>({ width: 0, height: 0 });
  const toElementSize = reactive<ISize>({ width: 0, height: 0 });
  const fromElementPosition = reactive<IPosition>({ x: 0, y: 0 });
  const toElementPosition = reactive<IPosition>({ x: 0, y: 0 });

  const fromLeftPoint = computed(() => {
    const { x, y } = fromElementPosition;
    const { height } = fromElementSize;
    return { x, y: y + height / 2 };
  });
  const fromRightPoint = computed(() => {
    const { x, y } = fromElementPosition;
    const { height, width } = fromElementSize;
    return { x: x + width, y: y + height / 2 };
  });

  const toLeftPoint = computed(() => {
    const { x, y } = toElementPosition;
    const topIdent = 15;
    return { x, y: y + topIdent };
  });
  const toRightPoint = computed(() => {
    const topIdent = 15;
    const { x, y } = toElementPosition;
    const { width } = toElementSize;
    return { x: x + width, y: y + topIdent };
  });
  const toTopPoint = computed(() => {
    const { x, y } = toElementPosition;
    const { width } = toElementSize;
    return { x: x + width / 2, y };
  });
  const toBottomPoint = computed(() => {
    const { x, y } = toElementPosition;
    const { width, height } = toElementSize;
    return { x: x + width / 2, y: y + height };
  });

  // Растояние по оси X
  // от блока from точка right
  // до блока to точка right
  const dXFromRToR = computed(() => {
    return toRightPoint.value.x - fromRightPoint.value.x;
  });

  // Растояние по оси X
  // от блока from точка right
  // до блока to точка left
  const dXFromRToL = computed(() => {
    return toLeftPoint.value.x - fromRightPoint.value.x;
  });

  // Растояние по оси X
  // от блока from точка right
  // до блока to точка top
  const dXFromRToT = computed(() => {
    return toTopPoint.value.x - fromRightPoint.value.x;
  });

  // Растояние по оси X
  // от блока from точка right
  // до блока to точка top
  const dXFromRToB = computed(() => {
    return toBottomPoint.value.x - fromRightPoint.value.x;
  });

  // Растояние по оси X
  // от блока from точка right
  // до блока to точка top
  const DXFromLToB = computed(() => {
    return fromLeftPoint.value.x - toBottomPoint.value.x;
  });

  // Растояние по оси X
  // от блока from точка left
  // до блока to точка left
  const dXFromLToL = computed(() => {
    return fromLeftPoint.value.x - toLeftPoint.value.x;
  });

  // Растояние по оси X
  // от блока from точка left
  // до блока to точка top
  const dXFromLToT = computed(() => {
    return fromLeftPoint.value.x - toTopPoint.value.x;
  });

  // Растояние по оси X
  // от блока from точка left
  // до блока to точка right
  const dXFromLToR = computed(() => {
    return fromLeftPoint.value.x - toRightPoint.value.x;
  });

  // Растояние по оси y
  // от блока from точка right
  // до блока to точка bottom
  const dYFromLToB = computed(() => {
    return fromRightPoint.value.y - toBottomPoint.value.y;
  });

  // Валидация left точки to блока
  const isValidToLeftPoint = computed(() => {
    // Если to блок находится справа по отношению к from блоку
    if (isValidFromRightPoint.value) {
      return dXFromRToL.value - 40 > 0;
    }
    // Если to блок находится слева по отношению к from блоку
    return dXFromLToT.value < 40;
  });

  // Валидация top точки to блока
  const isValidToTopPoint = computed(() => {
    // Если to блок находится справа по отношению к from блоку
    if (isValidFromRightPoint.value) {
      return dXFromRToT.value - 40 > 0;
    }
    // Если to блок находится слева по отношению к from блоку
    return dXFromLToR.value < 40;
  });

  // Валидация bottom точки to блока
  const isValidToBottomPoint = computed(() => {
    // Если to блок находится справа по отношению к from блоку
    if (isValidFromRightPoint.value) {
      return dXFromRToB.value - 40 > 0 && dYFromLToB.value > 40;
    }
    return dXFromLToR.value < 40;
  });

  const isValidFromRightPoint = computed(() => {
    if (dYFromLToB.value > 0) {
      return dXFromRToB.value > 40 || (dXFromLToL.value > 0 && DXFromLToB.value < 40);
    }
    return dXFromRToR.value > dXFromLToL.value;
  });

  const fromPointType = computed(() => {
    return isValidFromRightPoint.value ? 'right' : 'left';
  });

  const toPointType = computed(() => {
    switch (true) {
      case dYFromLToB.value > 0 && isValidToLeftPoint.value:
        return 'left';
      case dYFromLToB.value > 0 && isValidToBottomPoint.value:
        return 'bottom';
      case isValidToLeftPoint.value:
        return 'left';
      case isValidToTopPoint.value:
        return 'top';
      default:
        return 'right';
    }
  });

  const fromPoint = computed(() => {
    switch (fromPointType.value) {
      case 'right':
        return fromRightPoint.value;
      case 'left':
        return fromLeftPoint.value;
      default:
        return null;
    }
  });

  const toPoint = computed(() => {
    switch (toPointType.value) {
      case 'top':
        return toTopPoint.value;
      case 'right':
        return toRightPoint.value;
      case 'bottom':
        return toBottomPoint.value;
      case 'left':
        return toLeftPoint.value;
      default:
        return null;
    }
  });

  function updateElementSize(type: 'from' | 'to', zoom = 1) {
    if (type === 'from') {
      updateFromElementSize(zoom);
      return;
    }
    updateToElementSize(zoom);
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

  function updateElementPosition(type: 'from' | 'to', offset: IPosition = { x: 0, y: 0 }, zoom = 1) {
    if (type === 'from') {
      updateFromElementPosition(offset, zoom);
      return;
    }
    updateToElementPosition(offset, zoom);
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
    fromLeftPoint,
    fromRightPoint,
    toTopPoint,
    toRightPoint,
    toBottomPoint,
    toLeftPoint,
    fromPoint,
    toPoint,
    updateElementSize,
    updateElementPosition
  };
};
export default useConnectionLinePoint;
