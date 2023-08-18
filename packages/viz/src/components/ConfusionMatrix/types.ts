export interface HvConfusionMatrixColorScale {
  /** You can use either an HEX or color name from the palette. */
  color: string;
  label: string;
  max?: number;
  min?: number;
  value?: number;
}

export interface HvConfusionMatrixValuesProps {
  /** Whether to show the prediction values inside the confusion matrix or not. Defaults to `true`. */
  show?: boolean;
  /** Prediction values label color. You can use either an HEX or color name from the palette. */
  color?: string;
  /** Prediction values label font style. */
  fontStyle?: "normal" | "italic";
  /** Prediction values label font weight. */
  fontWeight?: number;
  /** Prediction values label font size. */
  fontSize?: number;
}

export type HvConfusionMatrixFormat = "square" | "landscape";
