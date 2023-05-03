import { computed } from 'vue';
import { CustomProps } from 'src/types/component-props';
import { Callback } from 'src/types/hook';

function useModel(props: CustomProps, emit: any | null, name = 'modelValue', callback?: Callback) {
  return computed({
    get () {
      return props[name];
    },
    set (value: any) {
      const newValue = callback ? callback(value) : value;
      if (!emit) return;
      emit(`update:${name}`, newValue);
    }
  });
}
export default useModel;
