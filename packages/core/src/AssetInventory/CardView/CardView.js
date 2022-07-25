import React, { useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import Card from "../../Card";
import Grid from "../../Grid";
import Focus from "../../Focus";
import styles from "./styles";
import setActionsId from "../setActionsId";

import useWidth from "../../utils/useWidth";
import { setId } from "../../utils/setId";

const DEFAULT_VIEW_CONFIGURATION = {
  onSelection: null,
  breakpoints: {
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
  },
  actions: null,
};

const CardRenderChooser =
  (viewConfiguration, render, cardContent, metadata, cardProps) => (data) => {
    const actions = setActionsId(viewConfiguration.actions, data.id);

    return render ? (
      render(data, { ...viewConfiguration, actions }, metadata, cardProps)
    ) : (
      <Card
        {...data}
        onChange={viewConfiguration.onSelection}
        actions={actions}
        isSelectable={viewConfiguration.isSelectable}
        actionsCallback={viewConfiguration.actionsCallback}
        maxVisibleActions={viewConfiguration.maxVisibleActions}
        innerCardContent={cardContent?.(data)}
        {...cardProps}
      />
    );
  };

const CardView = ({
  id = "",
  className,
  classes,
  icon,
  values,
  selectedValues,
  renderer,
  viewConfiguration = DEFAULT_VIEW_CONFIGURATION,
  innerCardContent,
  metadata,
  emptyComponent,
  ...others
}) => {
  const containerRef = useRef(null);
  const currentBreakpoint = useWidth();

  // If no custom render is passed, the render uses the standard card implementation
  const renderCard = CardRenderChooser(
    viewConfiguration,
    renderer,
    innerCardContent,
    metadata,
    others
  );

  const { breakpoints } = viewConfiguration;

  const cardJump = () =>
    breakpoints[currentBreakpoint] === false ? 1 : 12 / breakpoints[currentBreakpoint];

  /**
   * Render of the cards for each value.
   */
  const renderCards = () => {
    return values.map((value, index) => {
      // eslint-disable-next-line no-param-reassign
      value.checked = !!(selectedValues && selectedValues.indexOf(value.id) > -1);

      return (
        <Grid id={setId(value.id, "grid")} key={value.id} item {...breakpoints}>
          <Focus
            rootRef={containerRef}
            key={value.id}
            strategy="grid"
            filterClass="grid"
            navigationJump={cardJump()}
            focusDisabled={false}
          >
            <div key={value.id} tabIndex={index === 0 ? 0 : -1}>
              {renderCard(value)}
            </div>
          </Focus>
        </Grid>
      );
    });
  };

  const hasValues = values.length > 0;

  return (
    <>
      {!hasValues && emptyComponent}
      {hasValues && (
        <div className={classes.root} ref={containerRef}>
          <div className={classes.elements}>
            <Grid
              className={clsx(className, classes.root)}
              id={id}
              container
              justify="flex-start"
              alignItems="flex-start"
              spacing={4}
            >
              {renderCards()}
            </Grid>
          </div>
        </div>
      )}
    </>
  );
};

const sizeProps = [true, false, "auto", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

CardView.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component that contains the elements class.
     */
    elements: PropTypes.string,
  }).isRequired,
  /**
   * Icon used in the multi button in the assert inventory.
   */
  icon: PropTypes.node.isRequired,
  /**
   * Metadata associated with the values.
   */
  metadata: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      accessor: PropTypes.string,
      cellType: PropTypes.oneOf(["alpha-numeric", "numeric", "date", "node"]),
      sortable: PropTypes.bool,
      sortFunction: PropTypes.func,
      searchable: PropTypes.bool,
      searchFunction: PropTypes.func,
    })
  ),
  /**
   * Values to be passed to the card render.
   */
  values: PropTypes.instanceOf(Array).isRequired,
  /**
   * Selected values.
   */
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  /**
   * Custom render for the cards.
   */
  renderer: PropTypes.func,
  /**
   * innerCardContent to be passed to the standard render.
   */
  innerCardContent: PropTypes.func,
  /**
   * Component to the present when no data is available.
   */
  emptyComponent: PropTypes.node,
  /**
   * Configuration settings for the view.
   */
  viewConfiguration: PropTypes.shape({
    /**
     * Callback evoked in the selection of the card.
     */
    onSelection: PropTypes.func,
    /**
     * Defines if the view allows selections.
     */
    isSelectable: PropTypes.bool,
    /**
     * List of actions to be passed to the cards.
     */
    actions: PropTypes.instanceOf(Array),
    /**
     *  The callback function ran when an action is triggered, receiving ´action´ as param
     */
    actionsCallback: PropTypes.func,
    /**
     *  The number of maximum visible actions before they're collapsed into a ´DropDownMenu´.
     */
    maxVisibleActions: PropTypes.number,
    /**
     * Defines the number of columns the component is going to use. Check the
     * Grid component for possible values
     */
    breakpoints: PropTypes.shape({
      xs: PropTypes.oneOf(sizeProps),
      sm: PropTypes.oneOf(sizeProps),
      md: PropTypes.oneOf(sizeProps),
      lg: PropTypes.oneOf(sizeProps),
      xl: PropTypes.oneOf(sizeProps),
    }),
  }),
};

export default withStyles(styles, { name: "HvCardView" })(CardView);
