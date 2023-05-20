import BaseUser from 'src/models/user/BaseUser';

export interface IAuthUserState {
  _user: BaseUser | null;
}
