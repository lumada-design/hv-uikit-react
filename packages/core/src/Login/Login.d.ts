import * as React from "react";
import { StandardProps } from "@material-ui/core";

interface LoginLabelsProp {
  /**
   * The welcome message
   */
  titleText?: string;
  /**
   * Recovery title
   */
  recoveryTitle?: string;
  /**
   * Message to recover
   */
  messageToRecover?: string;
  /**
   * Message shown after recover
   */
  messageAfterRecover?: string;
  /**
   * Recovery input label
   */
  recoveryInputLabel?: string;
  /**
   * Recovery placeholder
   */
  recoveryPlaceholder?: string;
  /**
   * Message shown when an error occurs
   */
  recoveryErrorMessage?: string;
  /**
   * Input user name label
   */
  userNameInputLabel?: string;
  /**
   * Input user name placeholder
   */
  userNamePlaceHolder?: string;
  /**
   * Password label
   */
  passwordInputLabel?: string;
  /**
   * Password placeholder.
   */
  passwordPlaceHolder?: string;
  /**
   * Remember Me Label Text
   */
  rememberMeLabel?: string;
  /**
   * The Login Button Message
   */
  loginButtonMessage?: string;
  /**
   * The Login Button Label
   */
  loginButtonLabel?: string;
  /**
   * Forget your Credentials Message
   */
  forgotYourCredentialMessage?: string;
  /**
   * Email Input Label
   */
  emailLabel: string;
  /**
   * Email Input Placeholder
   */
  emailPlaceholder: string;
  /**
   * Cancel Button Label
   */
  cancelButton: string;
  /**
   * Recover Button Label
   */
  recoverButton: string;
  /**
   * Password Recovery Message.
   */
  recoveringMessage: string;
  /**
   *  Incorrect Credentials Message
   */
  incorrectCredentialsMessage?: string;
}

export interface LoginProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvLoginClassKey> {
  /**
   *  the classes object to be applied into the inner form.
   */
  formClasses?: {
    /**
     * Styles applied to the component root class.
     */
    root?: string;
  };
  /**
   * the function invoked for the log in
   */
  login: (credentials: { username: string; password: string }) => Promise<any>;
  /**
   * the function invoked for the recovery
   */
  recovery?: (credential: { email: string }) => Promise<any>;
  /**
   * the url for the background image (CSS style prop).
   */
  backgroundImage?: string;
  /**
   * Sizing for background image (CSS style prop).
   */
  backgroundImageSize?: string;
  /**
   * the url for the logo in the welcome message.
   */
  logo?: string;
  /**
   * a component to replace the welcome message
   */
  titleComponent?: React.ReactNode;
  /**
   * the component should have the recovery capability
   */
  allowRecover?: boolean;
  /**
   * the component should have the remember me capability
   */
  allowRememberMe?: boolean;
  /**
   * Icon to be presented when the recovery occurs successfully.
   */
  okRecoveryIcon?: React.ReactNode;
  /**
   * Icon to be presented when an error occurs in the login.
   */
  errorLoginIcon?: React.ReactNode;
  /**
   * The object that contains the different labels inside the kpi.
   */
  labels?: LoginLabelsProp;
  /**
   * A custom message to be shown in the error area.
   * Will be overridden by any error messages.
   */
  customMessage?: {
    text: string;
  };
}

export type HvLoginClassKey = "container" | "rightContainer" | "panelPosition";

export default function HvTooltip(props: LoginProps): JSX.Element | null;
