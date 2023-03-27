import { DropRightXS } from "@hitachivantara/uikit-react-icons";
import clsx from "clsx";
import { HvButton, HvListContainer, NavigationData } from "components";
import { StyledListItem } from "./NavigationSlider.styles";
import verticalNavigationSliderClasses, {
  HvVerticalNavigationSliderClasses,
} from "./navigationSliderClasses";

export type HvVerticalNavigationSliderProps = {
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
  data?: NavigationData;
  /**
   * The selected item id.
   */
  selected?: string;
  /**
   * Triggered when the item is clicked.
   */
  onNavigateToTarget?: any;
  /**
   * Triggered when the navigate to child button is clicked.
   */
  onNavigateToChild?: any;
};

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
            onClick={(event) => onNavigateToTarget(event, item)}
            selected={selected === item.id}
            startAdornment={item.icon}
            endAdornment={
              item.data && item.data.length > 0 ? (
                <HvButton
                  variant="secondaryGhost"
                  icon
                  onClick={(event) => onNavigateToChild(event, item)}
                >
                  <DropRightXS />
                </HvButton>
              ) : (
                <div />
              )
            }
          >
            <span>{item.label}</span>
          </StyledListItem>
        ))}
    </HvListContainer>
  );
};
