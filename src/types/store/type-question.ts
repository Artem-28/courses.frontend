import BaseQuestionModel from 'src/models/question/BaseQuestion';

export interface IQuestionState {
  _items: {
    [key: number]: BaseQuestionModel
  }
  _active: number | null;
}

export type FQuestionById = (id: number) => BaseQuestionModel;
export type FUpdateActiveBlock = (id: number | null) => void;
