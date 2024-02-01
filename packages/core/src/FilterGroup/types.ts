export type HvFilterGroupFilters = {
  id: string;
  name: string;
  data: {
    id: string | number;
    name: string;
  }[];
}[];

export type HvFilterGroupValue = (string | number)[][];

export type HvFilterGroupHorizontalPlacement = "left" | "right";
