import * as React from "react";
import { StandardProps } from "@mui/material";
import { HvButtonProps } from "@hitachivantara/uikit-react-core";

export type HvStepClassKey = "root";

export type HvStepProps = StandardProps<React.HTMLAttributes<HTMLDivElement>, HvStepClassKey> &
  Pick<HvButtonProps, "onClick"> & {
    /**
     * State of the step. Values = {"Pending", "Failed", "Completed", "Current", "Disabled", "Enabled"}
     */
    state: "Pending" | "Failed" | "Completed" | "Current" | "Disabled" | "Enabled";
    /**
     * Title of the step.
     */
    title: string;
    /**
     * Sets one of the standard sizes of the step
     */
    size?: "XS" | "SM" | "MD" | "LG" | "XL";
    /**
     * Number of the step.
     */
    number?: number;
    /**
     * Define if a step is disabled/enabled.
     * If this property is not defined and the step is on state "Disabled", the step component will be disabled
     */
    disabled?: boolean;
  };

export default function HvStep(props: HvStepProps): JSX.Element | null;
