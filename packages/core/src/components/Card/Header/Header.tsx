import MuiCardHeader, {
  CardHeaderProps as MuiCardHeaderProps,
} from "@mui/material/CardHeader";
import { HvBaseProps } from "@core/types";
import { useTheme } from "@core/hooks";
import { ClassNames } from "@emotion/react";
import cardHeaderClasses, { HvCardHeaderClasses } from "./headerClasses";
import { styles } from "./Header.styles";

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
      {({ css, cx }) => (
        <MuiCardHeader
          title={title}
          subheader={subheader}
          action={icon}
          onClick={onClick}
          className={cx(
            cardHeaderClasses.root,
            css(styles.root),
            className,
            classes?.root
          )}
          classes={{
            title: icon
              ? cx(
                  cardHeaderClasses.titleShort,
                  css(styles.titleShort),
                  css({
                    ...activeTheme?.typography[activeTheme?.card.titleVariant],
                  }),
                  classes?.titleShort
                )
              : cx(
                  cardHeaderClasses.title,
                  css(styles.title),
                  css({
                    ...activeTheme?.typography[activeTheme?.card.titleVariant],
                  }),
                  classes?.title
                ),
            subheader: cx(
              cardHeaderClasses.subheader,
              css(styles.subheader),
              css({
                ...activeTheme?.typography[activeTheme?.card.subheaderVariant],
                color: activeTheme?.card.subheaderColor,
              }),
              classes?.subheader
            ),
            action: cx(
              cardHeaderClasses.action,
              css(styles.action),
              classes?.action
            ),
            content: cx(cardHeaderClasses.content, classes?.content),
          }}
          {...others}
        />
      )}
    </ClassNames>
  );
};
