import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvCookiesConsentDialogClassKey = "root";

export type HvCookiesConsentDialogProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvCookiesConsentDialogClassKey
>;

export default function HvCookiesConsentDialog(props: HvCookiesConsentDialogProps): JSX.Element | null;
