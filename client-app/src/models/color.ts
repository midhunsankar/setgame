const Color = {
  None: "none",
  Red: "red",
  Green: "green",
  Violet: "purple",
} as const;
export type Color = (typeof Color)[keyof typeof Color];
export default Color;
