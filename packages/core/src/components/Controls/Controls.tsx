import clsx from "clsx";
import { HvBaseProps, HvExtraProps } from "../../types";
import { StyledRoot, StyledSection } from "./Controls.styles";
import { controlsClasses, HvControlsClasses } from ".";
import { HvButton, HvMultiButton } from "components";
import { setId } from "utils";
import { useControlled } from "hooks";
import { HvControlsContextProvider } from "./context/ControlsContext";
import { Children } from "react";
import { HvTableInstance } from "components/Table/hooks/useTable";

export type HvControlsViewConfiguration = {
  id?: string;
  label?: string;
  icon?: React.ReactNode;
} & HvExtraProps;

export type HvControlsProps = HvBaseProps & {
  /**
   * An instance of useHvTable or useTable used to manage the data
   * if this is not provided data sorting and search must be handled externally
   */
  callbacks?: Pick<HvTableInstance, "setSortBy" | "setGlobalFilter">;
  /**
   * Views configuration required for the view buttons
   */
  views?: HvControlsViewConfiguration[];
  /**
   * What view is selected by default
   */
  defaultView?: string;
  /**
   * Sets the selected view to be the one specified
   * if specified the component is in a controlled state and it won't change it state
   * unless specified externally
   */
  selectedView?: string;
  /**
   * Callback called when the view switcher button is pressed
   */
  onViewChange?: (event: Event, id: string) => void;
  /**
   * if `true` the button to switch views is not rendered
   */
  hideViewSwitcher?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvControlsClasses;
};

export const HvControls = ({
  id,
  className,
  classes,
  views,
  callbacks,
  selectedView,
  defaultView,
  children,
  hideViewSwitcher = false,
  onViewChange,
}: HvControlsProps) => {
  const [currentView, setCurrentView] = useControlled(
    selectedView,
    defaultView
  );

  const onViewChangeHandler = (evt, btnId) => {
    setCurrentView(btnId);
    onViewChange?.(evt, btnId);
  };

  const onSearchHandler = (value) => callbacks?.setGlobalFilter(value);
  const onSortHandler = (value) =>
    callbacks?.setSortBy([
      {
        id: value?.accessor,
        desc: value?.desc,
      },
    ]);

  const childrenCount = Children.count(children);
  const childrenArray = Children.toArray(children);

  const childrenIndexCut =
    childrenCount > 0 ? Math.round(childrenCount * 0.5) : 0;
  const leftChildren = childrenArray.slice(0, childrenIndexCut);
  const rightChildren = childrenArray.slice(
    childrenIndexCut,
    childrenCount || 0
  );

  return (
    <StyledRoot
      id={id}
      className={clsx(className, controlsClasses.root, classes?.root)}
    >
      <HvControlsContextProvider
        value={{
          onSearch: onSearchHandler,
          onSort: onSortHandler,
        }}
      >
        <StyledSection
          className={clsx(
            classes?.section,
            controlsClasses.section,
            classes?.leftSection,
            controlsClasses.leftSection
          )}
        >
          {leftChildren}
        </StyledSection>
        <StyledSection
          className={clsx(
            classes?.section,
            controlsClasses.section,
            classes?.rightSection,
            controlsClasses.rightSection
          )}
        >
          {rightChildren}
          {views && !hideViewSwitcher && views?.length > 0 && (
            <HvMultiButton id={setId(id, "view-multi-button")}>
              {views.map(({ id: btnId, icon, ...others }) => (
                <HvButton
                  id={btnId}
                  key={btnId}
                  icon
                  selected={currentView === btnId}
                  onClick={(evt) => onViewChangeHandler(evt, btnId)}
                  {...others}
                >
                  {icon}
                </HvButton>
              ))}
            </HvMultiButton>
          )}
        </StyledSection>
      </HvControlsContextProvider>
    </StyledRoot>
  );
};
