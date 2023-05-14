import { IAnswerData, IAnswerRelations } from 'src/types/type-models';
import { useQuestionStore } from 'stores/models/question-store';
import { useConnectionLineStore } from 'stores/connection-line-store';

const store: IAnswerRelations = {
  question: {
    byId: null
  },
  connectionLine: {
    updateOrCreate: null
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
    const { updateOrCreateLineData } = useConnectionLineStore();
    store.question.byId = questionById;
    store.connectionLine.updateOrCreate = updateOrCreateLineData;
  }

  get id() {
    return this._id;
  }

  get questionId() {
    return this._questionId;
  }

  get question() {
    if (!store.question.byId) return null;
    return store.question.byId(this._questionId);
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

  setConnectionLine() {
    const nextQuestion = this.nextQuestion;
    const question = this.question;
    if (!nextQuestion || !question || !store.connectionLine.updateOrCreate) return null;
    const fromData = {
      elementId: this.elementId,
      containerId: question.elementId
    };
    store.connectionLine.updateOrCreate(nextQuestion.elementId, [fromData]);
  }

  update(updateData: Partial<IAnswerData>) {
    console.log('update answer');
  }
}
