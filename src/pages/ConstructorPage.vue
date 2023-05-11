<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted } from 'vue';
/* Composition */
// import you composition api...
import { useQuestionStore } from 'stores/models/question-store';

/* Components */
// import you components...
import ConstructorScene from 'components/constructor/scene/ConstructorScene.vue';
import ConstructorBlock from 'components/constructor/blocks/ConstructorBlock.vue';
import ConstructorConnectionsField from 'components/constructor/connection/ConstructorConnectionsField.vue';
import HeaderBaseBlock from 'components/constructor/blocks/header-block/HeaderBaseBlock.vue';
const contentFreeText = defineAsyncComponent(() => import('components/constructor/blocks/content-block/ContentFreeTextBlock.vue'));

/* Types */
// declare components component...
import BaseQuestionModel from 'src/models/question/BaseQuestion';
import { IQuestionData } from 'src/types/type-models';

/* Props */
// property default value...

/* Emits */

/* Data */
// declare reactive variables...

const blockData: IQuestionData[] = [
  {
    id: 1,
    position: { x: 100, y: 100 },
    type: 'freetext',
    answers: [
      {
        id: 1,
        questionId: 1,
        nextQuestionId: 2,
        content: 'Переход к блоку 2'
      }
    ]
  },
  {
    id: 2,
    position: { x: 350, y: 100 },
    type: 'freetext',
    answers: [
      // {
      //   id: 2,
      //   questionId: 2,
      //   nextQuestionId: 3,
      //   content: 'Переход к блоку 3'
      // },
      // {
      //   id: 3,
      //   questionId: 2,
      //   nextQuestionId: 4,
      //   content: 'Переход к блоку 4'
      // }
    ]
  },
  {
    id: 3,
    position: { x: 600, y: 100 },
    type: 'freetext',
    answers: [
      // {
      //   id: 4,
      //   questionId: 3,
      //   nextQuestionId: 2,
      //   content: 'Переход к блоку 2'
      // }
    ]
  },
  {
    id: 4,
    position: { x: 850, y: 100 },
    type: 'freetext',
    answers: []
  }
];
/* Composition */
// declare you composition api...
const questionStore = useQuestionStore();

/* Life hooks */
// life cycle hooks...
onMounted(() => {
  questionStore.questionCreate(blockData);
});

/* Computed */
// you computational properties...
const activeElementId = computed(() => {
  const activeQuestion = questionStore.activeQuestion;
  if (!activeQuestion) return null;
  return activeQuestion.elementId;
});

/* Methods */
// promote your methods...
function getContentType(question: BaseQuestionModel) {
  switch (question.type) {
    case 'freetext':
      return contentFreeText;
    default:
      return null;
  }
}
</script>

<template>
  <div class="question" style="{ position: absolute; left: 0; top: 0}">
    <div class="answer"></div>
  </div>
  <ConstructorScene>
    <template v-slot:default="{ zoom, confines }">
      <ConstructorBlock
        v-for="question in questionStore.questions"
        :key="question.id"
        :block="question"
        :confines="confines"
        :zoom="zoom"
      >
        <template v-slot:header>
          <HeaderBaseBlock :question="question" />
        </template>

        <component :is="getContentType(question)" :question="question" />

      </ConstructorBlock>
    </template>

    <template v-slot:substrate="{ zoom }">
      <ConstructorConnectionsField
        :active-element-id="activeElementId"
        :zoom="zoom"
      />
    </template>
  </ConstructorScene>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
</style>
