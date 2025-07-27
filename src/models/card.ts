import type { Shape } from "./shape";
import type { Shading } from "./shading";
import type { Color } from "./color";

export interface Card {
  id: number;
  number: number;
  color: Color;
  shape: Shape;
  shading: Shading;
  selected?: boolean;
}
