import {
  IChangePasswordForm,
  ICodeData,
  ILoginForm,
  IRegistrationForm,
  TConfirmCode
} from 'src/types/type-component-props'
import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

export interface IApiToken {
  value: string | null;
  type: string | null;
}

export interface ICodePayload {
  email: string;
  type: TConfirmCode;
  code?: number
}

export interface IErrorBase {
  error: string;
  type: 'stock-error';
}

export interface IAxiosError {
  error: AxiosError,
  type: 'axios-error'
}

export type TError = 'stock-error' | 'axios-error';

export type FApiMethod = (url: string, data?: any, config?: AxiosRequestConfig | undefined) => Promise<AxiosResponse<any>>

export type FApiLogin = (payload: ILoginForm) => Promise<AxiosResponse<any>>
export type FApiRegistration = (payload: IRegistrationForm) => Promise<AxiosResponse<any>>
export type FApiChangePassword = (payload: IChangePasswordForm) => Promise<AxiosResponse<any>>
export type FApiCheckExistEmail = (payload: { email: string }) => Promise<AxiosResponse<any>>

export type FApiCode = (payload: ICodePayload) => Promise<AxiosResponse<any>>

export interface IApiCodeData {
  delay: ICodeData;
  live: ICodeData;
  matches: boolean;
}
