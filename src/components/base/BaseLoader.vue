<script setup lang="ts">
import { defineEmits, defineProps, withDefaults, onUnmounted } from 'vue';

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Props {
  value?: string;
}
interface Emit {
  (e: 'update:modelValue', value: string): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  value: ''
});

/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...

/* Composition */
// declare you composition api...

/* Life hooks */
// life cycle hooks...
onUnmounted(() => {
  console.log('un mount');
});

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
</script>

<template>
  <div class="base-loader">
    <div class="base-loader__bg"/>
    <span class="base-loader__spiner" />
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...
$loader-color: rgba(42, 35, 194, 1);
$loader-color-20: rgba(42, 35, 194, 0.2);
$loader-color-50: rgba(42, 35, 194, 0.5);
$loader-color-70: rgba(42, 35, 194, 0.7);
$background-color: rgba(225, 225, 225, 0.4);

/* Selector */
// style component...
.base-loader {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  &__bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: $background-color;
  }
  &__spiner {
    display: block;
    font-size: 10px;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    position: relative;
    text-indent: -9999em;
    animation: mulShdSpin 0.9s infinite ease;
    transform: scale(0.8);
  }
  @keyframes mulShdSpin {
    0%,
    100% {
      box-shadow: 0em -2.6em 0em 0em $loader-color, 1.8em -1.8em 0 0em $loader-color-20, 2.5em 0em 0 0em $loader-color-20, 1.75em 1.75em 0 0em $loader-color-20, 0em 2.5em 0 0em $loader-color-20, -1.8em 1.8em 0 0em $loader-color-20, -2.6em 0em 0 0em $loader-color-50, -1.8em -1.8em 0 0em $loader-color-70;
    }
    12.5% {
      box-shadow: 0em -2.6em 0em 0em $loader-color-70, 1.8em -1.8em 0 0em $loader-color, 2.5em 0em 0 0em $loader-color-20, 1.75em 1.75em 0 0em $loader-color-20, 0em 2.5em 0 0em $loader-color-20, -1.8em 1.8em 0 0em $loader-color-20, -2.6em 0em 0 0em $loader-color-20, -1.8em -1.8em 0 0em $loader-color-50;
    }
    25% {
      box-shadow: 0em -2.6em 0em 0em $loader-color-50, 1.8em -1.8em 0 0em $loader-color-70, 2.5em 0em 0 0em $loader-color, 1.75em 1.75em 0 0em $loader-color-20, 0em 2.5em 0 0em $loader-color-20, -1.8em 1.8em 0 0em $loader-color-20, -2.6em 0em 0 0em $loader-color-20, -1.8em -1.8em 0 0em $loader-color-20;
    }
    37.5% {
      box-shadow: 0em -2.6em 0em 0em $loader-color-20, 1.8em -1.8em 0 0em $loader-color-50, 2.5em 0em 0 0em $loader-color-70, 1.75em 1.75em 0 0em $loader-color, 0em 2.5em 0 0em $loader-color-20, -1.8em 1.8em 0 0em $loader-color-20, -2.6em 0em 0 0em $loader-color-20, -1.8em -1.8em 0 0em $loader-color-20;
    }
    50% {
      box-shadow: 0em -2.6em 0em 0em $loader-color-20, 1.8em -1.8em 0 0em $loader-color-20, 2.5em 0em 0 0em $loader-color-50, 1.75em 1.75em 0 0em $loader-color-70, 0em 2.5em 0 0em $loader-color, -1.8em 1.8em 0 0em $loader-color-20, -2.6em 0em 0 0em $loader-color-20, -1.8em -1.8em 0 0em $loader-color-20;
    }
    62.5% {
      box-shadow: 0em -2.6em 0em 0em $loader-color-20, 1.8em -1.8em 0 0em $loader-color-20, 2.5em 0em 0 0em $loader-color-20, 1.75em 1.75em 0 0em $loader-color-50, 0em 2.5em 0 0em $loader-color-70, -1.8em 1.8em 0 0em $loader-color, -2.6em 0em 0 0em $loader-color-20, -1.8em -1.8em 0 0em $loader-color-20;
    }
    75% {
      box-shadow: 0em -2.6em 0em 0em $loader-color-20, 1.8em -1.8em 0 0em $loader-color-20, 2.5em 0em 0 0em $loader-color-20, 1.75em 1.75em 0 0em $loader-color-20, 0em 2.5em 0 0em $loader-color-50, -1.8em 1.8em 0 0em $loader-color-70, -2.6em 0em 0 0em $loader-color, -1.8em -1.8em 0 0em $loader-color-20;
    }
    87.5% {
      box-shadow: 0em -2.6em 0em 0em $loader-color-20, 1.8em -1.8em 0 0em $loader-color-20, 2.5em 0em 0 0em $loader-color-20, 1.75em 1.75em 0 0em $loader-color-20, 0em 2.5em 0 0em $loader-color-20, -1.8em 1.8em 0 0em $loader-color-50, -2.6em 0em 0 0em $loader-color-70, -1.8em -1.8em 0 0em $loader-color;
    }
  }
}
</style>
