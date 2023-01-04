import { StyledMedia } from "./Media.styles";
import { HvBaseProps } from "types";

export type MediaProps = HvBaseProps<HTMLDivElement, { onClick; title }> & {
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
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: {
    root?: string;
    media?: string;
  };
};

export const Media = ({
  id,
  classes,
  className,
  children,
  title,
  onClick,
  ...others
}: MediaProps) => {
  return (
    <StyledMedia
      id={id}
      classes={{ root: classes?.root, media: classes?.media }}
      className={className}
      role="img"
      title={title}
      onClick={onClick}
      {...others}
    >
      {children}
    </StyledMedia>
  );
};
