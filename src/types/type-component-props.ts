export interface ICustomProps {
  [key: string]: any;
}
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
