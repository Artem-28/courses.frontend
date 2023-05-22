import { IAppMessageConfig, IAppMessageStore, ModelBaseAppMessage } from 'src/types/type-models/type-app-message';
import { useAppMessageStore } from 'stores/app-message-store';

export default class BaseAppMessage implements ModelBaseAppMessage {
  private _message: string | null;
  private _errorStatue: number | null;
  private _messageKey: string | null;
  private _config: IAppMessageConfig;
  private _store: IAppMessageStore;

  constructor () {
    this._message = null;
    this._errorStatue = null;
    this._messageKey = null;
    this._config = { type: 'info', position: 'top' };
    const { insert, updateShowMessage } = useAppMessageStore();
    this._store = {
      insertMessage: insert,
      showMessage: updateShowMessage
    };
  }

  public error(message: string, key?: string | null, status?: number | null, config?: Partial<IAppMessageConfig>) {
    this._errorStatue = status || null;
    this._messageKey = key || null;
    this._createMessage(message, { ...config, type: 'negative' });
    return {
      key: this._messageKey,
      status: this._errorStatue,
      set: this._set.bind(this),
      show: this._show.bind(this)
    };
  }

  public info(message: string, config?: Partial<IAppMessageConfig>) {
    this._createMessage(message, { ...config, type: 'info' });
    return {
      set: this._set.bind(this),
      show: this._show.bind(this)
    };
  }

  private _createMessage(message: string, config: Partial<IAppMessageConfig>) {
    this._message = message;
    this._config = {
      ...this._config,
      ...config
    };
  }

  private _show() {
    const value = this._message as string;
    this._store.showMessage({ value, config: this._config });
  }

  private _set(key: string) {
    const value = this._message as string;
    this._store.insertMessage(key, { value, config: this._config });
    return {
      show: this._show.bind(this)
    };
  }
}
