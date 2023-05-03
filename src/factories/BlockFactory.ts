import { BlockData, BlockModels } from 'src/types/models';
import BaseBlockModel from 'src/models/block/BaseBlock';

const blockFactory = {
  create: (type: string, data: BlockData) => {
    switch (type) {
      default:
        return createModel.baseBlock(data);
    }
  }
};

const createModel: BlockModels = {
  baseBlock: (data) => new BaseBlockModel(data)
};

export default blockFactory;
