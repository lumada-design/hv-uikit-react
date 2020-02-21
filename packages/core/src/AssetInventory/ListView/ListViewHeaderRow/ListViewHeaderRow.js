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
import clsx from "clsx";
import isNil from "lodash/isNil";
import HvTypography from "../../../Typography";

const HeaderCells = (classes, columnConfiguration) =>
  columnConfiguration.map((configuration, index) => {
    const alignConf =
      !isNil(configuration) && !isNil(configuration.align)
        ? configuration.align
        : undefined;

    const keyIndex = `th${index}`;

    return (
      <th
        className={clsx(classes.headCell, {
          [classes[configuration.spacing]]: configuration.spacing
        })}
        style={{ ...configuration.style }}
        align={alignConf}
        id={index}
        key={keyIndex}
      >
        <HvTypography variant="labelText">{configuration.title}</HvTypography>
      </th>
    );
  });

const ListViewHeaderRow = ({
  viewConfiguration,
  classes,
  id,
  align,
  className,
  ...other
}) => {
  const { columnConfiguration } = viewConfiguration;

  return (
    <tr
      className={clsx(className, classes.root, {
        [classes.selectable]: viewConfiguration.isSelectable,
        [classes.notSelectable]: !viewConfiguration.isSelectable
      })}
      id={id}
      {...other}
    >
      {viewConfiguration.isSelectable && <th />}
      {HeaderCells(classes, columnConfiguration)}
    </tr>
  );
};

ListViewHeaderRow.propTypes = {
  /**
   * alignment of the header it correspond to the htlm tag
   */
  align: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * This value is provided by the asset inventory list view and contains the styling from the.
   */
  viewConfiguration: PropTypes.instanceOf(Object),
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the assetinventorylistview root class.
     */
    root: PropTypes.string
  }).isRequired
};

ListViewHeaderRow.defaultProps = {
  className: "",
  id: "",
  align: "center",
  viewConfiguration: null
};

export default ListViewHeaderRow;
