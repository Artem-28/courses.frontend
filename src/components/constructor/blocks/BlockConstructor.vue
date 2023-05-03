<script setup lang="ts">
import { defineProps, withDefaults, ref, computed, reactive } from 'vue';
import BaseBlockModel from 'src/models/block/BaseBlock';

/* Composition */
// import you composition api...
import useDrag from 'src/composition/useDrag';

/* Components */
// import you components...

/* Types */
// declare components component...
import { DragHook, DragHookAttr } from 'src/types/hook';
import { Position } from 'src/types/component-props';
import { ConfinesScene } from 'src/types/store/scene';

interface Props {
  block: BaseBlockModel;
  confines: ConfinesScene
  zoom?: number;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  zoom: 1
});

/* Emits */

/* Data */
// declare reactive variables...
const refBlock = ref<HTMLElement | null>(null);
const dragHook: DragHook = {
  dragStart: onDragStart,
  dragStop: onDragStop,
  move: onMove
};

/* Composition */
// declare you composition api...
const defaultPosition = { ...props.block.position };
const dragBlock = useDrag(refBlock, defaultPosition, dragHook);
const dragOffset = reactive<Position>(defaultPosition);

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...
const style = computed(() => {
  const { x, y } = dragOffset;
  const { width, height } = props.block.size;
  return {
    transform: `translate(${x}px, ${y}px)`,
    width: `${width}px`,
    height: `${height}px`
  };
});

/* Methods */
// promote your methods...
function onDragStart(data: DragHookAttr) {
  console.log('drag start');
}

function onDragStop({ position }: DragHookAttr) {
  props.block.update({ position });
}

function onMove(data: DragHookAttr) {
  // Определяем координаты блока с учетом zoom
  const { x, y } = data.position;
  const valueX = x / props.zoom;
  const valueY = y / props.zoom;

  // Получаем ограничения чтобы не передвигать блок за сцену
  const rangeX = props.confines.x;
  const rangeY = props.confines.y;

  const { height, width } = data.elemRect;
  // Устанавливаем значения с учетом ограничений сцены
  dragOffset.x = Math.max(rangeX.min, Math.min(rangeX.max - width, valueX));
  dragOffset.y = Math.max(rangeY.min, Math.min(rangeY.max - height, valueY));
}
</script>

<template>
  <div
    ref="refBlock"
    class="block-constructor"
    :style="style"
  >
    <header
      class="block-constructor__header"
      @mousedown="dragBlock.dragStart"
    >
      header {{ block.active }}
    </header>
    <div class="block-constructor__content">content</div>
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...
$border-radius: 8px;

/* Selector */
// style component...
.block-constructor {
  position: absolute;
  display: flex;
  flex-direction: column;
  &__header {
    height: 30px;
    background-color: $primary;
    color: white;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
  }
  &__content {
    flex-grow: 1;
    background-color: white;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    border: 1px solid $primary;
    border-top: none;
  }
}
</style>
