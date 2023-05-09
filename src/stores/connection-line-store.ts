import { defineStore } from 'pinia';
import { IConnectionLineState, ILineElementIds } from 'src/types/store/type-connection-line';

export const useConnectionLineStore = defineStore('connection-line', {
  state: (): IConnectionLineState => ({
    _lineData: {}
  }),
  getters: {
    lineDOMElementIds: (state) => {
      return Object.entries(state._lineData).reduce((acc, [toDOMId, fromDOMIds]) => {
        const data = fromDOMIds.map(DOMId => ({ from: DOMId, to: toDOMId }));
        return [...acc, ...data];
      }, [] as ILineElementIds[]);
    }
  },
  actions: {
    insert(toDOMId: string, fromDOMIds: string[]) {
      this._lineData[toDOMId] = fromDOMIds;
    },
    update(toDOMId: string, fromDOMIds: string[]) {
      const currentToIds = this._lineData[toDOMId] || [];
      this._lineData[toDOMId] = [...new Set([...currentToIds, ...fromDOMIds])] as string[];
    },
    updateOrCreate (toDOMId: string, fromDOMIds: string[]) {
      const hasKey = Object.prototype.hasOwnProperty.call(this._lineData, toDOMId);
      if (hasKey) {
        this.update(toDOMId, fromDOMIds);
        return;
      }
      this.insert(toDOMId, fromDOMIds);
    }
  }
});
