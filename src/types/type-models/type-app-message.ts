type FAppMessageSet = (key: string) => {
  show: () => void;
};
type FAppMessageError = (message: string) => {
  key: string | null;
  status: number | null;
  set: FAppMessageSet;
  show: () => void;
};

export interface ModelBaseAppMessage {
  error: FAppMessageError
}

export interface IAppMessageConfig {
  type: 'info' | 'warning' | 'negative' | 'positive',
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right' | 'center'
}

export interface IAppMessage {
  value: string,
  config: IAppMessageConfig
}

export interface IAppMessageStore {
  insertMessage: (key: string, message: IAppMessage) => void;
  showMessage: (message: IAppMessage) => void;
}
