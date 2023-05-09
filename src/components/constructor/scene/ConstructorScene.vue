<script setup lang="ts">
import { computed, onMounted, nextTick, ref } from 'vue';

/* Composition */
// import you composition api...
import { useSceneStore } from 'stores/scene-store';
import useModel from 'src/composition/useModel';

/* Components */
// import you components...
import ControlScene from 'components/constructor/scene/ControlScene.vue';

/* Types */
// declare components component...

/* Props */
// property default value...

/* Emits */

/* Data */
// declare reactive variables...
const loading = ref<boolean>(true);

/* Composition */
// declare you composition api...
const sceneStore = useSceneStore();
const zoom = useModel(sceneStore, null, 'zoom', sceneStore.updateZoom);

/* Life hooks */
// life cycle hooks...
onMounted(async () => {
  await nextTick();
  loading.value = false;
  console.log('mounted scene');
});

/* Computed */
// you computational properties...
const sizeScene = computed(() => {
  const { width, height } = sceneStore.size;
  return {
    width: `${width}px`,
    height: `${height}px`
  };
});
const styleScene = computed(() => {
  return {
    ...sizeScene.value,
    transform: `scale(${zoom.value})`
  };
});

/* Methods */
// promote your methods...
function onWheelScene(e: WheelEvent) {
  e.preventDefault();
  sceneStore.updateZoom(e.deltaY);
}
</script>

<template>
  <div @wheel.ctrl="onWheelScene" class="constructor-scene">
    <div :style="sizeScene" class="constructor-scene__cells" />
    <div v-if="!loading" :style="styleScene" class="constructor-scene__substrate">
      <slot name="substrate" />
    </div>
    <div :style="styleScene" class="constructor-scene__inner">
      <slot :zoom="zoom" :confines="sceneStore.confines" />
    </div>
    <ControlScene v-model:zoom="zoom" class="constructor-scene__control" />
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...
$cell-color: $text-body-secondary;
$cell-template: linear-gradient($cell-color, transparent 1px),
                linear-gradient(90deg, $cell-color, transparent 1px),
                0 0;

/* Selector */
// style component...
.constructor-scene {
  position: relative;
  overflow: auto;
  height: 100%;
  width: 100%;
  &__cells {
    position: absolute;
    left: 0;
    top: 0;
    &:before, &:after {
      content: '';
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: $cell-template;
      background-size: 80px 80px;
    }
    &:after {
      background-size: 20px 20px;
    }
  }
  &__control {
    position: fixed;
    top: 100px;
    right: 50px;
    z-index: 100;
  }
  &__inner, &__substrate {
    z-index: 2;
    left: 0;
    top: 0;
    position: relative;
    transform-origin: top left;
    overflow: hidden;
  }
  &__substrate {
    position: absolute;
  }
}

</style>
