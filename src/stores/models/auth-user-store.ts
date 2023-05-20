import { defineStore } from 'pinia';
import { IAuthUserState } from 'src/types/store';
import BaseUser from 'src/models/user/BaseUser';

export const useAuthUserStore = defineStore('auth-user', {
  state: (): IAuthUserState => ({
    _user: null
  }),
  getters: {
    user: (state) => state._user
  },
  actions: {
    create (user: BaseUser) {
      this._user = user;
    },
    delete () {
      this._user = null;
    }
  }
});
