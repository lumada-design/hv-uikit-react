import { clsx } from "clsx";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { HvBaseProps } from "@core/types/generic";

import { StyledFormContainer, StyledRoot } from "./Login.styles";
import loginClasses, { HvLoginClasses } from "./loginClasses";

export interface HvLoginProps extends HvBaseProps {
  /**
   *  The path for the background image.
   */
  background?: string;
  /**
   * Class names to be applied.
   */
  classes?: HvLoginClasses;
}

/**
 * Container layout for the login form.
 */
export const HvLogin = (props: HvLoginProps) => {
  const { id, className, classes, children, background, ...others } =
    useDefaultProps("HvLogin", props);

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
