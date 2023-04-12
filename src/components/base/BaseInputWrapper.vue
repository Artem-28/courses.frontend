<script setup lang="ts">
import { defineEmits, defineProps, withDefaults } from 'vue';

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Props {
  label?: string;
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

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
</script>

<template>
  <div class="base-input-wrapper">
    <span v-if="label" class="base-input-wrapper__label" v-text="label" />
    <slot />
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.base-input-wrapper {
  &__label {
    padding-left: 16px;
    padding-bottom: 8px;
    font-weight: 700;
    font-size: 16px;
  }
}
</style>
