import React from "react";
import { HvLoading } from "@hitachivantara/uikit-react-core";

import classes from "./styles";

export interface LoadingProps {
  label?: string;
}

/** _Fullscreen_ `HvLoading` component to use with `Suspense` and other loading fallbacks */
export const Loading: React.FC<LoadingProps> = ({ label }) => (
  <HvLoading
    role="progressbar"
    label={label}
    aria-valuetext={label}
    className={classes.root}
  />
);
