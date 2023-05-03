import { Position, Size } from 'src/types/component-props';
import { BlockData, UpdateBlockData } from 'src/types/models';

export default class BaseBlockModel {
  _id: number | string;
  _position: Position;
  _size: Size;
  _active: boolean;

  constructor (data: BlockData) {
    this._id = data.id;
    this._position = data.position;
    this._size = { width: 200, height: 200 };
    this._active = false;
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

  set active(value) {
    this._active = value;
  }

  update(updateBlockData: UpdateBlockData) {
    if (updateBlockData.position) {
      this._position = { ...updateBlockData.position };
    }
  }
}
