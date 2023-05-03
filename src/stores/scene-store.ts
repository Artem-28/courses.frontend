import { defineStore } from 'pinia';
import { SceneState } from 'src/types/store/scene';

export const useSceneStore = defineStore('scene', {
  state: (): SceneState => ({
    _ident: 40,
    _size: { width: 10000, height: 10000 },
    _zoom: 1
  }),
  getters: {
    confines: (state) => {
      const { width, height } = state._size;
      const ident = state._ident;
      return {
        x: { min: ident, max: width - ident },
        y: { min: ident, max: height - ident }
      };
    },
    ident: (state) => state._ident,
    zoom: (state) => state._zoom,
    size: (state) => state._size
  },
  actions: {
    updateZoom(updateData: number) {
      const delta = updateData > 0 ? 0.1 : -0.1;
      this._zoom = Math.max(0.1, Math.min(2, this.zoom - delta));
    }
  }
});
