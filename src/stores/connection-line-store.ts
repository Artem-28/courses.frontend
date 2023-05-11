import { defineStore } from 'pinia';
import { IConnectionLineState, ILineElementData, ILineElementIds } from 'src/types/store/type-connection-line';

export const useConnectionLineStore = defineStore('connection-line', {
  state: (): IConnectionLineState => ({
    _lineData: {}
  }),
  getters: {
    lineDOMElementIds: (state) => {
      return Object.entries(state._lineData).reduce((acc, [toDOMId, fromData]) => {
        const lineData = fromData.map(data => ({ from: data.elementId, fromContainer: data.containerId, to: toDOMId }));
        return [...acc, ...lineData];
      }, [] as ILineElementIds[]);
    }
  },
  actions: {
    insert(toDOMId: string, fromDOMIds: ILineElementData[]) {
      this._lineData[toDOMId] = fromDOMIds;
    },
    update(toDOMId: string, fromData: ILineElementData[]) {
      const currentToIds = this._lineData[toDOMId] || [];
      this._lineData[toDOMId] = [...currentToIds, ...fromData];
    },
    updateOrCreateLineData (toElementId: string, fromData: ILineElementData[]) {
      const hasKey = Object.prototype.hasOwnProperty.call(this._lineData, toElementId);
      if (hasKey) {
        this.update(toElementId, fromData);
        return;
      }
      this.insert(toElementId, fromData);
    }
  }
});
