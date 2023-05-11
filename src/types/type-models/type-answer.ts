import BaseAnswerModel from 'src/models/answer/BaseAnswer';
import { FQuestionById, FUpdateCreateLineData } from 'src/types/store'

export interface IAnswerData {
  id: number;
  questionId: number;
  content: string | null;
  nextQuestionId: number | null;
}

export interface IAnswerCreateMethods {
  baseAnswer: (data: IAnswerData) => BaseAnswerModel
}

export interface IAnswerRelations {
  question: {
    byId: FQuestionById | null;
  },
  connectionLine: {
    updateOrCreate: FUpdateCreateLineData | null;
  }
}
