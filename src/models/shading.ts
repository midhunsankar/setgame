const shading = {
  None: "none",
  Solid: "solid",
  Striped: "striped",
  Open: "open",
} as const;
type Shading = (typeof shading)[keyof typeof shading];
export type { Shading };
