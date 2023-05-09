import { defineStore } from 'pinia';
import BaseQuestionModel from 'src/models/question/BaseQuestion';
import questionFactory from 'src/factories/question-factory';
import { IQuestionState } from 'src/types/store';
import { IQuestionData } from 'src/types/type-models';

const factory = questionFactory;

export const useQuestionStore = defineStore('question', {
  state: (): IQuestionState => ({
    _items: {},
    _active: null
  }),
  getters: {
    questions: (state): BaseQuestionModel[] => {
      return Object.values(state._items);
    },
    questionById: (state) => (id: number) => {
      return state._items[id];
    },
    activeQuestion: (state): BaseQuestionModel | null => {
      if (!state._active) return null;
      return state._items[state._active];
    }
  },
  actions: {
    questionCreate(resource: IQuestionData[] | IQuestionData) {
      if (!Array.isArray(resource)) {
        resource = [resource];
      }
      this._items = resource.reduce((acc, data) => {
        const block = factory.create(data.type, data);
        return { ...acc, [block.id]: block };
      }, {});
    },

    updateActiveQuestion(id: number | null) {
      this._active = id;
    }
  }
});
