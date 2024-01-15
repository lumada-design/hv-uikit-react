import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { Fail, Success } from "@hitachivantara/uikit-react-icons";
import withLabels from "../withLabels";
import withDeprecate from "../withDeprecated";
import HvGrid from "../Grid";
import Login from "./Forms/Login";
import Recovery from "./Forms/Recovery";
import defaultBackImage from "./resources/bg.svg";
import styles from "./styles";

const DEFAULT_LABELS = {
  titleText: "Welcome",
  recoveryTitle: "Recover Credentials",
  messageToRecover: "You will receive an email with instructions to recover your credentials",
  messageAfterRecover: "The instructions to recover your credentials were sent.",
  recoveryInputLabel: "Email",
  recoveryPlaceholder: "Enter text",
  recoveryErrorMessage: "The email you've entered doesn't match any account",
  userNameInputLabel: "Username",
  userNamePlaceHolder: "Enter text",
  passwordInputLabel: "Password",
  passwordPlaceHolder: "Enter text",
  rememberMeLabel: "Remember me",
  loginButtonMessage: "Logging",
  loginButtonLabel: "Log in",
  forgotYourCredentialMessage: "Forgot your credentials?",
  emailLabel: "Email",
  emailPlaceholder: "Enter Email",
  cancelButton: "Cancel",
  recoverButton: "Recover",
  recoveringMessage: "Recovering",
  incorrectCredentialsMessage: "Incorrect Username and/or Password. Please try again.",
};

/**
 * Main container for the Login component.
 */
class HvLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      inRecoveryMode: false,
      isLoading: true,
    };
  }

  /**
   * When the component is fully loaded the state is changed
   * indicating that the load is complete and the form can be displayed.
   */
  componentDidMount() {
    this.setState({ isLoading: false });
  }

  /**
   * Function to switch the status inRecoveryMode. This status is used to determine which form
   * should be render (Login or Recover).
   */
  switchForms = () => {
    this.setState((prevState) => ({ inRecoveryMode: !prevState.inRecoveryMode }));
  };

  render() {
    const {
      classes,
      className,
      id,
      login,
      recovery,
      backgroundImage,
      backgroundImageSize,
      logo,
      titleComponent,
      allowRecover,
      allowRememberMe,
      okRecoveryIcon,
      errorLoginIcon,
      labels,
      customMessage,
      formClasses,
      formProps,
    } = this.props;
    const { inRecoveryMode, isLoading } = this.state;
    const backgroundLoginImg = !backgroundImage.length ? defaultBackImage : backgroundImage;

    const form = inRecoveryMode ? (
      <Recovery
        recovery={recovery}
        onClick={this.switchForms}
        okRecoveryIcon={okRecoveryIcon}
        recoveryTitle={labels.recoveryTitle}
        messageToRecover={labels.messageToRecover}
        messageAfterRecover={labels.messageAfterRecover}
        recoveryInputLabel={labels.recoveryInputLabel}
        recoveryPlaceholder={labels.recoveryPlaceholder}
        recoveryErrorMessage={labels.recoveryErrorMessage}
        emailLabel={labels.emailLabel}
        emailPlaceholder={labels.emailPlaceholder}
        cancelButton={labels.cancelButton}
        recoverButton={labels.recoverButton}
        recoveringMessage={labels.recoveringMessage}
      />
    ) : (
      <Login
        login={login}
        titleText={labels.titleText}
        logo={logo}
        titleComponent={titleComponent}
        allowRecover={allowRecover}
        allowRememberMe={allowRememberMe}
        onClick={this.switchForms}
        errorLoginIcon={errorLoginIcon}
        incorrectCredentialsMessage={labels.incorrectCredentialsMessage}
        userNameInputLabel={labels.userNameInputLabel}
        userNamePlaceHolder={labels.userNamePlaceHolder}
        passwordInputLabel={labels.passwordInputLabel}
        passwordPlaceHolder={labels.passwordPlaceHolder}
        rememberMeLabel={labels.rememberMeLabel}
        loginButtonMessage={labels.loginButtonMessage}
        loginButtonLabel={labels.loginButtonLabel}
        forgotYourCredentialMessage={labels.forgotYourCredentialMessage}
        isLoading={isLoading}
        customMessage={customMessage.text}
        classes={formClasses}
        formProps={formProps}
      />
    );

    return (
      <HvGrid
        container
        className={classes.container}
        style={{
          backgroundImage: `url(${backgroundLoginImg})`,
          backgroundSize: `${backgroundImageSize}`,
          margin: 0,
        }}
      >
        <HvGrid item xs={false} sm={false} md={8} lg={8} xl={8} className={classes.panelPosition}>
          <div id={id} className={clsx(classes.root, className)} />
        </HvGrid>
        <HvGrid item xs={12} sm={12} md={5} lg={5} xl={5} className={classes.rightContainer}>
          <div>{form}</div>
        </HvGrid>
      </HvGrid>
    );
  }
}

