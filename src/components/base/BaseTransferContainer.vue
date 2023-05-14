<script setup lang="ts">
import { defineEmits, defineProps, withDefaults, onMounted, nextTick, computed } from 'vue';
import BaseTransferPoint from 'components/base/BaseTransferPoint.vue';
import BaseAnswer from 'src/models/answer/BaseAnswer';

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Props {
  entity: BaseAnswer;
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

/* Composition */
// declare you composition api...

/* Life hooks */
// life cycle hooks...
onMounted(async () => {
  await nextTick();
  props.entity.setConnectionLine();
});

/* Computed */
// you computational properties...
const thereIsConnection = computed(() => {
  return !!props.entity.nextQuestionId;
});

/* Methods */
// promote your methods...
</script>

<template>
  <div :id="`${entity.elementId}`" :class="['base-transfer-container', { active: thereIsConnection }]">
    <BaseTransferPoint
      v-if="thereIsConnection"
      :active="thereIsConnection"
      class="base-transfer-container__point--left"
    />
    <div class="base-transfer-container__content">
      <slot/>
    </div>
    <BaseTransferPoint
      :active="thereIsConnection"
      class="base-transfer-container__point--right"
    />
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.base-transfer-container {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 40px;
  padding: 0 14px;
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 1px solid black;
    background: white;
  }
  &__point--left {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &__point--right {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
  }
}
.base-transfer-container::after,
.base-transfer-container::before {
  display: block;
  position: absolute;
  z-index: -1;
  top: 50%;
  transform: translateY(-50%);
  content: '';
  width: 50%;
  height: 3px;
  background: $text-body-secondary;
}
.base-transfer-container::after {
  right: 0;
}
.base-transfer-container::before {
  left: 0;
  display: none;
}
.base-transfer-container.active::after,
.base-transfer-container.active::before {
  background: $secondary;
  display: none;
}
.base-transfer-container.active {
  .base-transfer-container__point--left,
  .base-transfer-container__point--right {
    display: none;
  }
}
.base-transfer-container.active.active--right {
  .base-transfer-container__point--right {
    display: block;
  }
}

.base-transfer-container.active.active--left {
  .base-transfer-container__point--left {
    display: block;
  }
}

.base-transfer-container.active.active--right::after {
  display: block;
}
.base-transfer-container.active.active--left::before {
  display: block;
}
</style>
