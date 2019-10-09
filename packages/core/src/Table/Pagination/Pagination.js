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

/* TODO: Review this file, copied from external location */

/* eslint-disable */

import React, { Component } from "react";
import classnames from "classnames";
import Down from "@hv/uikit-react-icons/dist/Generic/DropDownXS";
import ArrowFirst from "@hv/uikit-react-icons/dist/Generic/Start";
import ArrowLeft from "@hv/uikit-react-icons/dist/Generic/Backwards";
import ArrowRight from "@hv/uikit-react-icons/dist/Generic/Forwards";
import ArrowLast from "@hv/uikit-react-icons/dist/Generic/End";
import HvTypography from "../../Typography";
import HvInput from "../../Input";

export default class ReactTablePagination extends Component {
  constructor(props) {
    super();

    this.getSafePage = this.getSafePage.bind(this);
    this.changePage = this.changePage.bind(this);
    this.applyPage = this.applyPage.bind(this);

    this.state = {
      page: props.page
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.page !== nextProps.page) {
      this.setState({ page: nextProps.page });
    }
  }

  getSafePage(page) {
    if (Number.isNaN(page)) {
      page = this.props.page;
    }
    return Math.min(Math.max(page, 0), this.props.pages - 1);
  }

  changePage(page) {
    page = this.getSafePage(page);
    this.setState({ page });
    if (this.props.page !== page) {
      this.props.onPageChange(page);
    }
  }

  applyPage() {
    const page = this.state.page;
    this.changePage(page === "" ? this.props.page : page);
  }

  render() {
    const { page: statePage } = this.state;
    
    const {
      // Computed
      pages,
      // Props
      page,
      theme,
      classes,
      showPageSizeOptions,
      pageSizeOptions,
      pageSize,
      showPageJump,
      canPrevious,
      canNext,
      onPageSizeChange,
      className,
      rowsSelectorText,
      ofText,
    } = this.props;

    return (
      <div className={classnames(className, classes.paginationContainer)}>
        <div className={classes.pageSizeOptions}>
          {showPageSizeOptions && (
            <span className="select-wrap -pageSizeOptions">
              <HvTypography component="span" variant="sText">
                Show
              </HvTypography>
              <select
                disabled={pageSize === 0}
                className={classes.pageSizeOptionsSelect}
                aria-label={rowsSelectorText}
                onChange={e => onPageSizeChange(Number(e.target.value))}
                value={pageSize}
              >
                {pageSizeOptions.map((option, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <option key={i} value={option}>
                    {`${option}`}
                  </option>
                ))}
              </select>
              <span>
                <Down className={classes.selectDownIcon}/>
              </span>
              <HvTypography component="span" variant="sText">
                rows
              </HvTypography>
            </span>
          )}
        </div>
        <div className={classes.pageNavigator}>
          <ArrowFirst
            className={classnames(
              classes.iconContainer,
              canPrevious && classes.arrowEnabled
            )}
            color={
              !canPrevious ? [theme.hv.palette.atmosphere.atmo7] : undefined
            }
            disabled={!canPrevious}
            onClick={() => {
              if (!canPrevious) return;
              this.changePage(0);
            }}
          />
          <ArrowLeft
            className={classnames(
              classes.iconContainer,
              canPrevious && classes.arrowEnabled
            )}
            color={
              !canPrevious ? [theme.hv.palette.atmosphere.atmo7] : undefined
            }
            disabled={!canPrevious}
            onClick={() => {
              if (!canPrevious) return;
              this.changePage(page - 1);
            }}
          />
          <span className={classes.pageInfo}>
            {showPageJump ? (
              <div className={classes.pageJump}>
                <HvInput
                  labels={{}}
                  classes={{
                    input: classes.pageSizeInput,
                    container: classes.pageSizeInputContainer,
                    iconClear: classes.pageSizeInputIconClear
                  }}
                  onChange={val => {
                    const page = val - 1;
                    if (val === "") {
                      return this.setState({ page: val });
                    }
                    this.setState({ page: this.getSafePage(page) });
                  }}
                  initialValue={`${statePage + 1}`}
                  inputValue={`${
                    statePage === "" ? "" : Number(statePage) + 1
                  }`}
                  onBlur={this.applyPage}
                  onKeyPress={e => {
                    if (e.which === 13 || e.keyCode === 13) {
                      this.applyPage();
                    }
                  }}
                  validationIconVisible={false}
                  disabled={pageSize === 0}
                  disableClear
                />
              </div>
            ) : (
              <HvTypography component="span" variant="sText">{`${page +
                1}`}</HvTypography>
            )}
            <HvTypography
              component="span"
              variant="sText"
            >{`${ofText} `}</HvTypography>
            <HvTypography component="span" variant="sText">
              {pages || 1}
            </HvTypography>
          </span>
          <ArrowRight
            className={classnames(
              classes.iconContainer,
              canNext && classes.arrowEnabled
            )}
            color={
              !canNext ? [theme.hv.palette.atmosphere.atmo7] : undefined
            }
            disabled={!canNext}
            onClick={() => {
              if (!canNext) return;
              this.changePage(page + 1);
            }}
          />
          <ArrowLast
            className={classnames(
              classes.iconContainer,
              canNext && classes.arrowEnabled
            )}
            color={
              !canNext ? [theme.hv.palette.atmosphere.atmo7] : undefined
            }
            disabled={!canNext}
            onClick={() => {
              if (!canNext) return;
              this.changePage(pages - 1);
            }}
          />
        </div>
      </div>
    );
  }
}
