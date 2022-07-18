import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import { useControlled, HvMultiButton, HvButton, setId } from "@hitachivantara/uikit-react-core";
import { HvControlsContextProvider } from "./context/ControlsContext";
import styleCreator from "./styles";

/** Controls it's a group of features used to control data that can be rendered using different views (table, cards, list). */
const HvControls = ({
  id,
  views,
  classes,
  className,
  callbacks,
  selectedView,
  defaultView,
  children,
  hideViewSwitcher = false,
  onViewChange,
}) => {
  const [currentView, setCurrentView] = useControlled(selectedView, defaultView);

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
  const childrenIndexCut = children?.length > 0 ? Math.round(children.length * 0.5) : 0;
  const leftChildren = children.slice(0, childrenIndexCut);
  const rightChildren = children.slice(childrenIndexCut, children?.length || 0);
  return (
    <div id={id} className={clsx(className, classes.root)}>
      <HvControlsContextProvider
        value={{
          onSearch: onSearchHandler,
          onSort: onSortHandler,
        }}
      >
        <div className={clsx(classes.section, classes.leftSection)}>{leftChildren}</div>
        <div className={clsx(classes.section, classes.rightSection)}>
          {rightChildren}
          {!hideViewSwitcher && views?.length > 0 && (
            <HvMultiButton id={setId(id, "view-multi-button")}>
              {views?.map(({ id: btnId, icon, ...others }) => (
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

HvControls.propTypes = {
  /** Children to be rendered. */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Children elements to be rendered
   */
  children: PropTypes.node,
  /**
   * An instance of useHvTable or useTable used to manage the data
   * if this is not provided data sorting and search must be handled externally
   */
  callbacks: PropTypes.shape({
    /**
     * Callback used by the .
     */
    setSortBy: PropTypes.func,
    /**
     * Callback used by the search input to filter data across all fields
     */
    setGlobalFilter: PropTypes.func,
  }),
  /**
   * Views configuration required for the view buttons
   */
  views: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.node,
      id: PropTypes.string,
    })
  ),
  /**
   * the classes object to be applied into the root object.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component.
     */
    root: PropTypes.string,
    /**
     * Right box of the controls
     */
    rightSection: PropTypes.string,
    /**
     * Left box of the controls
     */
    leftSection: PropTypes.string,
    /**
     * common styles for left and right controls
     */
    section: PropTypes.string,
  }).isRequired,
  /**
   * What view is selected by default
   */
  defaultView: PropTypes.string,
  /**
   * Sets the selected view to be the one specified
   * if specified the component is in a controlled state and it won't change it state
   * unless specified externally
   */
  selectedView: PropTypes.string,
  /**
   * Callback called when the view switcher button is pressed
   */
  onViewChange: PropTypes.func,
  /**
   * if `true` the button to switch views is not rendered
   */
  hideViewSwitcher: PropTypes.bool,
};

export default withStyles(styleCreator, { name: "HvControls", withTheme: true })(HvControls);
