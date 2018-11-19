import React, { Component } from "react";
import classnames from "classnames";

import Icons from "../Images/PaginationIcons.svg";

// TODO: Extract Icon as a component?
const Icon = ({ name, color, size, stroke }) => (
  <svg
    className={`icon icon-${name}`}
    fill={color}
    width={size}
    height={size}
    stroke={stroke}
  >
    <use xlinkHref={`${Icons}#icon-${name}`} />
  </svg>
);

const defaultButton = ({ className, name, disabled, ...props }) => (
  <div className={className} {...props}>
    <Icon
      name={name}
      color={disabled ? "#999" : "#414141"}
      stroke={disabled ? "#999" : "#414141"}
      size={32}
    />
  </div>
);

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
            className={classes.paginationBtn}
            name="first"
            onClick={() => {
              if (!canPrevious) return;
              this.changePage(0);
            }}
            disabled={!canPrevious}
          />
          <PreviousComponent
            className={classes.paginationBtn}
            name="arrow-left"
            onClick={() => {
              if (!canPrevious) return;
              this.changePage(page - 1);
            }}
            disabled={!canPrevious}
          />
          <span className={classes.pageInfo}>
            {this.props.pageText}{" "}
            {showPageJump ? (
              <div className={classes.pageJump}>
                <input
                  className={classes.pageJumpInput}
                  aria-label={this.props.pageJumpText}
                  type={this.state.page === "" ? "text" : "number"}
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
            )}{" "}
            {this.props.ofText}{" "}
            <span className="-totalPages">{pages || 1}</span>
          </span>
          <NextComponent
            className={classes.paginationBtn}
            name="arrow-right"
            onClick={() => {
              if (!canNext) return;
              this.changePage(page + 1);
            }}
            disabled={!canNext}
          />
          <LastPageComponent
            className={classes.paginationBtn}
            name="last"
            onClick={() => {
              if (!canNext) return;
              this.changePage(pages - 1);
            }}
            disabled={!canNext}
          />
        </div>
      </div>
    );
  }
}
