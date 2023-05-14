import BaseAnswerModel from 'src/models/answer/BaseAnswer';
import { IAnswerData } from 'src/types/type-models';

export interface IAnswerState {
  _items: {
    [key: number ]: BaseAnswerModel;
  }
}

export type FAnswerByKey = (key: keyof BaseAnswerModel, value: any) => BaseAnswerModel[];
export type FAnswerInsert = (resource: IAnswerData[] | IAnswerData) => void;
