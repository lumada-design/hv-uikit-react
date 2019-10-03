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
import classnames from "classnames";
import { ListViewContextProvider } from "./ListViewContext/ListViewContext";
import ListViewHeaderRow from "./ListViewHeaderRow";

const Rows = ({ renderer, values }) => values.map(value => renderer(value));

const ListView = ({
  className,
  id,
  viewConfiguration,
  classes,
  renderer,
  values,
  cellSpacing,
  ...other
}) => (
  <table
    className={classnames(className, classes.root)}
    cellSpacing={cellSpacing}
    id={id}
    {...other}
  >
    {!isNil(viewConfiguration) &&
      !isNil(viewConfiguration.columnConfiguration) &&
      viewConfiguration.columnConfiguration.length > 0 && (
        <thead className={classes.tableHead}>
          <ListViewHeaderRow viewConfiguration={viewConfiguration} />
        </thead>
      )}
    <tbody className={classes.tableBody}>
      <ListViewContextProvider value={viewConfiguration}>
        <Rows classes={classes} renderer={renderer} values={values} />
      </ListViewContextProvider>
    </tbody>
  </table>
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
   * The spacing between the cells correspond to the usual htlm table attribute
   */
  cellSpacing: PropTypes.string
};

ListView.defaultProps = {
  cellSpacing: "0",
  viewConfiguration: null,
  className: "",
  id: ""
};

export default ListView;
