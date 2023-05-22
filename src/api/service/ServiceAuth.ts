import BaseService from 'src/api/service/BaseService';
import userFactory from 'src/factories/user-factory';
import BaseUser from 'src/models/user/BaseUser';
import { FApiChangePassword, FApiCheckExistEmail, FApiLogin, FApiRegistration } from 'src/types/type-api';
import { IChangePasswordForm, ILoginForm, IRegistrationForm } from 'src/types/type-component-props';

class ServiceAuth extends BaseService {
  private _factory = userFactory; // фабрика для создания модели пользователя

  private _login: FApiLogin = (payload) => this._post('auth/login', payload);
  private _registration: FApiRegistration = (payload) => this._post('auth/registration', payload);
  private _changePassword: FApiChangePassword = (payload) => this._patch('auth/change_password', payload);
  private _checkExistsEmail: FApiCheckExistEmail = (payload) => this._post('auth/check_exists', payload);

  public async login(payload: ILoginForm): Promise<BaseUser | null> {
    try {
      const { data: { data } } = await this._login(payload);
      const user = this._factory.create(null, data.user);
      this._updateToken({ value: data.access_token, type: data.token_type });
      return user;
    } catch (e) {
      const error = this._error(e);
      if (error.key) {
        error.set(error.key);
        return null;
      }
      this._error('error.login.base').show();
      return null;
    }
  }

  public async registration(payload: IRegistrationForm): Promise<boolean> {
    try {
      const { data: { success } } = await this._registration(payload);
      return !!success;
    } catch (e) {
      const error = this._error(e);
      if (error.key) {
        error.set(error.key);
        return false;
      }
      this._error('error.registration.base').show();
      return false;
    }
  }

  public async changePassword(payload: IChangePasswordForm): Promise<boolean> {
    try {
      const { data: { success } } = await this._changePassword(payload);
      return !!success;
    } catch (e) {
      const error = this._error(e);
      if (error.key) {
        error.set(error.key);
        return false;
      }
      this._error('error.change_password.base').show();
      return false;
    }
  }

  public async checkExistsEmail(payload: string): Promise<{ exists: boolean } | null> {
    try {
      const { data: { data } } = await this._checkExistsEmail({ email: payload });
      if (data && data.exists) {
        this._info('validate_message.email.exists').set('login_exists');
      }
      if (data && !data.exists) {
        this._info('validate_message.email.not_exist').set('login_not_exist');
      }
      return data;
    } catch (e) {
      this._error('error.registration.login_check').show();
      return null;
    }
  }
}

export default new ServiceAuth();
