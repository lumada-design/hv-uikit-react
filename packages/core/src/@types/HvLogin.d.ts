declare module "@hv/uikit-react-core/dist" {
  export class HvLogin extends React.Component<HvLoginProps, any> {}

  export interface LoginInfo {
    username: string;
    password: string;
  }

  export interface LoginLabel {
    titleText?: string;
    recoveryTitle?: string;
    messageToRecover?: string;
    messageAfterRecover?: string;
    recoveryInputLabel?: string;
    recoveryPlaceholder?: string;
    recoveryErrorMessage?: string;
    userNameInputLabel?: string;
    userNamePlaceHolder?: string;
    passwordInputLabel?: string;
    passwordPlaceHolder?: string;
    rememberMeLabel?: string;
    loginButtonMessage?: string;
    loginButtonLabel?: string;
    forgotYourCredentialMessage?: string;
    emailLabel: string;
    emailPlaceholder: string;
    cancelButton: string;
    recoverButton: string;
    recoveringMessage: string;
    incorrectCredentialsMessage?: string;
  }

  export interface HvLoginProps extends React.HTMLAttributes<HvLogin> {
    /**
     * the classes object to be applied into the root object.
     */
    classes?: {
      /**
       * Styles applied to the component root class.
       */
      root?: string;
      /**
       * Styles applied to the right container.
       */
      rightContainer?: string;
      /**
       * Styles applied to the form, inside the right container.
       */
      formContainer?: string;
    };

    /**
     * the function invoked for the log in
     */
    login: (info: LoginInfo) => any;

    /**
     * the function invoked for the recovery
     */
    recovery?: (...args: any[]) => any;

    /**
     * the url for the background image
     */
    backgroundImage?: string;

    /**
     * Sizing for background image
     */
    backgroundImageSize?: string;

    /**
     * the welcome message.
     * @deprecated Instead use the labels property
     */
    titleText?: string;

    /**
     * the url for the logo in the welcome message.
     */
    logo?: string;

    /**
     * a component to replace the welcome message
     */
    titleComponent?: React.ReactElement;

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
    okRecoveryIcon?: React.ReactElement;

    /**
     * Icon to be presented when an error occurs in the login.
     */
    errorLoginIcon?: React.ReactElement;

    /**
     *  Incorrect Credentials Message.
     */
    incorrectCredentialsMessage?: string;

    /**
     * The object that contains the different labels inside the kpi.
     *
     * - titleText: The welcome message.
     * - recoveryTitle: Recovery title.
     * - messageToRecover: Message to recover
     * - messageAfterRecover: Message shown after recover.
     * - recoveryInputLabel: Recovery input label.
     * - recoveryPlaceholder: Recovery placeholder.
     * - recoveryErrorMessage: Message shown when an error occurs.
     * - userNameInputLabel: Input user name label.
     * - userNamePlaceHolder: Input user name placeholder.
     * - passwordInputLabel: Password label.
     * - passwordPlaceHolder: Password placeholder.
     * - rememberMeLabel: Remember me label.
     * - incorrectCredentialsMessage: Incorrect Credentials Message
     */
    labels?: LoginLabel;

    /**
     * Recovery title.
     * @deprecated Instead use the labels property
     */
    recoveryTitle?: string;

    /**
     * Message to recover.
     * @deprecated Instead use the labels property
     */
    messageToRecover?: string;

    /**
     * Message shown after recover.
     * @deprecated Instead use the labels property
     */
    messageAfterRecover?: string;

    /**
     * Recovery input label.
     * @deprecated Instead use the labels property
     */
    recoveryInputLabel?: string;

    /**
     * Recovery placeholder.
     * @deprecated Instead use the labels property
     */
    recoveryPlaceholder?: string;

    /**
     * Message shown when an error occurs.
     * @deprecated Instead use the labels property
     */
    recoveryErrorMessage?: string;

    /**
     * Input user name label.
     * @deprecated Instead use the labels property
     */
    userNameInputLabel?: string;

    /**
     * Input user name placeholder.
     * @deprecated Instead use the labels property
     */
    userNamePlaceHolder?: string;

    /**
     * Password label.
     * @deprecated Instead use the labels property
     */
    passwordInputLabel?: string;

    /**
     * Password placeholder.
     * @deprecated Instead use the labels property
     */
    passwordPlaceHolder?: string;

    /**
     * Remember me label.
     * @deprecated Instead use the labels property
     */
    rememberMeLabel?: string;
  }
}
