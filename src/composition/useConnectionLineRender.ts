import { FCompositionUseConnectionLineRender } from 'src/types/type-composition';
import { computed } from 'vue';

const useConnectionLineRender: FCompositionUseConnectionLineRender = (fromPoint, toPoint, fromPointType, toPointType) => {
  const lineData = computed(() => {
    const from = fromPoint.value;
    const to = toPoint.value;
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  });
  return { lineData };
};

export default useConnectionLineRender;
