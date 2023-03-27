import clsx from "clsx";
import MuiCardHeader, {
  CardHeaderProps as MuiCardHeaderProps,
} from "@mui/material/CardHeader";
import { HvBaseProps } from "../../../types/generic";
import cardHeaderClasses, { HvCardHeaderClasses } from "./headerClasses";
import { createClasses } from "./Header.styles";
import { useTheme } from "hooks/useTheme";
import { useCreateEmotion } from "hooks/useCreateEmotion";

export type HvCardHeaderProps = Omit<MuiCardHeaderProps, "classes"> &
  HvBaseProps<HTMLDivElement, { title }> & {
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
  };

export const HvCardHeader = ({
  classes,
  className,
  title,
  subheader,
  icon,
  onClick,
  ...others
}: HvCardHeaderProps) => {
  const { activeTheme } = useTheme();
  const { css } = useCreateEmotion();
  const styles = createClasses(css);

  return (
    <MuiCardHeader
      title={title}
      subheader={subheader}
      action={icon}
      onClick={onClick}
      className={clsx(
        styles.root,
        classes?.root,
        cardHeaderClasses.root,
        className
      )}
      classes={{
        title: icon
          ? clsx(
              styles.titleShort,
              cardHeaderClasses.titleShort,
              classes?.titleShort,
              css({
                ...activeTheme?.typography[activeTheme?.card.titleVariant],
              })
            )
          : clsx(
              styles.title,
              cardHeaderClasses.title,
              classes?.title,
              css({
                ...activeTheme?.typography[activeTheme?.card.titleVariant],
              })
            ),
        subheader: clsx(
          styles.subheader,
          cardHeaderClasses.subheader,
          classes?.subheader,
          css({
            ...activeTheme?.typography[activeTheme?.card.subheaderVariant],
            color: activeTheme?.card.subheaderColor,
          })
        ),
        action: clsx(styles.action, cardHeaderClasses.action, classes?.action),
        content: clsx(cardHeaderClasses.content, classes?.content),
      }}
      {...others}
    />
  );
};
