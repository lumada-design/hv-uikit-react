import clsx from "clsx";
import { CardHeaderProps as MuiCardHeaderProps } from "@mui/material/CardHeader";
import { HvBaseProps } from "../../../types";
import { StyledHeader } from "./Header.styles";

export type HvHeaderProps = MuiCardHeaderProps &
  HvBaseProps<HTMLDivElement, { title }> & {
    /** The renderable content inside the title slot of the header. */
    title: React.ReactNode;
    /** The renderable content inside the subheader slot of the header. */
    subheader?: React.ReactNode;
    /** The renderable content inside the icon slot of the header. */
    icon?: React.ReactNode;
    /** The function that will be executed when this section is clicked. */
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
    /** A Jss Object used to override or extend the styles applied to the empty state component. */
    classes?: {
      root?: string;
      title?: string;
      titleShort?: string;
      subheader?: string;
      action?: string;
      content?: string;
    };
  };

export const HvHeader = ({
  classes,
  className,
  title,
  subheader,
  icon,
  onClick,
  ...others
}: HvHeaderProps) => {
  return (
    <StyledHeader
      title={title}
      subheader={subheader}
      action={icon}
      onClick={onClick}
      className={clsx(classes?.root, className)}
      $short={icon ? true : undefined}
      classes={{
        title: icon ? classes?.titleShort : classes?.title,
        subheader: classes?.subheader,
        action: classes?.action,
        content: classes?.content,
      }}
      {...others}
    />
  );
};
