import { computed } from 'vue';
import { ICustomProps } from 'src/types/type-component-props';
import { FCallback } from 'src/types/type-hook';

function useModel(props: ICustomProps, emit: any | null, name = 'modelValue', callback?: FCallback) {
  return computed({
    get () {
      return props[name];
    },
    set (value: any) {
      const newValue = callback ? callback(value) : value;
      console.log(emit);
      if (!emit) return;
      emit(`update:${name}`, newValue);
      console.log('update');
    }
  });
}
export default useModel;
