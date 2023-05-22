import { IConfirmCodeCreateMethod } from 'src/types/type-models';
import { TConfirmCode } from 'src/types/type-component-props';
import { IApiCodeData } from 'src/types/type-api';
import BaseConfirmCode from 'src/models/confirm-code/BaseConfirmCode';

const confirmCodeFactory = {
  create: (type: TConfirmCode, data?: IApiCodeData) => {
    switch (type) {
      default:
        return createModel.baseConfirmCode(type, data);
    }
  }
};

const createModel: IConfirmCodeCreateMethod = {
  baseConfirmCode: (type, data) => new BaseConfirmCode(type, data)
};

export default confirmCodeFactory;
