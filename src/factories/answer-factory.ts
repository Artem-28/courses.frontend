import BaseAnswerModel from 'src/models/answer/BaseAnswer';
import { IAnswerData, IAnswerCreateMethods } from 'src/types/type-models';

const answerFactory = {
  create: (type: string, data: IAnswerData) => {
    switch (type) {
      default:
        return createModel.baseAnswer(data);
    }
  }
};

const createModel: IAnswerCreateMethods = {
  baseAnswer: (data) => new BaseAnswerModel(data)
};

export default answerFactory;
