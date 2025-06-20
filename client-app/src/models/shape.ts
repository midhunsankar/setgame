const Shape = {
  None: "none",
  Diamond: "diamond",
  Oval: "oval",
  Swiggle: "swiggle",
} as const;

type Shape = (typeof Shape)[keyof typeof Shape];

export type { Shape };
