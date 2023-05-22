<script setup lang="ts">
import { computed, defineEmits, defineProps, withDefaults, watch } from 'vue';

/* Composition */
// import you composition api...
import useStep from 'src/composition/useStep';

/* Components */
// import you components...

/* Types */
// declare components component...
import { IStep } from 'src/types/type-component-props';
interface Props {
  modelValue?: string
  steps?: Array<IStep | string>;
  nextVisibleButtonMode?: 'auto' | boolean;
  prevVisibleButtonMode?: 'auto' | boolean
}
interface Emit {
  (e: 'update:modelValue', value: string): void;
  (e: 'exit'): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  steps: () => ['default'],
  nextVisibleButtonMode: 'auto',
  prevVisibleButtonMode: 'auto'
});

/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...

/* Composition */
// declare you composition api...
const {
  step,
  stepInfo,
  nextStep,
  prevStep,
  setStep
} = useStep(props.steps, props.modelValue);

/* Life hooks */
// life cycle hooks...
watch(() => props.modelValue, (value) => {
  if (!value) return;
  setStepHandle(value);
});

/* Computed */
// you computational properties...
const visiblePrevButton = computed(() => {
  if (props.prevVisibleButtonMode === 'auto') {
    return !stepInfo.value.start;
  }
  return props.prevVisibleButtonMode;
});

const visibleNextButton = computed(() => {
  if (props.nextVisibleButtonMode === 'auto') {
    return !stepInfo.value.end;
  }
  return props.nextVisibleButtonMode;
});

/* Methods */
// promote your methods...
function setStepHandle(value: string) {
  setStep(value);
  emit('update:modelValue', stepInfo.value.stepValue);
}
function nextStepHandle() {
  nextStep();
  emit('update:modelValue', stepInfo.value.stepValue);
}
function prevStepHandle() {
  if (stepInfo.value.start) {
    emit('exit');
    return;
  }
  prevStep();
  emit('update:modelValue', stepInfo.value.stepValue);
}
</script>

<template>
  <div class="base-step-template">
    <q-btn
      v-if="visiblePrevButton"
      color="primary"
      outline
      icon="arrow_back_ios_new"
      class="base-step-template__control-btn control-btn-prev"
      @click="prevStepHandle"
    />
    <q-btn
      v-if="visibleNextButton"
      color="primary"
      outline
      icon="arrow_back_ios_new"
      class="base-step-template__control-btn control-btn-next"
      @click="nextStepHandle"
    />
    <slot name="header" :step="stepInfo" />
    <q-tab-panels
      v-model="step.value"
      animated
      swipeable
      transition-prev="jump-left"
      transition-next="jump-left"
      class="base-step-template__content"
    >
      <q-tab-panel
        v-for="(s, idx) in steps"
        :key="idx"
        :name="s?.value || s"
        class="base-step-template__content__tab"
      >
        <slot :name="s?.value || s" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.base-step-template {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 40px;
  min-width: 80px;
  position: relative;
  &__control-btn {
    z-index: 10;
    position: absolute;
    font-size: 12px;
    height: 40px;
    width: 40px;
    padding: 0;
  }
  &__content {
    padding: 0;
    background: none;
    &__tab {
      padding: 0;
    }
  }
  .control-btn-prev {
    left: 0;
  }
  .control-btn-next {
    right: 0;
    transform: rotate(180deg);
  }
}
</style>
