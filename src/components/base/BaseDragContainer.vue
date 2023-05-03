<script setup lang="ts">
import { computed, defineEmits, defineProps, withDefaults, ref } from 'vue';

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
import { Position } from 'src/types/component-props';
import useDrag from 'src/composition/useDrag';
import { DragHook } from 'src/types/hook';

interface Props {
  position?: Position;
}
interface Emit {
  (e: 'update:modelValue', value: string): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  position: () => ({ x: 0, y: 0 })
});

/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...
const container = ref<HTMLDivElement | null >(null);
const dragHook: DragHook = {
  move: moveHandle
};

/* Composition */
// declare you composition api...
console.log(props.position);
const { dragStart, position } = useDrag(container, props.position);

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...
const style = computed(() => {
  const { x, y } = position;
  return {
    transform: `translate(${x}px, ${y}px)`
  };
});

/* Methods */
// promote your methods...
function moveHandle(position: Position) {
  console.log(position);
}
</script>

<template>
  <div
    ref="container"
    :style="style"
    class="base-drag-container"
    @mousedown="dragStart"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.base-drag-container {
  box-sizing: border-box;
  position: absolute;
  outline: 1px solid black;
  width: fit-content;
  height: fit-content;
}
</style>
