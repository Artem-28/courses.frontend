import { ComputedRef, Ref } from 'vue'
import { IPosition, TRefHTMLElement } from 'src/types/type-component-props';
import { FCallback, IDragHook } from 'src/types/type-hook';

export type FCompositionUseDrag = (refElement: TRefHTMLElement, position: IPosition, hook?: IDragHook) => {
  position: IPosition,
  dragStart: (e: MouseEvent) => void;
  dragStop: () => void;
}

export interface IObserverType {
  resize: () => ResizeObserver;
  mutation: () => MutationObserver;
}

export type FCompositionUseObserver = <K extends keyof IObserverType>(type: K, elem: Ref<HTMLElement | null>, callback?: FCallback) => {
  enable: () => void,
  disconnect: () => void,
};

export type FCompositionUseConnectionLinePoint = (refFromElement: TRefHTMLElement, refToElement: TRefHTMLElement) => {
  fromLeftPoint: ComputedRef<IPosition>;
  fromRightPoint: ComputedRef<IPosition>;
  toTopPoint: ComputedRef<IPosition>;
  toRightPoint: ComputedRef<IPosition>;
  toBottomPoint: ComputedRef<IPosition>;
  toLeftPoint: ComputedRef<IPosition>;
  fromPoint: ComputedRef<IPosition | null>;
  toPoint: ComputedRef<IPosition | null>;
  updateElementSize: (type: 'from' | 'to', zoom?: number) => void;
  updateElementPosition: (type: 'from' | 'to', offset?: IPosition, zoom?: number) => void;
}
