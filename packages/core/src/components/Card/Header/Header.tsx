import MuiCardHeader, {
  CardHeaderProps as MuiCardHeaderProps,
} from "@mui/material/CardHeader";

import { HvBaseProps } from "@core/types/generic";
import { useTheme } from "@core/hooks/useTheme";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./Header.styles";

export { staticClasses as cardHeaderClasses };

export type HvCardHeaderClasses = ExtractNames<typeof useClasses>;

export interface HvCardHeaderProps
  extends Omit<MuiCardHeaderProps, "classes">,
    HvBaseProps<HTMLDivElement, "title"> {
  /** The renderable content inside the title slot of the header. */
  title: React.ReactNode;
  /** The renderable content inside the subheader slot of the header. */
  subheader?: React.ReactNode;
  /** The renderable content inside the icon slot of the header. */
  icon?: React.ReactNode;
  /** The function that will be executed when this section is clicked. */
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvCardHeaderClasses;
}

export const HvCardHeader = ({
  classes: classesProp,
  className,
  title,
  subheader,
  icon,
  onClick,
  ...others
}: HvCardHeaderProps) => {
  const { activeTheme } = useTheme();
  const { classes, css, cx } = useClasses(classesProp);

  return (
    <MuiCardHeader
      title={title}
      subheader={subheader}
      action={icon}
      onClick={onClick}
      className={cx(classes.root, className)}
      classes={{
        title: cx(
          css({
            ...activeTheme?.typography[activeTheme?.card.titleVariant],
          }),
          {
            [classes.titleShort]: icon,
            [classes.title]: !icon,
          }
        ),
        subheader: cx(
          css({
            ...activeTheme?.typography[activeTheme?.card.subheaderVariant],
            color: activeTheme?.card.subheaderColor,
          }),
          classes.subheader
        ),
        action: classes.action,
        content: classes.content,
      }}
      {...others}
    />
  );
};
