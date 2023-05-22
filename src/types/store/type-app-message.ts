import { IAppMessage } from 'src/types/type-models';

export interface IAppMessageState {
  _messages: {
    [key: string]: IAppMessage
  },
  showMessage: IAppMessage | null;
}
