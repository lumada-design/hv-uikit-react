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

import React, { Component } from "react";
import classnames from "classnames";

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

  applyPage(e) {
    if (e) {
      e.preventDefault();
    }
    const page = this.state.page;
    this.changePage(page === "" ? this.props.page : page);
  }

  render() {
    const defaultButton = ({ className, ...props }) => (
      <div
        className={classnames(classes.paginationBtn, className)}
        {...props}
      />
    );

    const {
      // Computed
      pages,
      // Props
      page,
      classes,
      showPageSizeOptions,
      pageSizeOptions,
      pageSize,
      showPageJump,
      canPrevious,
      canNext,
      onPageSizeChange,
      className,
      PreviousComponent = defaultButton,
      NextComponent = defaultButton,
      FirstPageComponent = defaultButton,
      LastPageComponent = defaultButton
    } = this.props;

    return (
      <div className={classnames(className, classes.paginationContainer)}>
        <div className={classes.pageSizeOptions}>
          {showPageSizeOptions && (
            <span className="select-wrap -pageSizeOptions">
              <select
                className={classes.pageSizeOptionsSelect}
                aria-label={this.props.rowsSelectorText}
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
              <span className={classes.rowText}>rows</span>
            </span>
          )}
        </div>
        <div className={classes.pageNavigator}>
          <FirstPageComponent
            className={
              !canPrevious ? classes.arrowFirstDisabled : classes.arrowFirst
            }
            onClick={() => {
              if (!canPrevious) return;
              this.changePage(0);
            }}
          />
          <PreviousComponent
            className={
              !canPrevious ? classes.arrowLeftDisabled : classes.arrowLeft
            }
            onClick={() => {
              if (!canPrevious) return;
              this.changePage(page - 1);
            }}
            disabled={!canPrevious}
          />
          <span className={classes.pageInfo}>
            {this.props.pageText}
            {" "}
            {showPageJump ? (
              <div className={classes.pageJump}>
                <input
                  className={classes.pageJumpInput}
                  aria-label={this.props.pageJumpText}
                  type="text"
                  onChange={e => {
                    const val = e.target.value;
                    const page = val - 1;
                    if (val === "") {
                      return this.setState({ page: val });
                    }
                    this.setState({ page: this.getSafePage(page) });
                  }}
                  value={this.state.page === "" ? "" : this.state.page + 1}
                  onBlur={this.applyPage}
                  onKeyPress={e => {
                    if (e.which === 13 || e.keyCode === 13) {
                      this.applyPage();
                    }
                  }}
                />
              </div>
            ) : (
              <span className="-currentPage">{page + 1}</span>
            )}
            {" "}
            {this.props.ofText}
            {" "}
            <span className="-totalPages">{pages || 1}</span>
          </span>
          <NextComponent
            className={
              !canNext ? classes.arrowRightDisabled : classes.arrowRight
            }
            onClick={() => {
              if (!canNext) return;
              this.changePage(page + 1);
            }}
          />
          <LastPageComponent
            className={!canNext ? classes.arrowLastDisabled : classes.arrowLast}
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
