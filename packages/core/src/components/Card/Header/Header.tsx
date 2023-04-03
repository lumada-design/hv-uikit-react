import clsx from "clsx";
import MuiCardHeader, {
  CardHeaderProps as MuiCardHeaderProps,
} from "@mui/material/CardHeader";
import { HvBaseProps } from "../../../types/generic";
import cardHeaderClasses, { HvCardHeaderClasses } from "./headerClasses";
import { styles } from "./Header.styles";
import { useTheme } from "hooks";
import { ClassNames } from "@emotion/react";

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

  return (
    <ClassNames>
      {({ css }) => (
        <MuiCardHeader
          title={title}
          subheader={subheader}
          action={icon}
          onClick={onClick}
          className={clsx(
            css(styles.root),
            classes?.root,
            cardHeaderClasses.root,
            className
          )}
          classes={{
            title: icon
              ? clsx(
                  css(styles.titleShort),
                  cardHeaderClasses.titleShort,
                  classes?.titleShort,
                  css({
                    ...activeTheme?.typography[activeTheme?.card.titleVariant],
                  })
                )
              : clsx(
                  css(styles.title),
                  cardHeaderClasses.title,
                  classes?.title,
                  css({
                    ...activeTheme?.typography[activeTheme?.card.titleVariant],
                  })
                ),
            subheader: clsx(
              css(styles.subheader),
              cardHeaderClasses.subheader,
              classes?.subheader,
              css({
                ...activeTheme?.typography[activeTheme?.card.subheaderVariant],
                color: activeTheme?.card.subheaderColor,
              })
            ),
            action: clsx(
              css(styles.action),
              cardHeaderClasses.action,
              classes?.action
            ),
            content: clsx(cardHeaderClasses.content, classes?.content),
          }}
          {...others}
        />
      )}
    </ClassNames>
  );
};
