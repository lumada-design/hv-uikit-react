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
import classNames from "classnames";
import Card from "../../Card";
import Grid from "../../Grid";
import { ViewContextProvider } from "./ViewContext";

/**
 * Definition of which render should be used.
 *
 * @param viewConfiguration
 * @param Render
 * @returns {function(*, *): *}
 * @constructor
 */
const CardRenderChooser = (viewConfiguration, render) => {
  if (render) {
    return data => (
      <ViewContextProvider value={viewConfiguration}>
        {render(data)}
      </ViewContextProvider>
    );
  }
  return (data, others) => (
    <Card
      {...data}
      onChange={viewConfiguration.onSelection}
      actions={viewConfiguration.actions}
      isSelectable={viewConfiguration.isSelectable}
      actionsCallback={viewConfiguration.actionsCallback}
      maxVisibleActions={viewConfiguration.maxVisibleActions}
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
  values,
  renderer,
  viewConfiguration,
  ...others
}) => {
  // If no custom render is passed, the render uses the standard card implementation
  const cardRender = CardRenderChooser(viewConfiguration, renderer);

  const { breakpoints } = viewConfiguration;

  /**
   * Render of the cards for each value.
   */
  const renderCards = values.map(value => (
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
  ));

  return (
    <Grid
      id={id}
      container
      className={classNames(className, classes.gridContainer)}
      justify="center"
      alignItems="center"
      spacing={30}
      {...others}
    >
      {renderCards}
    </Grid>
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
   * Values to be passed to the card render.
   */
  values: PropTypes.instanceOf(Array).isRequired,
  /**
   * Custom render for the cards.
   */
  renderer: PropTypes.func,
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
  renderer: undefined,
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
