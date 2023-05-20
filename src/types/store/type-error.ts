import { IAxiosError, IErrorBase } from 'src/types/type-api'

export interface IErrorState {
  _axios: {
    [key: string]: IAxiosError;
  },
  _base: {
    [key: string]: IErrorBase;
  }
}
