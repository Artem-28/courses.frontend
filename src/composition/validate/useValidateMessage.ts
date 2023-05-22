import { computed } from 'vue';
import { IValidateMessage } from 'src/types/type-component-props';
import { FCompositionValidateMessage } from 'src/types/type-composition';

const useValidateMessage: FCompositionValidateMessage = (validate, property) => {
  const errorMessage = computed(() => {
    return property.reduce((acc, property) => {
      const data = validate.value[property];
      if (!data) return acc;

      const [error] = data.$errors;
      if (!error) return acc;

      acc[property] = error.$message;
      return acc;
    }, {} as IValidateMessage);
  });

  return { errorMessage };
};

export default useValidateMessage;
