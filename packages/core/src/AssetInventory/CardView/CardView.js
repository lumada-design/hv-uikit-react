import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import Card from "../../Card";
import Grid from "../../Grid";
import Focus from "../../Focus";
import styles from "./styles";
import GridViewContainer from "../GridViewContainer";
import setActionsId from "../setActionsId";

import useWidth from "../../utils/useWidth";

const CardRenderChooser = (viewConfiguration, render, innerCardContent, metadata, cardProps) => {
  if (render) {
    return data =>
      render(
        data,
        { ...viewConfiguration, actions: setActionsId(viewConfiguration.actions, data.id) },
        metadata,
        cardProps
      );
  }
  return data => (
    <Card
      {...data}
      onChange={viewConfiguration.onSelection}
      actions={setActionsId(viewConfiguration.actions, data.id)}
      isSelectable={viewConfiguration.isSelectable}
      actionsCallback={viewConfiguration.actionsCallback}
      maxVisibleActions={viewConfiguration.maxVisibleActions}
      innerCardContent={innerCardContent ? innerCardContent(data) : undefined}
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
  viewConfiguration = {
    onSelection: null,
    breakpoints: {
      xs: false,
      sm: false,
      md: false,
      lg: false,
      xl: false
    },
    actions: null
  },
  innerCardContent,
  metadata,
  ...others
}) => {
  // If no custom render is passed, the render uses the standard card implementation
  const cardRender = CardRenderChooser(
    viewConfiguration,
    renderer,
    innerCardContent,
    metadata,
    others
  );

  const { breakpoints } = viewConfiguration;

  const currentBreakpoint = useWidth();
  const cardJump = () =>
    breakpoints[currentBreakpoint] === false ? 1 : 12 / breakpoints[currentBreakpoint];

  /**
   * Render of the cards for each value.
   */
  const renderCards = containerRef => {
    return values.map((value, index) => {
      if (selectedValues && selectedValues.indexOf(value.id) > -1) {
        // eslint-disable-next-line no-param-reassign
        value.checked = true;
      } else {
        // eslint-disable-next-line no-param-reassign
        value.checked = false;
      }
      return (
        <Grid
          role="gridcell"
          className="li"
          id={value.id}
          key={value.id}
          item
          xs={breakpoints.xs}
          sm={breakpoints.sm}
          md={breakpoints.md}
          lg={breakpoints.lg}
          xl={breakpoints.xl}
        >
          <Focus
            rootRef={containerRef}
            key={value.id}
            strategy="grid"
            filterClass="grid"
            navigationJump={cardJump()}
            focusDisabled={false}
          >
            <div key={value.id} tabIndex={index === 0 ? 0 : -1}>
              {cardRender(value, others)}
            </div>
          </Focus>
        </Grid>
      );
    });
  };

  const cardAmount = values.length;
  const rowCount = breakpoints[currentBreakpoint] === false ? -1 : breakpoints[currentBreakpoint];
  const colCount = rowCount === -1 ? 1 : Math.ceil(cardAmount / rowCount);

  const GridDisplay = containerRef => (
    <Grid
      className={clsx(className, classes.root)}
      id={id}
      container
      justify="flex-start"
      alignItems="flex-start"
      spacing={4}
      role="grid"
      aria-rowcount={rowCount}
      aria-colcount={colCount}
    >
      {renderCards(containerRef)}
    </Grid>
  );

  return <GridViewContainer elements={GridDisplay} />;
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
    root: PropTypes.string
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
      searchFunction: PropTypes.func
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
      xl: PropTypes.oneOf(sizeProps)
    })
  })
};

export default withStyles(styles, { name: "HvCardView" })(CardView);
