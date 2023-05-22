import { DropRightXS } from "@hitachivantara/uikit-react-icons";
import { clsx } from "clsx";
import {
  HvButton,
  HvListContainer,
  HvOverflowTooltip,
  NavigationData,
} from "@core/components";
import { StyledListItem } from "./NavigationSlider.styles";
import verticalNavigationSliderClasses, {
  HvVerticalNavigationSliderClasses,
} from "./navigationSliderClasses";

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
}

export const HvVerticalNavigationSlider = ({
  id,
  classes,
  data,
  selected,
  onNavigateToTarget,
  onNavigateToChild,
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
              if (onNavigateToTarget) onNavigateToTarget(event, item);
            }}
            selected={selected === item.id}
            startAdornment={<div>{item.icon}</div>}
            endAdornment={
              item.data && item.data.length > 0 ? (
                <HvButton
                  variant="secondaryGhost"
                  icon
                  onClick={(event) => {
                    if (onNavigateToChild) onNavigateToChild(event, item);
                  }}
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
