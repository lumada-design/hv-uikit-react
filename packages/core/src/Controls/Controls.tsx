import { Children, MouseEvent } from "react";

import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { HvBaseProps, HvExtraProps } from "@core/types/generic";
import { HvButton } from "@core/Button";
import { HvMultiButton } from "@core/MultiButton";
import { setId } from "@core/utils/setId";
import { useControlled } from "@core/hooks/useControlled";
import { HvTableInstance } from "@core/Table/hooks/useTable";
import { ExtractNames } from "@core/utils/classes";

import { HvControlsContextProvider } from "./context/ControlsContext";
import { staticClasses, useClasses } from "./Controls.styles";

export { staticClasses as controlsClasses };

export type HvControlsClasses = ExtractNames<typeof useClasses>;

export interface HvControlsViewConfiguration extends HvExtraProps {
  id?: string;
  label?: string;
  icon?: React.ReactNode;
}

export interface HvControlsProps extends HvBaseProps {
  /**
   * An instance of useHvTable or useTable used to manage the data
   * if this is not provided data sorting and search must be handled externally
   */
  callbacks?: {
    setSortBy?: HvTableInstance["setSortBy"];
    setGlobalFilter?: HvTableInstance["setGlobalFilter"];
  };
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
  onViewChange?: (event: MouseEvent<HTMLButtonElement>, id: string) => void;
  /**
   * if `true` the button to switch views is not rendered
   */
  hideViewSwitcher?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvControlsClasses;
}

export const HvControls = (props: HvControlsProps) => {
  const {
    id,
    className,
    classes: classesProp,
    views,
    callbacks,
    selectedView,
    defaultView,
    children,
    hideViewSwitcher = false,
    onViewChange,
  } = useDefaultProps("HvControls", props);

  const { classes, cx } = useClasses(classesProp);

  const [currentView, setCurrentView] = useControlled(
    selectedView,
    defaultView
  );

  const onViewChangeHandler = (
    evt: MouseEvent<HTMLButtonElement>,
    btnId: any
  ) => {
    setCurrentView(btnId);
    onViewChange?.(evt, btnId);
  };

  const onSearchHandler = (value: any) => callbacks?.setGlobalFilter?.(value);
  const onSortHandler = (value: any) =>
    callbacks?.setSortBy?.([
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
    <div id={id} className={cx(classes.root, className)}>
      <HvControlsContextProvider
        value={{
          onSearch: onSearchHandler,
          onSort: onSortHandler,
        }}
      >
        <div className={cx(classes.section, classes.leftSection)}>
          {leftChildren}
        </div>
        <div className={cx(classes.section, classes.rightSection)}>
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
        </div>
      </HvControlsContextProvider>
    </div>
  );
};
