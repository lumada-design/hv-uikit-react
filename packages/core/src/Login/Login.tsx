import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvBaseProps } from "../types/generic";
import { staticClasses, useClasses } from "./Login.styles";

export { staticClasses as loginClasses };

export type HvLoginClasses = ExtractNames<typeof useClasses>;

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
  const {
    id,
    className,
    classes: classesProp,
    children,
    background,
    ...others
  } = useDefaultProps("HvLogin", props);

  const { classes, cx } = useClasses(classesProp);

  return (
    <div
      id={id}
      className={cx(classes.root, className)}
      style={{
        backgroundImage: background && `url(${background})`,
      }}
      {...others}
    >
      <div className={classes.formContainer}>{children}</div>
    </div>
  );
};
