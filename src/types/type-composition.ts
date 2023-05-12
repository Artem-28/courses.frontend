import { ComputedRef, Ref } from 'vue';
import {
  FGetCacheElement,
  FSetCacheElement,
  IFromElementPoint,
  IPosition,
  IToElementPoint,
  TRefHTMLElement
} from 'src/types/type-component-props'
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
  fromPoints: ComputedRef<IFromElementPoint>;
  toPoints: ComputedRef<IToElementPoint>;
  updateSize: (type: 'from' | 'to', zoom?: number) => void;
  updatePosition: (type: 'from' | 'to', offset?: IPosition, zoom?: number) => void;
}

export type FCompositionUseConnectionSwitchPoint = (fromPoints: ComputedRef<IFromElementPoint>, toPoints: ComputedRef<IToElementPoint>) => {
  fromPoint: ComputedRef<IPosition>;
  toPoint: ComputedRef<IPosition>;
  fromPointType: ComputedRef<keyof IFromElementPoint>
  toPointType: ComputedRef<keyof IToElementPoint>
}

export type FCompositionUseConnectionLineRender = (
  fromPoint: ComputedRef<IPosition>,
  toPoint: ComputedRef<IPosition>,
  fromPointType: ComputedRef<keyof IFromElementPoint>,
  toPointType: ComputedRef<keyof IToElementPoint>
) => {
  lineData: ComputedRef<string>;
}

export type FCompositionUseDOMElement = (setCacheCallback?: FSetCacheElement | null, getCacheCallback?: FGetCacheElement ) => {
  getElement: (elementId: string, cache?: boolean) => HTMLElement | null
}
