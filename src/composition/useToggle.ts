import { ref } from 'vue';
import { FCompositionUseToggle } from 'src/types/type-composition';

const useToggle: FCompositionUseToggle = (value = false, lock = false) => {
  const isToggle = ref<boolean>(value);
  function toggle() {
    if (!lock) {
      isToggle.value = !isToggle.value;
    }
  }
  return { isToggle, toggle };
};

export default useToggle;
