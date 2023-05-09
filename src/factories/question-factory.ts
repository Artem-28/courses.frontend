import BaseQuestionModel from 'src/models/question/BaseQuestion';
import { IQuestionCreateMethods, IQuestionData } from 'src/types/type-models';

const questionFactory = {
  create: (type: string, data: IQuestionData) => {
    switch (type) {
      default:
        return createModel.baseQuestion(data);
    }
  }
};

const createModel: IQuestionCreateMethods = {
  baseQuestion: (data) => new BaseQuestionModel(data)
};

export default questionFactory;
