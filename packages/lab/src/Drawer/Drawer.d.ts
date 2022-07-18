import { DrawerProps, StandardProps } from "@mui/material";


export type HvDrawerClassKey = "root" | "background" | "paper" | "closeButton";

export interface HvDrawerProps extends StandardProps<DrawerProps, HvDrawerClassKey> {
    /**
   * Title for the button close.
   */
     buttonTitle?: string;
}

export default function HvDrawer(props: HvDrawerProps): JSX.Element | null;
