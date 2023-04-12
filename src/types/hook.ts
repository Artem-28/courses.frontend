export type Callback = (value: any) => any;

export type ChangeTimeHook = (time: number) => void;
export type StopTimerHook = () => void;

export interface TimerHook {
  change?: ChangeTimeHook;
  stop?: StopTimerHook;
}
