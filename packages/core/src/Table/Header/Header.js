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

/* eslint-disable */
import React from "react";

import HvTypography from "../../Typography";
import Sort from "@hv/uikit-react-icons/dist/DawnTheme/Sort.XS";
import classNames from "classnames";
import _ from "lodash";
import SortDesc from "@hv/uikit-react-icons/dist/SortDescending.XS";
import SortAsc from "@hv/uikit-react-icons/dist/SortAscending.XS";

/**
 *
 * Returns the corresponding icon for the type of sorting (ascending or descending).
 *
 * @param id - the used to find the column.
 * @param columnSortable - if the column is sortable or not
 * @param sort - the list of sorted columns
 * @returns {*} - 'false' if the column doesn't exist.
 */
const getSortedComponent = (id, columnSortable, sort) => {
  const sortInfo = sort.filter(item => item.id === id);

  if (sortInfo.length) {
    return sortInfo[0].desc === true ? <SortDesc /> : <SortAsc />;
  }

  if (columnSortable) {
    return <Sort />;
  }

  return false;
};

const Header = React.memo(
  ({
    classes,
    column: { id, sortable, cellType, headerText },
    tableSortable,
    sort
  }) => {
    const columnSortable = (_.isNil(sortable) && tableSortable) || sortable;
    return (
      <div className={classNames(classes.headerContainer)}>
        {columnSortable && (
          <div
            className={classNames(classes.rtSortIcon, {
              [classes.rtSortIconNumeric]: cellType === "numeric"
            })}
          >
            {getSortedComponent(id, columnSortable, sort)}
          </div>
        )}
        {/* Setter of the styles for the header */}
        <div
          className={classNames(classes.headerTextContainer, {
            [classes.headerSortable]: columnSortable,
            [classes.headerNotSortable]: !columnSortable
          })}
        >
          <HvTypography
            variant="highlightText"
            className={classNames(classes.headerProps, {
              [classes.headerAlphaNumeric]:
                cellType === "alpha-numeric" || cellType === "link",
              [classes.headerNumeric]: cellType === "numeric"
            })}
          >
            {headerText}
          </HvTypography>
        </div>
      </div>
    );
  }
);

export default Header;
