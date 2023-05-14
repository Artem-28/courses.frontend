import { FCompositionUseConnectionLineRender } from 'src/types/type-composition';
import { computed } from 'vue';

const useConnectionLineRender: FCompositionUseConnectionLineRender = (fromPoint, toPoint, fromPointType, toPointType) => {
  const lineData = computed(() => {
    const { x: fromX, y: fromY } = fromPoint.value;
    const { x: toX, y: toY } = toPoint.value;
    const centerX = (fromX + toX) / 2;
    const centerY = (fromY + toY) / 2;

    switch (`${fromPointType.value}-${toPointType.value}`) {
      case 'right-left':
        return `M ${fromX} ${fromY} C ${centerX + 40} ${fromY} ${centerX - 40} ${toY} ${toX} ${toY}`;
      case 'right-top':
        return `M ${fromX} ${fromY} C ${centerX + 40} ${fromY} ${toX} ${centerY - 40} ${toX} ${toY}`;
      case 'right-bottom':
        return `M ${fromX} ${fromY} C ${centerX + 40} ${fromY} ${toX} ${centerY + 40} ${toX} ${toY}`;
      case 'right-right':
        return `M ${fromX} ${fromY} C ${Math.max(fromX, toX) + 40} ${fromY} ${Math.max(fromX, toX) + 40 * 2} ${toY} ${toX} ${toY}`;
      case 'left-right':
        return `M ${fromX} ${fromY} C ${centerX - 40} ${fromY} ${centerX + 40} ${toY} ${toX} ${toY}`;
      case 'left-top':
        return `M ${fromX} ${fromY} C ${centerX - 40} ${fromY} ${toX} ${centerY - 40} ${toX} ${toY}`;
      case 'left-bottom':
        return `M ${fromX} ${fromY} C ${centerX - 40} ${fromY} ${toX} ${centerY + 40} ${toX} ${toY}`;
      case 'left-left':
        return `M ${fromX} ${fromY} C ${Math.min(fromX, toX) - 40} ${fromY} ${Math.min(fromX, toX) - 40 * 2} ${toY} ${toX} ${toY}`;
      default:
        return `M ${fromX} ${fromY} L ${toX} ${toY}`;
    }
  });
  return { lineData };
};

export default useConnectionLineRender;
