<script setup lang="ts">
import { defineEmits, defineProps, withDefaults, onMounted, ref, computed, watch } from 'vue';
import {
  FGetCacheElement,
  FSetCacheElement,
  IPosition
} from 'src/types/type-component-props';
import useObserver from 'src/composition/useObserver';
import useConnectionLinePoint from 'src/composition/useConnectionLinePoint';
import useConnectionSwitchPoint from 'src/composition/useConnectionSwitchPoint';
import useDOMElement from 'src/composition/useDOMElement';
import useConnectionLineRender from 'src/composition/useConnectionLineRender';

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Props {
  fromElementId: string;
  fromContainerId: string;
  toElementId: string;
  activeElementId: string | null;
  zoom: number;
  offset: IPosition,
  getCacheElement?: FGetCacheElement;
  setCacheElement?: FSetCacheElement;
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
const fromElement = ref<HTMLElement | null>(null);
const toElement = ref<HTMLElement | null>(null);
const fromElementContainer = ref<HTMLElement | null>(null);

/* Composition */
// declare you composition api...
const fromObserver = useObserver('mutation', fromElementContainer, fromObserve);
const toObserver = useObserver('mutation', toElement, toObserve);
const { getElement } = useDOMElement(props.setCacheElement, props.getCacheElement);
const { updatePosition, updateSize, fromPoints, toPoints } = useConnectionLinePoint(fromElement, toElement);
const { fromPoint, toPoint, fromPointType, toPointType } = useConnectionSwitchPoint(fromPoints, toPoints);
const { lineData } = useConnectionLineRender(fromPoint, toPoint, fromPointType, toPointType);

/* Life hooks */
// life cycle hooks...

onMounted(() => {
  setElements();
  if (!isComplete.value) return;
  updateSize('from', props.zoom);
  updateSize('to', props.zoom);
  updatePosition('from', props.offset, props.zoom);
  updatePosition('to', props.offset, props.zoom);
});

/* Computed */
// you computational properties...
const isComplete = computed(() => {
  return fromElement.value && toElement.value && fromElementContainer.value;
});

const activeFromElement = computed(() => {
  return props.activeElementId === props.fromContainerId;
});

const activeToElement = computed(() => {
  return props.activeElementId === props.toElementId;
});

watch(activeFromElement, (value) => {
  if (value) {
    fromObserver.enable();
    return;
  }
  fromObserver.disconnect();
});

watch(activeToElement, (value) => {
  if (value) {
    toObserver.enable();
    return;
  }
  toObserver.disconnect();
});

/* Methods */
// promote your methods...
function setElements() {
  fromElement.value = getElement(props.fromElementId);
  toElement.value = getElement(props.toElementId, true);
  fromElementContainer.value = getElement(props.fromContainerId, true);
}
function fromObserve() {
  updatePosition('from', props.offset, props.zoom);
}
function toObserve() {
  updatePosition('to', props.offset, props.zoom);
}

</script>

<template>
  <g>
    <!-- flexible pipes -->
    <path :d="lineData" stroke-width="1" stroke="red"  />
<!--    <path :d="pointData.fromRightData" stroke-width="3" stroke="red"  />-->
<!--    <path :d="pointData.toRightData" stroke-width="3" stroke="blue"  />-->
<!--    <path :d="pointData.toLeftData" stroke-width="3" stroke="blue"  />-->
<!--    <path :d="pointData.toTopData" stroke-width="3" stroke="blue"  />-->
<!--    <path :d="pointData.toBottomData" stroke-width="3" stroke="blue"  />-->
  </g>
<!--  <path d="M 10 210 L 110 10" stroke-width="3" stroke="red"  />-->
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
</style>
