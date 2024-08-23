import MuiCardContent, {
  CardContentProps as MuiCardContentProps,
} from "@mui/material/CardContent";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { staticClasses, useClasses } from "./Content.styles";

export { staticClasses as cardContentClasses };

export type HvCardContentClasses = ExtractNames<typeof useClasses>;

export interface HvCardContentProps
  extends Omit<MuiCardContentProps, "classes"> {
  /** The function that will be executed when this section is clicked. */
  onClick?: (event: React.SyntheticEvent) => void;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvCardContentClasses;
}

export const HvCardContent = (props: HvCardContentProps) => {
  const {
    id,
    classes: classesProp,
    className,
    children,
    onClick,
    ...others
  } = useDefaultProps("HvCardContent", props);
  const { classes, cx } = useClasses(classesProp);

  return (
    <MuiCardContent
      id={id}
      className={cx(classes.content, className)}
      onClick={onClick}
      {...others}
    >
      {children}
    </MuiCardContent>
  );
};
