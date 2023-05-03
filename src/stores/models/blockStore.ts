import { defineStore } from 'pinia';
import blockFactory from 'src/factories/BlockFactory';
import { BlockData } from 'src/types/models';
import BaseBlockModel from 'src/models/block/BaseBlock';

const factory = blockFactory;
export const useBlockStore = defineStore('block', {
  state: () => ({
    _items: {}
  }),
  getters: {
    items: (state): BaseBlockModel[] => {
      return Object.values(state._items);
    }
  },
  actions: {
    create(resource: BlockData[]) {
      this._items = resource.reduce((acc, data) => {
        const block = factory.create(data.type, data);
        return { ...acc, [block.id]: block };
      }, {});
    }
  }
});
