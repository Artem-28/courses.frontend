import { IApiCodeData } from 'src/types/type-api';
import BaseConfirmCode from 'src/models/confirm-code/BaseConfirmCode';
import { TConfirmCode } from 'src/types/type-component-props';

export interface IConfirmCodeCreateMethod {
  baseConfirmCode: (type: TConfirmCode, data?: IApiCodeData) => BaseConfirmCode;
}
