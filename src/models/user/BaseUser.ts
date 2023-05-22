import { IUserData } from 'src/types/type-models';

export default class BaseUser {
  _id: number;
  _email: string;
  _phone: number | null;

  constructor (data: IUserData) {
    this._id = data.id;
    this._email = data.email;
    this._phone = data.phone;
  }
}
