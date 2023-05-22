import { ICodeData, TConfirmCode } from 'src/types/type-component-props';
import { IApiCodeData } from 'src/types/type-api';

export default class BaseConfirmCode {
  live: ICodeData;
  delay: ICodeData;
  matches: boolean;
  type: TConfirmCode;

  constructor (type: TConfirmCode, data?: IApiCodeData | null) {
    const liveTime = data ? data.live.time : 0;
    const delayTime = data ? data.delay.time : 0;
    this.live = { valid: !!data && data.live.valid, time: liveTime };
    this.delay = { valid: !!data && data.delay.valid, time: delayTime };
    this.matches = !!data && data.matches;
    this.type = type;
  }

  public resetDelay() {
    this.delay.valid = false;
    this.delay.time = 0;
  }
}
