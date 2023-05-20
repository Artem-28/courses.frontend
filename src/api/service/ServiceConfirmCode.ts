import BaseService from 'src/api/service/BaseService';
import { FApiCode, ICodePayload } from 'src/types/type-api';
import confirmCodeFactory from 'src/factories/confirm-code-factory';
import BaseConfirmCode from 'src/models/confirm-code/BaseConfirmCode';

class ServiceConfirmCode extends BaseService {
  _factory = confirmCodeFactory;

  _sendCode: FApiCode = payload => this._post('send_code', payload);
  _checkCode: FApiCode = payload => this._post('check_code', payload);

  // Отправка кода подтверждения
  async sendCode(payload: ICodePayload): Promise<BaseConfirmCode> {
    try {
      const { data: { data } } = await this._sendCode(payload);
      return this._factory.create(payload.type, data);
    } catch (e) {
      this._errorHandler(e);
    }
    return this._factory.create(payload.type);
  }

  async checkCode(payload: ICodePayload): Promise<BaseConfirmCode> {
    try {
      const { data: { data } } = await this._checkCode(payload);
      return this._factory.create(payload.type, data);
    } catch (e) {
      this._errorHandler(e);
      this.showErrorMessage();
    }
    return this._factory.create(payload.type);
  }
}

export default new ServiceConfirmCode();
