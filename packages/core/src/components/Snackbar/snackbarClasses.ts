import { getClasses } from "utils";

export type HvSnackbarClasses = {
  /** Styles applied to the component when define as top right.  */
  anchorOriginTopRight?: string;
  /** Styles applied to the component when define as top left.  */
  anchorOriginTopLeft?: string;
  /** Styles applied to the component when define as top center.  */
  anchorOriginTopCenter?: string;
  /** Styles applied to the component when define as bottom center.  */
  anchorOriginBottomCenter?: string;
  /** Styles applied to the component when define as bottom left.  */
  anchorOriginBottomLeft?: string;
  /** Styles applied to the component when define as bottom right.  */
  anchorOriginBottomRight?: string;
};

const classKeys: string[] = [
  "anchorOriginTopRight",
  "anchorOriginTopLeft",
  "anchorOriginTopCenter",
  "anchorOriginBottomCenter",
  "anchorOriginBottomLeft",
  "anchorOriginBottomRight",
];

export const snackbarClasses = getClasses<HvSnackbarClasses>(
  classKeys,
  "HvSnackbar"
);
