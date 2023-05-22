import BaseService from 'src/api/service/BaseService';
import BaseConfirmCode from 'src/models/confirm-code/BaseConfirmCode';
import confirmCodeFactory from 'src/factories/confirm-code-factory';
import { FApiCode, ICodePayload } from 'src/types/type-api';

class ServiceConfirmCode extends BaseService {
  _factory = confirmCodeFactory; // фабрика для создания моделей кода подтверждения

  _sendCode: FApiCode = payload => this._post('send_code', payload);
  _checkCode: FApiCode = payload => this._post('check_code', payload);

  // Отправка кода подтверждения
  async sendCode(payload: ICodePayload): Promise<BaseConfirmCode> {
    try {
      const { data: { data } } = await this._sendCode(payload);
      return this._factory.create(payload.type, data);
    } catch (e) {
      this._error('error.confirm_code.send').show();
    }
    return this._factory.create(payload.type);
  }

  async checkCode(payload: ICodePayload): Promise<BaseConfirmCode> {
    try {
      const { data: { data } } = await this._checkCode(payload);
      return this._factory.create(payload.type, data);
    } catch (e) {
      this._error('error.confirm_code.check').show();
    }
    return this._factory.create(payload.type);
  }
}

export default new ServiceConfirmCode();
