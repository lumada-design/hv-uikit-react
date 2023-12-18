import { DropRightXS } from "@hitachivantara/uikit-react-icons";

import { HvButton } from "@core/components/Button";
import { HvListContainer, HvListItem } from "@core/components/ListContainer";
import { HvOverflowTooltip } from "@core/components/OverflowTooltip";

import { ExtractNames } from "@core/utils/classes";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { NavigationData } from "../VerticalNavigationContext";

import { staticClasses, useClasses } from "./NavigationSlider.styles";

export { staticClasses as verticalNavigationSliderClasses };

export type HvVerticalNavigationSliderClasses = ExtractNames<typeof useClasses>;

export interface HvVerticalNavigationSliderProps {
  /**
   * Id to be applied to the root node of the panel.
   */
  id?: string;
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes?: HvVerticalNavigationSliderClasses;
  /**
   * An array containing the data for each menu item.
   *
   * id - the id to be applied to the root element.
   * label - the label to be rendered on the menu item.
   * icon - the icon react element
   * data - sub-menu items
   * href - the url used for navigation.
   * target - the behavior when opening an url.
   */
  data?: NavigationData[];
  /**
   * The selected item id.
   */
  selected?: string;
  /**
   * Triggered when the item is clicked.
   */
  onNavigateToTarget?: (
    event: React.MouseEvent<HTMLLIElement>,
    item: NavigationData
  ) => void;
  /**
   * Triggered when the navigate to child button is clicked.
   */
  onNavigateToChild?: (
    event: React.MouseEvent<HTMLButtonElement>,
    item: NavigationData
  ) => void;
  /** Aria label to apply to the navigate to submenu button on the list items. */
  forwardButtonAriaLabel?: string;
}

export const HvVerticalNavigationSlider = (
  props: HvVerticalNavigationSliderProps
) => {
  const {
    id,
    classes: classesProp,
    data,
    selected,
    onNavigateToTarget,
    onNavigateToChild,
    forwardButtonAriaLabel = "Navigate to submenu",
  } = useDefaultProps("HvVerticalNavigationSlider", props);
  const { classes } = useClasses(classesProp);

  return (
    <HvListContainer interactive id={id}>
      {data &&
        data.map((item) => (
          <HvListItem
            key={item.id}
            classes={{
              root: classes.root,
              selected: classes.listItemSelected,
              focus: classes.listItemFocus,
            }}
            onClick={(event) => {
              onNavigateToTarget?.(event, item);
            }}
            aria-label={item.label}
            aria-current={
              selected === item.id ? (item.href ? "page" : true) : undefined
            }
            selected={selected === item.id}
            startAdornment={item.icon ? <div>{item.icon}</div> : undefined}
            endAdornment={
              item.data && item.data.length > 0 ? (
                <HvButton
                  icon
                  onClick={(event) => {
                    onNavigateToChild?.(event, item);
                  }}
                  aria-label={forwardButtonAriaLabel}
                >
                  <DropRightXS />
                </HvButton>
              ) : undefined
            }
          >
            <HvOverflowTooltip data={item.label} />
          </HvListItem>
        ))}
    </HvListContainer>
  );
};
