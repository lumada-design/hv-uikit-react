import { HvBaseProps } from "@core/types";
import { styles } from "./Content.styles";
import MuiCardContent, {
  CardContentProps as MuiCardContentProps,
} from "@mui/material/CardContent";
import cardContentClasses, { HvCardContentClasses } from "./contentClasses";
import { ClassNames } from "@emotion/react";

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
  classes,
  className,
  children,
  onClick,
  ...others
}: HvCardContentProps) => {
  return (
    <ClassNames>
      {({ css, cx }) => (
        <MuiCardContent
          id={id}
          className={cx(
            cardContentClasses.content,
            css(styles.content),
            className,
            classes?.content
          )}
          onClick={onClick}
          {...others}
        >
          {children}
        </MuiCardContent>
      )}
    </ClassNames>
  );
};
