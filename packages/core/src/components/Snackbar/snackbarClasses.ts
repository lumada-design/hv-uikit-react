import { getClasses } from "@core/utils";

export interface HvSnackbarClasses {
  root?: string;
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
}

const classKeys: (keyof HvSnackbarClasses)[] = [
  "root",
  "anchorOriginTopRight",
  "anchorOriginTopLeft",
  "anchorOriginTopCenter",
  "anchorOriginBottomCenter",
  "anchorOriginBottomLeft",
  "anchorOriginBottomRight",
];

const snackbarClasses = getClasses(classKeys, "HvSnackbar");

export default snackbarClasses;
