import BaseUser from 'src/models/user/BaseUser';

export interface IUserData {
  id: number;
  email: string;
  phone: number | null;
}

export interface IUserCreateMethod {
  baseUser: (data: IUserData) => BaseUser;
}
