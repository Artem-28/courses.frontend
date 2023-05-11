export interface ILineElementData {
  elementId: string;
  containerId: string;
}

export interface IConnectionLineState {
  _lineData: {
    [toDOMId: string]: ILineElementData[]
  }
}

export interface ILineElementIds {
  from: string,
  fromContainer: string
  to: string,
}

export type FUpdateCreateLineData = (toElementId: string, fromData: ILineElementData[]) => void;
