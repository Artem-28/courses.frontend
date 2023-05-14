import { FCompositionUseConnectionSwitchPoint } from 'src/types/type-composition';
import { computed } from 'vue';

const useConnectionSwitchPoint: FCompositionUseConnectionSwitchPoint = (fromPoints, toPoints) => {
  // Растояние по оси X
  // от блока from точка right
  // до блока to точка right
  const dXFromRToR = computed(() => {
    return toPoints.value.right.x - fromPoints.value.right.x;
  });

  // Растояние по оси X
  // от блока from точка right
  // до блока to точка left
  const dXFromRToL = computed(() => {
    return toPoints.value.left.x - fromPoints.value.right.x;
  });

  // Растояние по оси X
  // от блока from точка right
  // до блока to точка top
  const dXFromRToT = computed(() => {
    return toPoints.value.top.x - fromPoints.value.right.x;
  });

  // Растояние по оси X
  // от блока from точка right
  // до блока to точка top
  const dXFromRToB = computed(() => {
    return toPoints.value.bottom.x - fromPoints.value.right.x;
  });

  // Растояние по оси X
  // от блока from точка left
  // до блока to точка left
  const dXFromLToL = computed(() => {
    return fromPoints.value.left.x - toPoints.value.left.x;
  });

  // Растояние по оси X
  // от блока from точка left
  // до блока to точка top
  const dXFromLToT = computed(() => {
    return fromPoints.value.left.x - toPoints.value.top.x;
  });

  // Растояние по оси X
  // от блока from точка left
  // до блока to точка right
  const dXFromLToR = computed(() => {
    return fromPoints.value.left.x - toPoints.value.right.x;
  });

  // Растояние по оси X
  // от блока from точка left
  // до блока to точка right
  const dXFromLToB = computed(() => {
    return fromPoints.value.left.x - toPoints.value.bottom.x;
  });

  // Растояние по оси y
  // от блока from точка right
  // до блока to точка bottom
  const dYFromLToB = computed(() => {
    return fromPoints.value.right.y - toPoints.value.bottom.y;
  });

  // Растояние по оси y
  // от блока from точка right
  // до блока to точка top
  const dYFromLToT = computed(() => {
    return toPoints.value.top.y - fromPoints.value.right.y;
  });

  const posTypeToBlock = computed(() => {
    const x = dXFromRToR.value > dXFromLToL.value ? 'right' : 'left';
    if (dYFromLToB.value > 40) {
      return { x, y: 'top' };
    }
    if (dYFromLToT.value > 40) {
      return { x, y: 'bottom' };
    }
    return { x, y: 'middle' };
  });

  const fromPointType = computed(() => {
    const { x, y } = posTypeToBlock.value;
    switch (`${x}-${y}`) {
      case 'left-top':
        if (dXFromLToB.value <= 40) return 'right';
        return 'left';
      case 'right-top':
        if (dXFromRToB.value > 40) return 'right';
        return 'left';
      case 'right-middle':
      case 'right-bottom':
        return 'right';
      case 'left-middle':
      case 'left-bottom':
        return 'left';
      default:
        return 'right';
    }
  });

  const toPointType = computed(() => {
    const { x, y } = posTypeToBlock.value;
    switch (`${x}-${y}`) {
      case 'left-top':
        if (dXFromLToR.value > 40) {
          return 'right';
        }
        if (dXFromLToB.value > 40) {
          return 'bottom';
        }
        return 'right';
      case 'right-top':
        if (dXFromRToL.value > 40) {
          return 'left';
        }
        if (dXFromRToB.value > 40) {
          return 'bottom';
        }
        return 'left';
      case 'right-middle':
        return 'left';
      case 'left-middle':
        return 'right';
      case 'left-bottom':
        if (dXFromLToR.value > 40) {
          return 'right';
        }
        if (dXFromLToT.value > 40) {
          return 'top';
        }
        return 'left';
      case 'right-bottom': {
        if (dXFromRToL.value > 40) {
          return 'left';
        }
        if (dXFromRToT.value > 40) {
          return 'top';
        }
        return 'right';
      }
      default:
        return 'bottom';
    }
  });

  const fromPoint = computed(() => {
    switch (fromPointType.value) {
      case 'right':
        return fromPoints.value.right;
      case 'left':
        return fromPoints.value.left;
      default:
        return fromPoints.value.right;
    }
  });

  const toPoint = computed(() => {
    switch (toPointType.value) {
      case 'top':
        return toPoints.value.top;
      case 'right':
        return toPoints.value.right;
      case 'bottom':
        return toPoints.value.bottom;
      case 'left':
        return toPoints.value.left;
      default:
        return toPoints.value.bottom;
    }
  });

  return {
    toPoint,
    fromPoint,
    fromPointType,
    toPointType
  };
};

export default useConnectionSwitchPoint;
