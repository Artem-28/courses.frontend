<script setup lang="ts">
import { defineEmits, defineProps, withDefaults } from 'vue';

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
import BaseQuestionModel from 'src/models/question/BaseQuestion';

interface Props {
  question: BaseQuestionModel;
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
  <div class="header-base-block">Блок: {{ question.id }}</div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...
$border-radius: 8px;

/* Selector */
// style component...
.header-base-block {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  background-color: $primary;
  color: white;
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;
}
</style>
