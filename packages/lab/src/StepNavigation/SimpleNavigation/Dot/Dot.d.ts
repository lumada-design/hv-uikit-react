import * as React from "react";
import { StandardProps } from "@mui/material";
import { HvStepProps } from "../../DefaultNavigation/Step";

export type HvDotClassKey = "root";

export type HvDotProps = StandardProps<React.HTMLAttributes<HTMLDivElement>, HvDotClassKey> &
  Pick<HvStepProps, "size" | "title" | "state" | "onClick" | "disabled">;

export default function HvDot(props: HvDotProps): JSX.Element | null;
