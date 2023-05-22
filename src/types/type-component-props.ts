import { Ref } from 'vue';

export interface ICustomProps {
  [key: string]: any;
}
export interface ICacheDOMElements {
  [DOMElementId: string]: HTMLElement;
}
export interface ICustomHTMLElement extends HTMLElement {
  __app?: any;
}
export type FSetCacheElement = (elemId: string, elem: HTMLElement) => void;
export type FGetCacheElement = (elemId: string) => HTMLElement | null;

export interface IPosition {
  x: number;
  y: number;
}
export interface IRange {
  min: number;
  max: number;
}

export interface ISize {
  width: number;
  height: number;
}

export interface IConfines {
  x: IRange;
  y: IRange;
}

export interface IFromElementPoint {
  left: IPosition;
  right: IPosition;
}

export interface IToElementPoint {
  top: IPosition;
  right: IPosition;
  bottom: IPosition;
  left: IPosition;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegistrationForm {
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
  licenseAgreement: boolean;
}

export interface IChangePasswordForm {
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
}

export interface IValidateMessage {
  [property: string]: string | null;
}
export interface IValidateError {
  [property: string]: boolean;
}
export interface IValidateForm extends ILoginForm, IRegistrationForm, IChangePasswordForm {}
export type IFormData = ILoginForm | IRegistrationForm | IChangePasswordForm;
export type TValidateProperty = Array<keyof ILoginForm | keyof IRegistrationForm>;

export type TRefHTMLElement = Ref<HTMLElement | null>;

export type TConfirmCode = 'registration' | 'change_password';

export interface ICodeData {
  valid: boolean;
  time: number;
}

export interface IStep {
  value: string
}
