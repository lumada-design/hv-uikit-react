import { DropRightXS } from "@hitachivantara/uikit-react-icons";

import { clsx } from "clsx";

import { HvButton } from "@core/components/Button";
import { HvListContainer } from "@core/components/ListContainer";
import { HvOverflowTooltip } from "@core/components/OverflowTooltip";

import { StyledListItem } from "./NavigationSlider.styles";
import verticalNavigationSliderClasses, {
  HvVerticalNavigationSliderClasses,
} from "./navigationSliderClasses";
import { NavigationData } from "../VerticalNavigationContext";

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

export const HvVerticalNavigationSlider = ({
  id,
  classes,
  data,
  selected,
  onNavigateToTarget,
  onNavigateToChild,
  forwardButtonAriaLabel = "Navigate to submenu",
}: HvVerticalNavigationSliderProps) => {
  return (
    <HvListContainer interactive id={id}>
      {data &&
        data.map((item) => (
          <StyledListItem
            key={item.id}
            classes={{
              root: classes?.root,
              selected: clsx(
                classes?.listItemSelected,
                verticalNavigationSliderClasses.listItemSelected
              ),
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
          </StyledListItem>
        ))}
    </HvListContainer>
  );
};
