import { Ref } from 'vue';
import { IPosition } from 'src/types/type-component-props';
import { FCallback, IDragHook } from 'src/types/type-hook';

export type FCompositionUseDrag = (refElement: Ref<HTMLElement | null>, position: IPosition, hook?: IDragHook) => {
  position: IPosition,
  dragStart: (e: MouseEvent) => void;
  dragStop: () => void;
}

export interface IObserverType {
  resize: () => ResizeObserver;
}

export type FCompositionUseObserver = <K extends keyof IObserverType>(type: K, elem: Ref<HTMLElement | null>, callback?: FCallback) => {
  enable: () => void,
  disconnect: () => void,
};
