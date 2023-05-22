import { defineStore } from 'pinia';
import { IAppMessageState } from 'src/types/store';
import { IAppMessage } from 'src/types/type-models';

export const useAppMessageStore = defineStore('app-message', {
  state: () : IAppMessageState => ({
    _messages: {},
    showMessage: null
  }),
  getters: {
    // возвращает первое найденное сообщение по ключу
    getMessage: (state) => (...keys: string[]) => {
      for (const key of keys) {
        const message = state._messages[key];
        if (!message) continue;
        return message;
      }
    }
  },
  actions: {
    insert(key: string, message: IAppMessage) {
      this._messages[key] = message;
    },
    clear(...keys: string[]) {
      if (!keys.length) {
        this._messages = {};
        return;
      }
      for (const key of keys) {
        delete this._messages[key];
      }
    },
    updateShowMessage(message: IAppMessage) {
      this.showMessage = message;
    },
    clearShowMessage() {
      this.showMessage = null;
    }
  }
});
