import { defineStore } from 'pinia';
import { IErrorState } from 'src/types/store';
import { IAxiosError, IErrorBase, TError } from 'src/types/type-api';

export const useErrorStore = defineStore('error', {
  state: (): IErrorState => ({
    _axios: {},
    _base: {}
  }),
  getters: {
    errorMessage: (state) => (key: string, type: TError) => {
      const data = type === 'axios-error' ? state._axios[key] : state._base[key];
      if (!data) return null;
      if (data.type === 'axios-error') {
        return data.error.response?.data.message;
      }
      return data.error;
    }
  },
  actions: {
    insert (key: string, error: IAxiosError | IErrorBase) {
      if (error.type === 'axios-error') {
        this._axios[key] = error;
        return;
      }
      this._base[key] = error;
    },

    clear() {
      this._base = {};
      this._axios = {};
    }
  }
});
