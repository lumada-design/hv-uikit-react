/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import PropTypes from "prop-types";
import Card from "../../Card";
import Grid from "../../Grid";

/**
 * Definition of which render should be used.
 *
 * @param viewConfiguration
 * @param Render
 * @returns {function(*, *): *}
 * @constructor
 */
const CardRenderChooser = (
  viewConfiguration,
  render,
  innerCardContent,
  metadata
) => {
  if (render) {
    return data => render(data, viewConfiguration, metadata);
  }
  return (data, others) => (
    <Card
      {...data}
      onChange={viewConfiguration.onSelection}
      actions={viewConfiguration.actions}
      isSelectable={viewConfiguration.isSelectable}
      actionsCallback={viewConfiguration.actionsCallback}
      maxVisibleActions={viewConfiguration.maxVisibleActions}
      innerCardContent={innerCardContent ? innerCardContent(data) : undefined}
      {...others}
    />
  );
};

/**
 * Card container component.
 *
 * @param id
 * @param className
 * @param classes
 * @param values
 * @param render
 * @param viewConfiguration
 * @param others
 * @returns {*}
 * @constructor
 */
const CardView = ({
  id,
  className,
  classes,
  icon,
  values,
  selectedValues,
  renderer,
  viewConfiguration,
  innerCardContent,
  metadata,
  ...others
}) => {
  // If no custom render is passed, the render uses the standard card implementation
  const cardRender = CardRenderChooser(
    viewConfiguration,
    renderer,
    innerCardContent,
    metadata
  );

  const { breakpoints } = viewConfiguration;

  /**
   * Render of the cards for each value.
   */
  const renderCards = values.map(value => {
    if (selectedValues && selectedValues.indexOf(value.id) > -1) {
      // eslint-disable-next-line no-param-reassign
      value.checkboxSelected = true;
    } else {
      // eslint-disable-next-line no-param-reassign
      value.checkboxSelected = false;
    }
    return (
      <Grid
        id={value.id}
        key={value.id}
        item
        xs={breakpoints.xs}
        sm={breakpoints.sm}
        md={breakpoints.md}
        lg={breakpoints.lg}
        xl={breakpoints.xl}
      >
        {cardRender(value, others)}
      </Grid>
    );
  });

  return (
    <div className={classes.root}>
      <Grid
        id={id}
        container
        className={className}
        justify="flex-start"
        alignItems="flex-start"
        spacing={30}
        {...others}
      >
        {renderCards}
      </Grid>
    </div>
  );
};

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
    gridContainer: PropTypes.string
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
      xs: PropTypes.oneOf([
        "false",
        "auto",
        "true",
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]),
      sm: PropTypes.oneOf([
        "false",
        "auto",
        "true",
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]),
      md: PropTypes.oneOf([
        "false",
        "auto",
        "true",
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]),
      lg: PropTypes.oneOf([
        "false",
        "auto",
        "true",
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]),
      xl: PropTypes.oneOf([
        "false",
        "auto",
        "true",
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ])
    })
  })
};

CardView.defaultProps = {
  className: "",
  id: "",
  selectedValues: null,
  renderer: undefined,
  innerCardContent: undefined,
  metadata: undefined,
  viewConfiguration: {
    onSelection: null,
    breakpoints: {
      xs: "false",
      sm: "false",
      md: "false",
      lg: "false",
      xl: "false"
    },
    actions: null
  }
};

export default CardView;
