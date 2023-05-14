import BaseDragBlockModel from 'src/models/block/BaseDragBlock';
import { IAnswerData, IQuestionData, IQuestionRelations } from 'src/types/type-models';
import { useAnswerStore } from 'stores/models/answerStore';

const relations: IQuestionRelations = {
  answer: {
    insert: null,
    byKey: null
  }
};

export default class BaseQuestionModel extends BaseDragBlockModel {
  _type: string;

  constructor (data: IQuestionData) {
    super(data);
    this._initializeStore();
    this._type = data.type;
    if (data.answers) {
      this.setAnswers(data.answers);
    }
  }

  _initializeStore() {
    const { answersByKey, answerInsert } = useAnswerStore();
    relations.answer.byKey = answersByKey;
    relations.answer.insert = answerInsert;
  }

  get type() {
    return this._type;
  }

  get elementId() {
    return `question-${this._id}`;
  }

  get answers() {
    if (!relations.answer.byKey) return [];
    return relations.answer.byKey('_questionId', this._id);
  }

  setAnswers(payload: IAnswerData[] | IAnswerData) {
    if (!relations.answer.insert) return;
    relations.answer.insert(payload);
  }
}
