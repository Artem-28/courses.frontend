import { IPosition, ISize } from 'src/types/type-component-props';
import { IDragBlockData } from 'src/types/type-models/type-drag-block';
import { FUpdateActiveBlock } from 'src/types/store';
import { useQuestionStore } from 'stores/models/question-store';

export default class BaseDragBlockModel {
  _id: number;
  _position: IPosition;
  _size: ISize;
  _active: boolean;
  _activated: FUpdateActiveBlock | null;

  constructor (data: IDragBlockData) {
    this._id = data.id;
    this._position = data.position;
    this._size = { width: 200, height: 200 };
    this._active = false;
    this._activated = useQuestionStore().updateActiveQuestion;
  }

  get id() {
    return this._id;
  }

  get size() {
    return this._size;
  }

  get position() {
    return this._position;
  }

  get active() {
    return this._active;
  }

  setActive(value: boolean) {
    const data = value ? this._id : null;
    this._active = value;
    if (!this._activated) return;
    this._activated(data);
  }

  update(payload: Partial<IDragBlockData>) {
    if (payload.position) {
      this._position = { ...payload.position };
    }
  }
}