HvLogin.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * the classes object to be applied into the root object.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component container class.
     */
    container: PropTypes.string,
    /**
     * Styles applied to the right container.
     */
    rightContainer: PropTypes.string,
    /**
     * Styles applied to the grid.
     */
    panelPosition: PropTypes.string,
  }).isRequired,

  /**
   *  the classes object to be applied into the inner form.
   */
  formClasses: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
  }),
  /**
   * the function invoked for the log in
   */
  login: PropTypes.func.isRequired,
  /**
   * the function invoked for the recovery
   */
  recovery: PropTypes.func,
  /**
   * the url for the background image
   */
  backgroundImage: PropTypes.string,
  /**
   * Sizing for background image
   */
  backgroundImageSize: PropTypes.string,
  /**
   * the url for the logo in the welcome message.
   */
  logo: PropTypes.string,
  /**
   * a component to replace the welcome message
   */
  titleComponent: PropTypes.element,
  /**
   * the component should have the recovery capability
   */
  allowRecover: PropTypes.bool,
  /**
   * the component should have the remember me capability
   */
  allowRememberMe: PropTypes.bool,
  /**
   * Icon to be presented when the recovery occurs successfully.
   */
  okRecoveryIcon: PropTypes.element,
  /**
   * Icon to be presented when an error occurs in the login.
   */
  errorLoginIcon: PropTypes.element,
  /**
   * An object containing all the labels for the login.
   */
  labels: PropTypes.shape({
    /**
     * The welcome message.
     */
    titleText: PropTypes.string,
    /**
     * Recovery title.
     */
    recoveryTitle: PropTypes.string,
    /**
     * Message to recover
     */
    messageToRecover: PropTypes.string,
    /**
     * Message shown after recover.
     */
    messageAfterRecover: PropTypes.string,
    /**
     * Recovery input label.
     */
    recoveryInputLabel: PropTypes.string,
    /**
     * Recovery placeholder.
     */
    recoveryPlaceholder: PropTypes.string,
    /**
     * Message shown when an error occurs.
     */
    recoveryErrorMessage: PropTypes.string,
    /**
     * Input user name label.
     */
    userNameInputLabel: PropTypes.string,
    /**
     * Input user name placeholder.
     */
    userNamePlaceHolder: PropTypes.string,
    /**
     * Password label.
     */
    passwordInputLabel: PropTypes.string,
    /**
     * Password placeholder.
     */
    passwordPlaceHolder: PropTypes.string,
    /**
     * Remember me label.
     */
    rememberMeLabel: PropTypes.string,
    /**
     * Login Button message.
     */
    loginButtonMessage: PropTypes.string,
    /**
     * Login button label.
     */
    loginButtonLabel: PropTypes.string,
    /**
     * Forgot your credential message
     */
    forgotYourCredentialMessage: PropTypes.string,
    /**
     * Email Input Label.
     */
    emailLabel: PropTypes.string.isRequired,
    /**
     * Email Input Placeholder.
     */
    emailPlaceholder: PropTypes.string.isRequired,
    /**
     * Cancel button label.
     */
    cancelButton: PropTypes.string.isRequired,
    /**
     * Recover button label.
     */
    recoverButton: PropTypes.string.isRequired,
    /**
     * Message presented while recovering the credentials.
     */
    recoveringMessage: PropTypes.string.isRequired,
    /**
     * Message presented when an error occurs recovering the credentials.
     */
    incorrectCredentialsMessage: PropTypes.string,
  }),
  /**
   * A custom message to be shown in the error area.
   * Will be overridden by any error messages.
   */
  customMessage: PropTypes.shape({
    text: PropTypes.string,
  }),
  /**
   * Additional props for form element
   */
  formProps: PropTypes.instanceOf(Object),
};

HvLogin.defaultProps = {
  className: "",
  id: undefined,
  backgroundImage: "",
  backgroundImageSize: "100%",
  recovery: () => {},
  logo: null,
  titleComponent: null,
  allowRecover: true,
  allowRememberMe: true,
  okRecoveryIcon: <Success semantic="sema1" />,
  errorLoginIcon: <Fail semantic="sema4" />,
  customMessage: {},
  formClasses: null,
  formProps: {},
};

export default withDeprecate(
  withStyles(styles, { name: "HvLogin" })(withLabels(DEFAULT_LABELS)(HvLogin)),
  "Please use the HvLoginContainer component"
);
