import { IPosition } from 'src/types/type-component-props';

export type FCallback = (value: any) => any;

export type FChangeTimeHook = (time: number) => void;
export type FStopTimerHook = () => void;

export interface IDragHookAttr {
  elem: HTMLElement;
  elemRect: DOMRect;
  position: IPosition;
}

export type FDragStart = (data: IDragHookAttr) => void;
export type FDragMove = (data: IDragHookAttr) => void;
export type FDragStop = (data: IDragHookAttr) => void;

export interface IDragHook {
  dragStart?: FDragStart;
  move?: FDragMove,
  dragStop?: FDragStop
}

export type FCallHookDrag = <K extends keyof IDragHook>(type: K) => void;

export interface ITimerHook {
  stop?: () => void;
  change?: (time: number) => void;
}
