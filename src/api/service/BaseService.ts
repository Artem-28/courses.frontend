import { FApiMethod, IApiToken, IAxiosError, IErrorBase, TError } from 'src/types/type-api';
import { api, axios } from 'src/api/axios';
import { AxiosError } from 'axios';
import { Notify } from 'quasar';
import { useErrorStore } from 'stores/error-store';

export default class BaseService {
  private _errorData: IErrorBase | IAxiosError | null;
  private _notify = Notify;
  private _tokenKey = 'access_token';
  private _token: IApiToken = { value: null, type: null };

  constructor () {
    this._errorData = null;
    this._initToken();
  }

  get token() {
    const { value, type } = this._token;
    if (!value || type) return null;
    return `${type} ${value}`;
  }

  get headers() {
    const headers: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    const token = this.token;
    if (token) {
      headers.Authorization = token;
    }

    return headers;
  }

  get isAxiosError() {
    return this._errorData && this._errorData.type === 'axios-error';
  }

  get errorMessage() {
    if (!this._errorData) return '';

    if (this._errorData.type === 'axios-error') {
      return this._errorData.error.response?.data.message;
    }
    return this._errorData.error;
  }

  showErrorMessage(type?: TError) {
    if (!this._errorData) return;
    if (!type) {
      this._showErrorMessage();
    }
    if (this._errorData.type === type) {
      this._showErrorMessage();
    }
    if (this._errorData.type === type) {
      this._showErrorMessage();
    }
  }

  clearError() {
    this._errorData = null;
  }

  private _initToken() {
    const data = localStorage.getItem(this._tokenKey);
    if (!data) return;
    const token = JSON.parse(data);
    if (!token.value || !token.type) return;
    this._token = token;
  }

  protected _updateToken(token: IApiToken) {
    const data = JSON.stringify(token);
    localStorage.setItem(this._tokenKey, data);
    this._token = token;
  }

  protected _clearToken() {
    this._token.type = null;
    this._token.value = null;
    localStorage.removeItem(this._tokenKey);
  }

  private _showErrorMessage() {
    this._notify.create({ message: this.errorMessage, type: 'negative', position: 'top' });
  }

  protected _errorHandler(e: unknown | string) {
    const error = e as Error | AxiosError;
    if (axios.isAxiosError(error)) {
      this._errorData = { error, type: 'axios-error' };
      return;
    }
    if (typeof e === 'string') {
      this._errorData = { error: e, type: 'stock-error' };
      return;
    }
    this._errorData = { error: error.message, type: 'stock-error' };
  }

  protected _saveErrorState(key: string) {
    if (!this._errorData) return;
    const { insert } = useErrorStore();
    insert(key, this._errorData);
  }

  protected _post:FApiMethod = (url, data, config) => {
    return api.post(url, data, { ...config, headers: this.headers });
  };
}
