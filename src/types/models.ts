import BaseBlockModel from 'src/models/block/BaseBlock';
import { Position } from 'src/types/component-props';

export interface BlockData {
  id: number,
  type: string,
  position: Position
}

export type UpdateBlockData = Partial<BlockData>

export interface BlockModels {
  baseBlock: (data: BlockData) => BaseBlockModel;
}
