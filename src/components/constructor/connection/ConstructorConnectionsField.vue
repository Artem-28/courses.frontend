<script setup lang="ts">
import { defineEmits, defineProps, withDefaults, onMounted } from 'vue';
import { useConnectionLineStore } from 'stores/connection-line-store';
import ConnectionLine from 'components/constructor/connection/ConnectionLine.vue';

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Props {
  activeElementId: string | null;
}
interface Emit {
  (e: 'update:modelValue', value: string): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  activeElementId: null
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
  console.log('mounted arrow field');
});

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
function dragStartBlock() {
  console.log('drag block');
}
</script>

<template>
  <div class="constructor-connections-field">
    {{ activeElementId }}
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <ConnectionLine
        v-for="lineData in connectionLineStore.lineDOMElementIds"
        :key="`${lineData.from}-${lineData.to}`"
        :from-element-id="lineData.from"
        :to-element-id="lineData.to"
      />
<!--      <path d="M 10 210 L 110 10" stroke-width="3" stroke="red"  />-->
    </svg>
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.constructor-connections-field {
  position: absolute;
  border: 1px solid red;
  width: 100%;
  height: 100%;
}
</style>
