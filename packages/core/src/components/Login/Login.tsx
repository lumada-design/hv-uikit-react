import clsx from "clsx";
import { HvBaseProps } from "../../types";
import { StyledFormContainer, StyledRoot } from "./Login.styles";

export type HvLoginProps = HvBaseProps & {
  /**
   *  The path for the background image.
   */
  background?: string;
  /**
   * Class names to be applied.
   */
  classes?: {
    /**
     * Styles applied to root.
     */
    root?: string;
    /**
     * Styles applied to the form container.
     */
    formContainer?: string;
  };
};

/**
 * Container layout for the login form.
 */
export const HvLogin = ({
  id,
  className,
  classes,
  children,
  background,
  ...others
}: HvLoginProps) => {
  return (
    <StyledRoot
      id={id}
      className={clsx(className, classes?.root)}
      style={{
        backgroundImage: background && `url(${background})`,
      }}
      {...others}
    >
      <StyledFormContainer className={classes?.formContainer}>
        {children}
      </StyledFormContainer>
    </StyledRoot>
  );
};
