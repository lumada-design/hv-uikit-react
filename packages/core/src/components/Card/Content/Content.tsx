import clsx from "clsx";
import { HvBaseProps } from "../../../types";
import { styles } from "./Content.styles";
import MuiCardContent, {
  CardContentProps as MuiCardContentProps,
} from "@mui/material/CardContent";
import cardContentClasses, { HvCardContentClasses } from "./contentClasses";

export type HvContentProps = Omit<MuiCardContentProps, "classes"> &
  HvBaseProps & {
    /** Id to be applied to the root node. */
    id?: string;
    /** The function that will be executed when this section is clicked. */
    onClick?: (event: React.SyntheticEvent) => void;
    /** A Jss Object used to override or extend the styles applied to the component. */
    classes?: HvCardContentClasses;
  };

export const HvContent = ({
  id,
  classes,
  className,
  children,
  onClick,
  ...others
}: HvContentProps) => {
  return (
    <MuiCardContent
      id={id}
      className={clsx(
        styles.content,
        classes?.content,
        cardContentClasses.content,
        className
      )}
      onClick={onClick}
      {...others}
    >
      {children}
    </MuiCardContent>
  );
};
