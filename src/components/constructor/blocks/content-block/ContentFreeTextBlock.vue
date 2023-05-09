<script setup lang="ts">
import { computed, defineEmits, defineProps, withDefaults } from 'vue';
import BaseTransferContainer from 'components/base/BaseTransferContainer.vue';
import BaseQuestionModel from 'src/models/question/BaseQuestion';

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
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
const answers = computed(() => {
  return props.question.answers;
});

/* Methods */
// promote your methods...
</script>

<template>
  <div class="content-block">
    <BaseTransferContainer
      v-for="answer in answers"
      :key="answer.id"
      :entity="answer"
    >
      <span v-text="answer.content" />
    </BaseTransferContainer>
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.content-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
