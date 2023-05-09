<script setup lang="ts">
import { defineEmits, defineProps, withDefaults, onMounted, ref } from 'vue';

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Props {
  fromElementId: string,
  toElementId: string,
  getCacheElement?: (elementId: string) => HTMLElement | null,
  setCacheElement?: (element: HTMLElement) => void;
}
interface Emit {
  (e: 'update:modelValue', value: string): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
});

/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...
const isComplete = ref<boolean>(false);

/* Composition */
// declare you composition api...

/* Life hooks */
// life cycle hooks...
onMounted(() => {
  const fromElement = getElement(props.fromElementId);
  console.log(fromElement);
});

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
function getElement(elementId: string, cache = false) {
  let element: HTMLElement | null = null;
  if (cache && typeof props.getCacheElement === 'function') {
    element = props.getCacheElement(elementId);
  }
  if (element) return element;

  element = document.getElementById(elementId);
  if (cache && element && typeof props.setCacheElement === 'function') {
    props.setCacheElement(element);
  }
  return element;
}
</script>

<template>
  <path d="M 10 210 L 110 10" stroke-width="3" stroke="red"  />
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
</style>
