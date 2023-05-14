<script setup lang="ts">
import { computed, defineEmits, defineProps, withDefaults } from 'vue';
import useModel from 'src/composition/useModel';

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Props {
  zoom: number;
}
interface Emit {
  (e: 'update:zoom', value: string): void;
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
const displayValueZoom = computed(() => {
  return `${(props.zoom * 100).toFixed(0)}%`;
});

/* Methods */
// promote your methods...
</script>

<template>
  <div class="control-scene">
    <div class="control-scene__zoom">
      <q-btn
        icon="zoom_out"
        color="primary"
        flat
        class="control-scene__zoom__control"
        @click="emit('update:zoom', 1)"
      />
      <span class="control-scene__zoom__value" v-text="displayValueZoom" />
      <q-btn
        icon="zoom_in"
        color="primary"
        flat
        class="control-scene__zoom__control"
        @click="emit('update:zoom', -1)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.control-scene {
  &__zoom {
    display: flex;
    border: 1px solid $primary;
    border-radius: 8px;
    &__value {
      color: $primary-30;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 600;
      width: 70px;
    }
    &__control {
      background: white;
      min-height: 0;
      height: 28px;
      width: 28px;
      font-size: 14px;
      padding: 0;
    }
    &__control:first-child {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }
    &__control:last-child {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }
}
</style>
