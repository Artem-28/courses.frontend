import { IAnswerData, IAnswerRelations } from 'src/types/type-models';
import { useQuestionStore } from 'stores/models/question-store';

const store: IAnswerRelations = {
  question: {
    byId: null
  }
};

export default class BaseAnswerModel {
  _id: number;
  _questionId: number;
  _nextQuestionId: number | null;
  _content: string | null;

  constructor (data: IAnswerData) {
    this._id = data.id;
    this._questionId = data.questionId;
    this._nextQuestionId = data.nextQuestionId;
    this._content = data.content;
    this._initializeStore();
  }

  _initializeStore() {
    const { questionById } = useQuestionStore();
    store.question.byId = questionById;
  }

  get id() {
    return this._id;
  }

  get questionId() {
    return this._questionId;
  }

  get nextQuestionId() {
    return this._nextQuestionId;
  }

  get nextQuestion() {
    if (!this._nextQuestionId || !store.question.byId) return null;
    return store.question.byId(this._nextQuestionId);
  }

  get content() {
    return this._content;
  }

  get elementId() {
    return `answer-${this._id}`;
  }

  update(updateData: Partial<IAnswerData>) {
    console.log('update answer');
  }
}
