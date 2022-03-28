import * as React from "react";
import { StandardProps } from "@material-ui/core"

export type HvProgressClassKey = 
    | "root"
    | "progress"
    | "progressContainer"
    | "progressBarContainer"
    | "progressBar"
    | "progressDone"
    | "progressError"
    | "progressBarLabel"
    | "progressAriaAlert";

export interface HvProgressBarProps
    extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvProgressClassKey> {
        /**
         * The value of the progress bar.
         */
        value?: number;
        /**
         * Indicates if there was an error while loading.
         */
        error?: boolean;
        /**
         * 
         */
        undeterminate?:boolean


    }


