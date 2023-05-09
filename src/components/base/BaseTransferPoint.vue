<script setup lang="ts">
import { computed, defineEmits, defineProps, withDefaults } from 'vue';

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Props {
  size?: number;
}
interface Emit {
  (e: 'update:modelValue', value: string): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  size: 16
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
const stylePoint = computed(() => {
  return {
    width: `${props.size}px`,
    height: `${props.size}px`,
    borderRadius: `${props.size}px`
  };
});

/* Methods */
// promote your methods...
</script>

<template>
  <span :style="stylePoint" class="base-transfer-point" />
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.base-transfer-point {
  display: block;
  background: black;
}
</style>
