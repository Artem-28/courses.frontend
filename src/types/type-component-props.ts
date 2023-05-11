import { Ref } from 'vue';

export interface ICustomProps {
  [key: string]: any;
}
export interface ICacheDOMElements {
  [DOMElementId: string]: HTMLElement;
}

export type FSetCacheElement = (elemId: string, elem: HTMLElement) => void;
export type FGetCacheElement = (elemId: string) => HTMLElement | null;

export interface IPosition {
  x: number,
  y: number,
}
export interface IRange {
  min: number,
  max: number,
}

export interface ISize {
  width: number;
  height: number;
}

export interface IConfines {
  x: IRange,
  y: IRange,
}

export interface ILoginForm {
  email: string | null,
  password: string | null,
}

export type TRefHTMLElement = Ref<HTMLElement | null>;
