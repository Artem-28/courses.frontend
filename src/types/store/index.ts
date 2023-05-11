import { useQuestionStore } from 'stores/models/question-store';
import { useAnswerStore } from 'stores/models/answerStore';

export interface IStoreModel {
  question?: ReturnType<typeof useQuestionStore> | null;
  answer?: ReturnType<typeof useAnswerStore> | null;
}

export type { IConnectionLineState, ILineElementIds, ILineElementData, FUpdateCreateLineData } from 'src/types/store/type-connection-line';
export type { ISceneState } from 'src/types/store/type-scene';
export type { IQuestionState, FQuestionById, FUpdateActiveBlock } from 'src/types/store/type-question';
export type { IAnswerState, FAnswerByKey, FAnswerInsert } from 'src/types/store/type-answer';
