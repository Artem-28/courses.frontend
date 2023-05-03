import { Position } from 'src/types/component-props';

export type Callback = (value: any) => any;

export type ChangeTimeHook = (time: number) => void;
export type StopTimerHook = () => void;

export interface TimerHook {
  change?: ChangeTimeHook;
  stop?: StopTimerHook;
}

export interface DragHookAttr {
  elem: HTMLElement;
  elemRect: DOMRect;
  position: Position;
}

export type DragStart = (data: DragHookAttr) => void;
export type DragMove = (data: DragHookAttr) => void;
export type DragStop = (data: DragHookAttr) => void;

export interface DragHook {
  dragStart?: DragStart;
  move?: DragMove,
  dragStop?: DragStop
}

export type CallHookDrag = <K extends keyof DragHook>(type: K) => void;
