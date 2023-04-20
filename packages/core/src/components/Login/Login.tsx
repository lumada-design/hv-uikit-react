import { clsx } from "clsx";
import { HvBaseProps } from "@core/types";
import { StyledFormContainer, StyledRoot } from "./Login.styles";
import loginClasses, { HvLoginClasses } from "./loginClasses";

export type HvLoginProps = HvBaseProps & {
  /**
   *  The path for the background image.
   */
  background?: string;
  /**
   * Class names to be applied.
   */
  classes?: HvLoginClasses;
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
      className={clsx(className, loginClasses.root, classes?.root)}
      style={{
        backgroundImage: background && `url(${background})`,
      }}
      {...others}
    >
      <StyledFormContainer
        className={clsx(loginClasses.formContainer, classes?.formContainer)}
      >
        {children}
      </StyledFormContainer>
    </StyledRoot>
  );
};
