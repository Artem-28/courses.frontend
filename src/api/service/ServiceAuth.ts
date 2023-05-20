import BaseService from 'src/api/service/BaseService';
import { FApiCheckExistEmail, FApiLogin } from 'src/types/type-api';
import { ILoginForm } from 'src/types/type-component-props';
import userFactory from 'src/factories/user-factory';
import BaseUser from 'src/models/user/BaseUser';

class ServiceAuth extends BaseService {
  private _factory = userFactory;

  private _login: FApiLogin = (payload) => this._post('auth/login', payload);
  private _checkExistsEmail: FApiCheckExistEmail = (payload) => this._post('auth/check_exist', payload);

  async login(payload: ILoginForm): Promise<BaseUser | null> {
    try {
      const { data: { data } } = await this._login(payload);
      const user = this._factory.create(null, data.user);
      this._updateToken({ value: data.access_token, type: data.token_type });
      return user;
    } catch (e) {
      this._errorHandler(e);
      this._saveErrorState('login');
      return null;
    }
  }

  async checkExistsEmail(payload: string): Promise<{ exists: boolean } | null> {
    try {
      const { data: { data } } = await this._checkExistsEmail(payload);
      return data;
    } catch (e) {
      this._errorHandler('error.registration.login_check');
      this.showErrorMessage();
      return null;
    }
  }
}

export default new ServiceAuth();
