import { IAnswerData, IDragBlockData } from './index';
import BaseQuestionModel from 'src/models/question/BaseQuestion';
import { FAnswerByKey, FAnswerInsert } from 'src/types/store';

export interface IQuestionData extends IDragBlockData {
  type: string;
  answers: IAnswerData[] | null;
}

export interface IQuestionCreateMethods {
  baseQuestion: (data: IQuestionData) => BaseQuestionModel;
}

export interface IQuestionRelations {
  answer: {
    insert: FAnswerInsert | null;
    byKey: FAnswerByKey | null;
  }
}
