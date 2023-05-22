import { FApiMethod, IApiToken } from 'src/types/type-api';
import { api, axios } from 'src/api/axios';
import { AxiosError } from 'axios';
import BaseAppMessage from 'src/models/app-messgae/BaseAppMessage';

export default class BaseService {
  private _tokenKey = 'access_token';
  private _token: IApiToken = { value: null, type: null };
  private _message = new BaseAppMessage();

  constructor () {
    // Инициализация токена
    this._initToken();
  }

  // Получение токена
  get token() {
    const { value, type } = this._token;
    if (!value || type) return null;
    return `${type} ${value}`;
  }

  // Получение заголовков
  get headers() {
    const headers: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    // Добавление заголовка авторизации
    const token = this.token;
    if (token) {
      headers.Authorization = token;
    }

    return headers;
  }

  // Инициализация токена из localStorage
  private _initToken() {
    const data = localStorage.getItem(this._tokenKey);
    if (!data) return;
    const token = JSON.parse(data);
    if (!token.value || !token.type) return;
    this._token = token;
  }

  // Обновление токена в localStorage
  protected _updateToken(token: IApiToken) {
    const data = JSON.stringify(token);
    localStorage.setItem(this._tokenKey, data);
    this._token = token;
  }

  // Удаление токена
  protected _clearToken() {
    this._token.type = null;
    this._token.value = null;
    localStorage.removeItem(this._tokenKey);
  }

  // создание сообщения app-message
  protected _info(message: string) {
    return this._message.info(message);
  }

  // Создание сообщения об ошибки app-message
  protected _error(e: unknown | string) {
    const error = e as Error | AxiosError;
    let message = ''; // текст сообщения об ошибки
    let errorKey = null; // ключь по которому можем сохранить ошибку во vuex для дальнейшей обработки
    let status: number | null = null; // статус ошибки
    // если ошибка из запроса
    if (axios.isAxiosError(error)) {
      message = error.response?.data.message as string;
      status = error.response?.status || null;
      errorKey = error.response?.data.type || null;
    }
    // если передали в ошибку простое сообщение
    if (typeof e === 'string') {
      message = e;
    }
    // Возвращаем созданную ошибку для дальнейшей работы с ней
    return this._message.error(message, errorKey, status);
  }

  protected _post: FApiMethod = (url, data, config) => {
    return api.post(url, data, { ...config, headers: this.headers });
  };

  protected _patch: FApiMethod = (url, data, config) => {
    return api.patch(url, data, { ...config, headers: this.headers });
  };
}
