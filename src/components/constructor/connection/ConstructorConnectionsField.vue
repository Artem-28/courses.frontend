<script setup lang="ts">
import { defineEmits, defineProps, withDefaults, onMounted, reactive, ref, watch, ComputedRef } from 'vue';
import { useConnectionLineStore } from 'stores/connection-line-store';
import ConnectionLine from 'components/constructor/connection/ConnectionLine.vue';
import { ICacheDOMElements, IPosition } from 'src/types/type-component-props';

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Props {
  activeElementId: string | null;
  zoom: number;
}
interface Emit {
  (e: 'update:modelValue', value: string): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  activeElementId: null
});

/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...
const cacheElements: ICacheDOMElements = {};
const refScene = ref<HTMLElement | null>(null);
const offsetScene = reactive<IPosition>({ x: 0, y: 0 });

/* Composition */
// declare you composition api...
const connectionLineStore = useConnectionLineStore();

/* Life hooks */
// life cycle hooks...
watch(() => props.activeElementId, (value) => {
  if (!value) return;
  updateOffsetScene();
});
onMounted(() => {
  console.log('mounted arrow field');
  updateOffsetScene();
});

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
function getCacheElement(elemId: string) {
  return cacheElements[elemId];
}
function setCacheElement(elemId: string, elem: HTMLElement) {
  cacheElements[elemId] = elem;
}
function updateOffsetScene() {
  if (!refScene.value) return;
  const { left, top } = refScene.value.getBoundingClientRect();
  offsetScene.x = left;
  offsetScene.y = top;
}
</script>

<template>
  <div ref="refScene" class="constructor-connections-field">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <ConnectionLine
        v-for="lineData in connectionLineStore.lineDOMElementIds"
        :key="`${lineData.from}-${lineData.to}`"
        :from-element-id="lineData.from"
        :from-container-id="lineData.fromContainer"
        :to-element-id="lineData.to"
        :active-element-id="activeElementId"
        :zoom="zoom"
        :offset="offsetScene"
        :get-cache-element="getCacheElement"
        :set-cache-element="setCacheElement"
      />
<!--      <path d="M 10 210 L 110 10" stroke-width="3" stroke="red"  />-->
    </svg>
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.constructor-connections-field {
  position: absolute;
  border: 1px solid red;
  width: 100%;
  height: 100%;
  svg {
    position: relative;
  }
}
</style>
