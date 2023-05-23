import { ComputedRef, Ref, UnwrapRef } from 'vue';
import {
  FGetCacheElement,
  FSetCacheElement, IChangePasswordForm,
  IFromElementPoint, ILoginForm,
  IPosition, IRegistrationForm,
  IStep,
  IToElementPoint,
  IValidateForm,
  IValidateMessage,
  TConfirmCode,
  TRefHTMLElement,
  TValidateProperty
} from 'src/types/type-component-props'
import { FCallback, IDragHook, ITimerHook } from 'src/types/type-hook';
import { Validation } from '@vuelidate/core';
import BaseConfirmCode from 'src/models/confirm-code/BaseConfirmCode'
import { Pinia, StoreDefinition } from 'pinia'

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

export type FCompositionUseDOMElement = (setCacheCallback?: FSetCacheElement | null, getCacheCallback?: FGetCacheElement) => {
  getElement: (elementId: string, cache?: boolean) => HTMLElement | null
}

export type FCompositionUseToggle = (value: boolean, look: boolean) => {
  isToggle: Ref<UnwrapRef<boolean>>,
  toggle: () => void;
}

export type FCompositionUseTimer = (hook?: ITimerHook) => {
  timer: Ref<number>;
  formatterTimer: ComputedRef<string>;
  setTimer: (time: number) => void;
  stopTimer: () => void;
  startTimer: () => void;
  pauseTimer: () => void;
}

export type FCompositionValidateMessage = (validate: Ref<Validation>, property: TValidateProperty) => {
  errorMessage: Ref<IValidateMessage>;
}

export type FCompositionStep = (steps: Array<IStep | string>, startStep?: string) => {
  step: ComputedRef<IStep>;
  nextStep: () => IStep;
  prevStep: () => IStep;
  setStep: (step: string) => IStep;
  stepInfo: ComputedRef<{ start: boolean, end: boolean, count: number, current: number, stepValue: string }>;
}

export type FCompositionUseConfirmCode = (type: TConfirmCode) => {
  code: Ref<BaseConfirmCode>,
  confirmDelay: ComputedRef<number>
  codeTime: ComputedRef<{ live: string, delay: string }>
  sendCode: (payload: { email: string }) => void;
  checkCode: (payload: { email: string, code?: string }) => void;
  logCheckCode: () => void;
};

// Validation form
export interface IResponseUseValidate {
  validate: Ref<Validation>
  errorMessage: Ref<IValidateMessage>;
}

export type FCompositionUseValidateLoginForm = (formData: ILoginForm) => IResponseUseValidate;
export type FCompositionUseValidateRegistrationForm = (formData: IRegistrationForm) => IResponseUseValidate;
export type FCompositionUseValidateChangePasswordForm = (formData: IChangePasswordForm) => IResponseUseValidate;

// Router guard
export type TGuardModule = 'authorized'
export type FCompositionUseCheckGuard = (modules: TGuardModule) => {
  guard: () => Promise<boolean>;
}
export type FCompositionUseRouterGuard = () => {
  guard: () => Promise<boolean>
};
