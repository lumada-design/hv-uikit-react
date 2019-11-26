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

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import Down from "@hv/uikit-react-icons/dist/Generic/DropDownXS";
import ArrowFirst from "@hv/uikit-react-icons/dist/Generic/Start";
import ArrowLeft from "@hv/uikit-react-icons/dist/Generic/Backwards";
import ArrowRight from "@hv/uikit-react-icons/dist/Generic/Forwards";
import ArrowLast from "@hv/uikit-react-icons/dist/Generic/End";
import {
  KeyboardCodes as Codes,
  isKeypress
} from "@hv/uikit-common-utils/dist/KeyboardUtils";
import HvTypography from "../Typography";
import HvInput from "../Input";

const Pagination = ({
  theme,
  classes,
  className,
  pages,
  page,
  showPageSizeOptions,
  pageSizeOptions,
  pageSize,
  showPageJump,
  canPrevious,
  canNext,
  onPageChange,
  onPageSizeChange,
  labels
}) => {
  const [statePage, setStatePage] = useState(page);
  const computedLabels = { ...Pagination.defaultProps.labels, ...labels };

  const getSafePage = inPage =>
    Number.isNaN(inPage) ? page : Math.min(Math.max(inPage, 0), pages - 1);

  const changePage = inPage => {
    const outPage = getSafePage(inPage);
    setStatePage(outPage);

    if (page !== outPage) {
      onPageChange(outPage);
    }
  };

  const applyPage = () => {
    changePage(statePage === "" ? page : statePage);
  };

  useEffect(() => {
    if (page !== statePage || page >= pages) {
      changePage(page);
    }
  }, [page, pageSize]);

  const disabledColors = [theme.hv.palette.atmosphere.atmo7];

  return (
    <div className={classnames(className, classes.root)}>
      <div className={classes.pageSizeOptions}>
        {showPageSizeOptions && (
          <>
            <HvTypography component="span" variant="sText">
              {computedLabels.pageSizePrev}
            </HvTypography>
            <select
              disabled={pageSize === 0}
              className={classes.pageSizeOptionsSelect}
              aria-label={computedLabels.pageSizeSelectorDescription}
              onChange={e => onPageSizeChange(Number(e.target.value))}
              value={pageSize}
            >
              {pageSizeOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <Down className={classes.selectDownIcon} />
            <HvTypography component="span" variant="sText">
              {computedLabels.pageSizeEntryName}
            </HvTypography>
          </>
        )}
      </div>
      <div className={classes.pageNavigator}>
        <IconButton
          className={classes.iconContainer}
          disabled={!canPrevious}
          onClick={() => changePage(0)}
        >
          <ArrowFirst
            className={classes.icon}
            color={!canPrevious ? disabledColors : null}
          />
        </IconButton>
        <IconButton
          className={classes.iconContainer}
          disabled={!canPrevious}
          onClick={() => changePage(statePage - 1)}
        >
          <ArrowLeft
            className={classes.icon}
            color={!canPrevious ? disabledColors : null}
          />
        </IconButton>
        <div className={classes.pageInfo}>
          {showPageJump ? (
            <div className={classes.pageJump}>
              <HvInput
                labels={computedLabels}
                classes={{
                  input: classes.pageSizeInput,
                  inputRoot: classes.pageSizeInputRoot,
                  container: classes.pageSizeInputContainer
                }}
                onChange={val => setStatePage(val === "" ? val : val - 1)}
                initialValue={`${statePage + 1}`}
                inputValue={`${statePage === "" ? "" : Number(statePage) + 1}`}
                onBlur={applyPage}
                onKeyDown={e => isKeypress(e, Codes.Enter) && applyPage()}
                validationIconVisible={false}
                disabled={pageSize === 0}
                disableClear
              />
            </div>
          ) : (
            <HvTypography component="span" variant="sText">
              {`${statePage + 1}`}
            </HvTypography>
          )}
          <HvTypography component="span" variant="sText">
            {` ${computedLabels.pagesSeparator} `}
          </HvTypography>
          <HvTypography component="span" variant="sText">
            {pages || 1}
          </HvTypography>
        </div>
        <IconButton
          className={classes.iconContainer}
          disabled={!canNext}
          onClick={() => changePage(statePage + 1)}
        >
          <ArrowRight
            className={classes.icon}
            color={!canNext ? disabledColors : null}
          />
        </IconButton>
        <IconButton
          className={classes.iconContainer}
          disabled={!canNext}
          onClick={() => changePage(pages - 1)}
        >
          <ArrowLast
            className={classes.icon}
            color={!canNext ? disabledColors : null}
          />
        </IconButton>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object).isRequired,
  /**
   * A JSS Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /*
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /*
     * Styles applied to the page size selector container.
     */
    pageSizeOptions: PropTypes.string,
    /*
     * Styles applied to the page size selector dropdown element.
     */
    pageSizeOptionsSelect: PropTypes.string,
    /*
     * Styles applied to the page navigation container.
     */
    pageNavigator: PropTypes.string,
    /*
     * Styles applied to the central page information container.
     */
    pageInfo: PropTypes.string,
    /*
     * Styles applied to the page selector input container.
     */
    pageJump: PropTypes.string,
    /*
     * Styles passed down to the page selector Input component as `input`.
     */
    pageSizeInput: PropTypes.string,
    /*
     * Styles passed down to the page selector Input component as `inputRoot` .
     */
    pageSizeInputRoot: PropTypes.string,
    /*
     * Styles passed down to the page selector Input component as `container`.
     */
    pageSizeInputContainer: PropTypes.string,
    /*
     * Styles applied to each navigation `IconButton` icon container.
     */
    iconContainer: PropTypes.string,
    /*
     * Styles applied to each navigation icon.
     */
    icon: PropTypes.string,
    /*
     * Styles applied to the page size dropdown icon.
     */
    selectDownIcon: PropTypes.string
  }).isRequired,
  /*
   * The number of pages the component has.
   */
  pages: PropTypes.number,
  /*
   * The currently selected page (0-indexed).
   */
  page: PropTypes.number,
  /**
   * Controls whether the left page size mechanism should be visible.
   */
  showPageSizeOptions: PropTypes.bool,
  /**
   * The array of possible page sizes for the dropdown.
   */
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  /**
   * The currently selected page size.
   */
  pageSize: PropTypes.number,
  /**
   * Controls whether the central page changing mechanism should be visible.
   */
  showPageJump: PropTypes.bool,
  /**
   * Controls whether the previous/first page buttons are enabled.
   */
  canPrevious: PropTypes.bool,
  /**
   * Controls whether the next/last page buttons are enabled.
   */
  canNext: PropTypes.bool,
  /**
   * Function called when the page changes.
   */
  onPageChange: PropTypes.func,
  /**
   * Function called when the page size changes.
   */
  onPageSizeChange: PropTypes.func,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * An object containing all the labels for the component.
   *
   */
  labels: PropTypes.shape({
    pageSizePrev: PropTypes.string,
    pageSizeEntryName: PropTypes.string,
    pageSizeSelectorDescription: PropTypes.string,
    pagesSeparator: PropTypes.string,
    pagesIndeterminate: PropTypes.string
  })
};

Pagination.defaultProps = {
  pages: 1,
  page: 0,
  showPageSizeOptions: true,
  pageSizeOptions: [5, 10, 20, 25, 50, 100],
  pageSize: 1,
  showPageJump: true,
  canPrevious: false,
  canNext: false,
  onPageChange() {},
  onPageSizeChange() {},
  className: "",
  labels: {
    pageSizePrev: "Show",
    pageSizeEntryName: "rows",
    pageSizeSelectorDescription: "Select how many to display",
    pagesSeparator: "of",
    pagesIndeterminate: "Many"
  }
};

export default Pagination;
