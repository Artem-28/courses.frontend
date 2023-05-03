import { Ref } from 'vue';
import { Position } from 'src/types/component-props';
import { Callback, DragHook } from 'src/types/hook';

export type CompositionUseDrag = (refElement: Ref<HTMLElement | null>, position: Position, hook?: DragHook) => {
  position: Position,
  dragStart: (e: MouseEvent) => void;
  dragStop: () => void;
}

export interface ObserverType {
  resize: () => ResizeObserver;
}

export type CompositionUseObserver = <K extends keyof ObserverType>(type: K, elem: Ref<HTMLDivElement | HTMLElement | null>, callback?: Callback) => {
  enable: () => void,
  disconnect: () => void,
};
