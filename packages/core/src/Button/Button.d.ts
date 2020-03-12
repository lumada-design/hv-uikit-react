import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core";

export interface HvButtonProps extends StandardProps<ButtonProps, HvButtonClassKey> {
  /**
   * Id to be applied to the root node.
   */
  id?: string;

  /**
   * Category of button to use
   */
  category?: "primary" | "secondary" | "ghost" | "ghostSecondary" | "semantic" | "icon";

  /**
   * The content of the button.
   * @required
   */
  children: React.ReactNode;

  /**
   * If `true`, the button will be disabled.
   */
  disabled?: boolean;

  /**
   * The function executed when the button is pressed.
   * @param event React.MouseEvent<HTMLButtonElement>
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => any;

  /**
   * Element placed before the children.
   */
  startIcon?: React.ReactNode;
}

/**
 * @type HvButtonClassKey
 * @property root                     - Styles applied to the component root class.
 * @property rootIcon                 - Styles applied to the component root when category is icon.
 * @property primary                  - Styles applied to the primary button.
 * @property primaryDisabled          - Styles applied to the primary button when it is disabled.
 * @property secondary                - Styles applied to the secondary button.
 * @property secondaryDisabled        - Styles applied to the secondary button when it is disabled.
 * @property ghost                    - Styles applied to the ghost button.
 * @property ghostDisabled            - Styles applied to the ghost button when it is disabled.
 * @property ghostSecondary           - Styles applied to the secondary ghost button.
 * @property ghostSecondaryDisabled   - Styles applied to the secondary ghost button when it is disabled.
 * @property semantic                 - Styles applied to the semantic button.
 * @property semanticDisabled         - Styles applied to the semantic button when it is disabled.
 * @property startIcon                - Styles applied to the inspireRed primary button.
 */
export type HvButtonClassKey =
  | "root"
  | "rootIcon"
  | "primary"
  | "primaryDisabled"
  | "secondary"
  | "secondaryDisabled"
  | "ghost"
  | "ghostDisabled"
  | "ghostSecondary"
  | "ghostSecondaryDisabled"
  | "semantic"
  | "semanticDisabled"
  | "startIcon";

export default function HvButton(props: HvButtonProps): JSX.Element | null;
