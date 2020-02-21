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
import isNil from "lodash/isNil";
import clsx from "clsx";
import { ListViewContextProvider } from "./ListViewContext/ListViewContext";
import ListViewHeaderRow from "./ListViewHeaderRow";
import Grid from "../../Grid";

const Rows = ({
  renderer,
  values,
  selectedValues,
  viewConfiguration,
  metadata
}) =>
  values.map((value, index) => {
    // eslint-disable-next-line no-param-reassign
    value.checkboxSelected =
      selectedValues && selectedValues.includes(value.id);

    return renderer(value, index, viewConfiguration, metadata);
  });

const ListView = ({
  className,
  id,
  icon,
  viewConfiguration,
  classes,
  renderer,
  values,
  selectedValues,
  cellSpacing,
  metadata,
  ...other
}) => (
  <Grid container justify="center" alignContent="stretch">
    <Grid item xs={4} sm={8} md={12} lg={12} xl={12}>
      <table
        className={clsx(className, classes.root)}
        cellSpacing={cellSpacing}
        id={id}
        {...other}
      >
        {!isNil(viewConfiguration) &&
          !isNil(viewConfiguration.columnConfiguration) &&
          viewConfiguration.columnConfiguration.length > 0 &&
          values.length > 0 && (
            <thead className={classes.tableHead}>
              <ListViewHeaderRow viewConfiguration={viewConfiguration} />
            </thead>
          )}
        <tbody className={classes.tableBody}>
          <ListViewContextProvider value={viewConfiguration}>
            <Rows
              classes={classes}
              renderer={renderer}
              values={values}
              selectedValues={selectedValues}
              metadata={metadata}
              viewConfiguration={viewConfiguration}
            />
          </ListViewContextProvider>
        </tbody>
      </table>
    </Grid>
  </Grid>
);

ListView.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Icon used in the multi button in the assert inventory.
   */
  icon: PropTypes.node.isRequired,
  /**
   * Configuration used to setup various properties of the view.
   * This configuration is propagated to the known childs of the asset inventory through context.
   */
  viewConfiguration: PropTypes.shape({
    onSelection: PropTypes.func,
    isSelectable: PropTypes.bool,
    columnConfiguration: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.String,
        style: PropTypes.instanceOf(Object)
      })
    ),
    maxVisibleActions: PropTypes.number,
    actions: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          icon: PropTypes.func
        })
      )
    ]),
    actionsCallback: PropTypes.func
  }),
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string
  }).isRequired,
  /**
   * The function that will be used to render the list,
   * it receives the values one bye one, is recommended to use
   * the list View cell and list view Row to construct the renderer
   */
  renderer: PropTypes.func.isRequired,
  /**
   * The values that will be passed to the renderer one by one
   */
  values: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  /**
   * Selected values.
   */
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  /**
   * The spacing between the cells correspond to the usual htlm table attribute
   */
  cellSpacing: PropTypes.string,
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
  )
};

ListView.defaultProps = {
  cellSpacing: "0",
  viewConfiguration: null,
  className: "",
  id: "",
  metadata: undefined,
  selectedValues: null
};

export default ListView;
