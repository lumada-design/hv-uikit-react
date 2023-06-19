import { HvBaseProps } from "@core/types";
import MuiCardContent, {
  CardContentProps as MuiCardContentProps,
} from "@mui/material/CardContent";
import { ExtractNames } from "@core/utils";
import { staticClasses, useClasses } from "./Content.styles";

export { staticClasses as cardContentClasses };

export type HvCardContentClasses = ExtractNames<typeof useClasses>;

export interface HvCardContentProps
  extends Omit<MuiCardContentProps, "classes">,
    HvBaseProps {
  /** Id to be applied to the root node. */
  id?: string;
  /** The function that will be executed when this section is clicked. */
  onClick?: (event: React.SyntheticEvent) => void;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvCardContentClasses;
}

export const HvCardContent = ({
  id,
  classes: classesProp,
  className,
  children,
  onClick,
  ...others
}: HvCardContentProps) => {
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
