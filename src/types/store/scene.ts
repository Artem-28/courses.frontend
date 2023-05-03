import { RangeProps, Size } from 'src/types/component-props'

export interface ConfinesScene {
  x: RangeProps;
  y: RangeProps;
}
export interface SceneState {
  _ident: number;
  _zoom: number;
  _size: Size;
}
export type UpdateDataConfinesScene = Partial<ConfinesScene>;
