import { getClasses } from "~/utils";

export type HvGridClasses = {
  root?: string;
  container?: string;
  item?: string;
  zeroMinWidth?: string;
  "direction-xs-column"?: string;
  "direction-xs-reverse"?: string;
  "direction-xs-row-reverse"?: string;
  "wrap-xs-nowrap"?: string;
  "wrap-xs-wrap-reverse"?: string;
  "spacing-xs-1"?: string;
  "spacing-xs-2"?: string;
  "spacing-xs-3"?: string;
  "spacing-xs-4"?: string;
  "spacing-xs-5"?: string;
  "spacing-xs-6"?: string;
  "spacing-xs-7"?: string;
  "spacing-xs-8"?: string;
  "spacing-xs-9"?: string;
  "spacing-xs-10"?: string;
  "grid-xs-auto"?: string;
  "grid-xs-true"?: string;
  "grid-xs-1"?: string;
  "grid-xs-2"?: string;
  "grid-xs-3"?: string;
  "grid-xs-4"?: string;
  "grid-xs-5"?: string;
  "grid-xs-6"?: string;
  "grid-xs-7"?: string;
  "grid-xs-8"?: string;
  "grid-xs-9"?: string;
  "grid-xs-10"?: string;
  "grid-xs-11"?: string;
  "grid-xs-12"?: string;
};

const classKeys: string[] = [
  "root",
  "container",
  "item",
  "zeroMinWidth",
  "direction-xs-column",
  "direction-xs-reverse",
  "direction-xs-row-reverse",
  "wrap-xs-nowrap",
  "wrap-xs-wrap-reverse",
  "spacing-xs-1",
  "spacing-xs-2",
  "spacing-xs-3",
  "spacing-xs-4",
  "spacing-xs-5",
  "spacing-xs-6",
  "spacing-xs-7",
  "spacing-xs-8",
  "spacing-xs-9",
  "spacing-xs-10",
  "grid-xs-auto",
  "grid-xs-true",
  "grid-xs-1",
  "grid-xs-2",
  "grid-xs-3",
  "grid-xs-4",
  "grid-xs-5",
  "grid-xs-6",
  "grid-xs-7",
  "grid-xs-8",
  "grid-xs-9",
  "grid-xs-10",
  "grid-xs-11",
  "grid-xs-12",
];

const gridClasses = getClasses<HvGridClasses>(classKeys, "HvGrid");

export default gridClasses;
