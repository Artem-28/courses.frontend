<script setup lang="ts">
import { defineEmits, defineProps, withDefaults, onMounted } from 'vue';
import BaseTransferPoint from 'components/base/BaseTransferPoint.vue';
import BaseAnswer from 'src/models/answer/BaseAnswer';
import { useConnectionLineStore } from 'stores/connection-line-store';

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
const connectionLineStore = useConnectionLineStore();

/* Life hooks */
// life cycle hooks...
onMounted(() => {
  setConnectionLine();
});

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
function setConnectionLine() {
  const nextQuestion = props.entity.nextQuestion;
  if (!nextQuestion) return;
  connectionLineStore.updateOrCreate(nextQuestion.elementId, [props.entity.elementId]);
}
</script>

<template>
  <div :id="`${entity.elementId}`" class="base-transfer-container">
    <BaseTransferPoint class="base-transfer-container__point--left" />
    <div class="base-transfer-container__content">
      <slot/>
    </div>
    <BaseTransferPoint class="base-transfer-container__point--right" />
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
  height: 4px;
  background: black;
}
.base-transfer-container::after {
  right: 0;
}
.base-transfer-container::before {
  left: 0;
}
</style>
