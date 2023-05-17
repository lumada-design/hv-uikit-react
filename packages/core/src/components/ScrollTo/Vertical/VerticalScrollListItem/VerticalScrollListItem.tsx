import { HvBaseProps } from "@core/types";
import verticalScrollListItemClasses, {
  HvVerticalScrollListItemClasses,
} from "./verticalScrollListItemClasses";
import { ClassNames } from "@emotion/react";
import { styles } from "./VerticalScrollListItem.styles";
import { HvTypographyProps } from "@core/components";
import { setId } from "@core/utils";
import { useCallback } from "react";
import { CurrentStep } from "@hitachivantara/uikit-react-icons";
import { useTheme } from "@core/hooks";

export interface HvVerticalScrollListItemProps extends HvBaseProps {
  /** A function component that renders a typography wrapped with a tooltip. */
  tooltipWrapper: React.FunctionComponent<{
    id?: string;
    className?: string;
    variant?: HvTypographyProps["variant"];
    children?: React.ReactNode;
  }>;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvVerticalScrollListItemClasses;
  /** Whether the element is selected. */
  selected?: boolean;
  /** The function to be executed when the element is clicked. */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** The function to be executed when the element is clicked. */
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

/**
 * HvVerticalScrollListItem a focusable item to be used as part of the vertical scroll
 */
export const HvVerticalScrollListItem = ({
  id,
  className,
  classes,
  selected,
  "aria-label": ariaLabel,
  onClick,
  onKeyDown,
  tooltipWrapper,
  ...others
}: HvVerticalScrollListItemProps) => {
  const { activeTheme } = useTheme();

  const variant: HvTypographyProps["variant"] = selected ? "label" : "body";

  const labelId = setId(id, "label");

  const buttonId = setId(id, "button");

  const Tooltip = tooltipWrapper;

  const NotSelected = useCallback(() => {
    return (
      <ClassNames>
        {({ css, cx }) => (
          <div
            className={cx(
              verticalScrollListItemClasses.notSelected,
              css(styles.notSelected),
              classes?.notSelected
            )}
          />
        )}
      </ClassNames>
    );
  }, [classes?.notSelected]);

  const icon = selected ? (
    <CurrentStep
      height={activeTheme?.scrollTo.dotSelectedSize}
      width={activeTheme?.scrollTo.dotSelectedSize}
    />
  ) : (
    <NotSelected />
  );

  return (
    <ClassNames>
      {({ css, cx }) => (
        <li
          id={id}
          className={cx(
            verticalScrollListItemClasses.root,
            css(styles.root),
            className,
            classes?.root
          )}
          aria-current={selected}
        >
          <div
            id={buttonId}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={onKeyDown}
            className={cx(
              verticalScrollListItemClasses.button,
              css(styles.button),
              classes?.button
            )}
            aria-label={ariaLabel}
            aria-labelledby={labelId}
            {...others}
          >
            <Tooltip
              id={labelId}
              className={cx(
                verticalScrollListItemClasses.text,
                css(styles.text),
                classes?.text
              )}
              variant={variant}
            >
              {icon}
            </Tooltip>
          </div>
        </li>
      )}
    </ClassNames>
  );
};
