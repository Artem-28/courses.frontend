import { defineStore } from 'pinia';
import answerFactory from 'src/factories/answer-factory';
import { IAnswerState } from 'src/types/store';
import { IAnswerData } from 'src/types/type-models';
import BaseAnswerModel from 'src/models/answer/BaseAnswer';

const factory = answerFactory;

export const useAnswerStore = defineStore('answer', {
  state: () :IAnswerState => ({
    _items: {}
  }),
  getters: {
    answers: (state): BaseAnswerModel[] => {
      return Object.values(state._items);
    },
    answersByKey: (state) => (key: keyof BaseAnswerModel, value: any): BaseAnswerModel[] => {
      const items = Object.values(state._items);
      console.log(items);
      return items.filter(item => item[key] === value);
    }
  },
  actions: {
    answerCreate(resource: IAnswerData[] | IAnswerData) {
      if (!Array.isArray(resource)) {
        resource = [resource];
      }
      this._items = resource.reduce((acc, data) => {
        const answer = factory.create('base', data);
        return { ...acc, [answer.id]: answer };
      }, {});
    },
    answerInsert(resource: IAnswerData[] | IAnswerData) {
      if (!Array.isArray(resource)) {
        resource = [resource];
      }
      this._items = resource.reduce((acc, data) => {
        let answer = acc[data.id];

        if (answer) {
          answer.update(data);
          return acc;
        }

        answer = factory.create('base', data);
        return { ...acc, [answer.id]: answer };
      }, this._items);
    }
  }
});
