import MuiCardMedia, {
  CardMediaProps as MuiCardMediaProps,
} from "@mui/material/CardMedia";
import { styles } from "./Media.styles";
import { HvBaseProps } from "@core/types";
import cardMediaClasses, { HvCardMediaClasses } from "./mediaClasses";
import { ImgHTMLAttributes } from "react";
import { ClassNames } from "@emotion/react";

export interface HvCardMediaProps
  extends Omit<MuiCardMediaProps, "classes">,
    ImgHTMLAttributes<HTMLDivElement>,
    HvBaseProps<HTMLDivElement, "onClick" | "title"> {
  /** Id to be applied to the root node. */
  id?: string;
  /** The title of the media. */
  title?: string;
  /** The function that will be executed when this section is clicked. */
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  /** The component used for the root node. Either a string to use a HTML element or a component. */
  component?: React.ElementType;
  /** The image to display. */
  image?: string;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvCardMediaClasses;
}

export const HvCardMedia = ({
  id,
  classes,
  className,
  children,
  title,
  onClick,
  ...others
}: HvCardMediaProps) => {
  return (
    <ClassNames>
      {({ css, cx }) => (
        <MuiCardMedia
          id={id}
          classes={{
            root: cx(cardMediaClasses.root, css(styles.root), classes?.root),
            media: cx(cardMediaClasses.media, classes?.media),
          }}
          className={className}
          role="img"
          title={title}
          onClick={onClick}
          {...others}
        >
          {children}
        </MuiCardMedia>
      )}
    </ClassNames>
  );
};
