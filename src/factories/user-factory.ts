import { IUserData, IUserCreateMethod } from 'src/types/type-models';
import BaseUser from 'src/models/user/BaseUser';

const userFactory = {
  create: (type: string | null, data: IUserData) => {
    switch (type) {
      default:
        return createModel.baseUser(data);
    }
  }
};

const createModel: IUserCreateMethod = {
  baseUser: (data) => new BaseUser(data)
};

export default userFactory;
