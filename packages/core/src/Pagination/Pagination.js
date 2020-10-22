import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { Start, End, Backwards, Forwards } from "@hv/uikit-react-icons";
import { isKeypress, KeyboardCodes } from "../utils/KeyboardUtils";
import { HvInput, HvTypography } from "..";
import { setId, useLabels } from "../utils";
import ButtonIconTooltip from "./ButtonIconTooltip";
import Select, { Option } from "./Select";
import styles from "./styles";

const DEFAULT_LABELS = {
  pageSizePrev: "Show",
  pageSizeEntryName: "rows",
  pageSizeSelectorDescription: "Select how many to display",
  pagesSeparator: "/",
  paginationFirstPageTitle: "First page",
  paginationPreviousPageTitle: "Previous page",
  paginationNextPageTitle: "Next page",
  paginationLastPageTitle: "Last page",
  paginationInputLabel: "Total pages for page input",
};

const setColor = (condition) => (condition ? "atmo5" : undefined);

const { Enter } = KeyboardCodes;

const Pagination = ({
  classes,
  className,
  id,
  pages = 1,
  page = 0,
  showPageSizeOptions = true,
  pageSizeOptions = [5, 10, 20, 25, 50, 100],
  pageSize = 1,
  showPageJump = true,
  canPrevious = false,
  canNext = false,
  onPageChange,
  onPageSizeChange,
  labels: labelsProp,
  showPageProps,
  navigationProps,
  currentPageInputProps,
  ...others
}) => {
  const labels = useLabels(DEFAULT_LABELS, labelsProp);
  const [statePage, setStatePage] = useState(page);

  const getSafePage = (inPage) =>
    Number.isNaN(inPage) ? page : Math.min(Math.max(inPage, 0), pages - 1);

  const changePage = (inPage) => {
    const outPage = getSafePage(inPage);
    setStatePage(outPage);

    if (page !== outPage) {
      onPageChange?.(outPage);
    }
  };

  const applyPage = () => {
    changePage(statePage === "" ? page : statePage);
  };

  useEffect(() => {
    if (page !== statePage || page >= pages) {
      changePage(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const renderPageJump = () => (
    <div className={classes.pageJump}>
      <HvInput
        id={setId(id, "currentPage")}
        labels={labels}
        inputProps={{
          "aria-label": `${pages} ${labels.paginationInputLabel}`,
          // we really want the native number input
          type: "number",
        }}
        classes={{
          root: classes.pageSizeInputContainer,
          input: classes.pageSizeInput,
          inputRoot: classes.pageSizeInputRoot,
        }}
        onChange={(event, val) => setStatePage(val - 1)}
        value={`${statePage === "" ? "" : Number(statePage) + 1}`}
        onBlur={applyPage}
        onKeyDown={(e) => isKeypress(e, Enter) && applyPage()}
        disabled={pageSize === 0}
        disableClear
        {...currentPageInputProps}
      />
    </div>
  );

  return (
    <div id={id} className={clsx(className, classes.root)} {...others}>
      <div className={classes.pageSizeOptions} {...showPageProps}>
        {showPageSizeOptions && (
          <>
            <div className={classes.pageSizeTextContainer}>
              <HvTypography component="span">{labels.pageSizePrev}</HvTypography>
            </div>
            <Select
              id={setId(id, "pageSize")}
              disabled={pageSize === 0}
              className={classes.pageSizeOptionsSelect}
              aria-label={labels.pageSizeSelectorDescription}
              onChange={(evt, val) => onPageSizeChange?.(val)}
              value={pageSize}
            >
              {pageSizeOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
            <div className={classes.pageSizeTextContainer}>
              <HvTypography component="span">{labels.pageSizeEntryName}</HvTypography>
            </div>
          </>
        )}
      </div>
      <div className={classes.pageNavigator} {...navigationProps}>
        <ButtonIconTooltip
          id={setId(id, "firstPage-button")}
          aria-label="First Page"
          className={classes.iconContainer}
          disabled={!canPrevious}
          onClick={() => changePage(0)}
          tooltip={labels.paginationFirstPageTitle}
        >
          <Start className={classes.icon} color={setColor(!canPrevious)} />
        </ButtonIconTooltip>
        <ButtonIconTooltip
          id={setId(id, "previousPage-button")}
          aria-label="Previous Page"
          className={classes.iconContainer}
          disabled={!canPrevious}
          onClick={() => changePage(statePage - 1)}
          tooltip={labels.paginationPreviousPageTitle}
        >
          <Backwards className={classes.icon} color={setColor(!canPrevious)} />
        </ButtonIconTooltip>
        <div className={classes.pageInfo}>
          {showPageJump ? (
            renderPageJump()
          ) : (
            <HvTypography component="span">{`${statePage + 1}`}</HvTypography>
          )}
          <HvTypography component="span">{`${labels.pagesSeparator} `}</HvTypography>
          <HvTypography id={setId(id, "totalPages")} component="span">
            {pages}
          </HvTypography>
        </div>
        <ButtonIconTooltip
          id={setId(id, "nextPage-button")}
          aria-label="Next Page"
          className={classes.iconContainer}
          disabled={!canNext}
          onClick={() => changePage(statePage + 1)}
          tooltip={labels.paginationNextPageTitle}
        >
          <Forwards className={classes.icon} color={setColor(!canNext)} />
        </ButtonIconTooltip>
        <ButtonIconTooltip
          id={setId(id, "lastPage-button")}
          aria-label="Last Page"
          className={classes.iconContainer}
          disabled={!canNext}
          onClick={() => changePage(pages - 1)}
          tooltip={labels.paginationLastPageTitle}
        >
          <End className={classes.icon} color={setColor(!canNext)} />
        </ButtonIconTooltip>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  /**
   * A JSS Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the page size selector container.
     */
    pageSizeOptions: PropTypes.string,
    /**
     * Styles applied to the page size selector dropdown element.
     */
    pageSizeOptionsSelect: PropTypes.string,
    /**
     * Styles applied to the element that holds the labels for the page size selector
     */
    pageSizeTextContainer: PropTypes.string,
    /**
     * Styles applied to the page navigation container.
     */
    pageNavigator: PropTypes.string,
    /**
     * Styles applied to the central page information container.
     */
    pageInfo: PropTypes.string,
    /**
     * Styles applied to the page selector input container.
     */
    pageJump: PropTypes.string,
    /**
     * Styles passed down to the page selector Input component as `input`.
     */
    pageSizeInput: PropTypes.string,
    /**
     * Styles passed down to the page selector Input root.
     */
    pageSizeInputRoot: PropTypes.string,
    /**
     * Styles passed down to the page selector Input component as `container`.
     */
    pageSizeInputContainer: PropTypes.string,
    /**
     * Styles applied to each navigation `HvButton` icon container.
     */
    iconContainer: PropTypes.string,
    /**
     * Styles applied to each navigation icon.
     */
    icon: PropTypes.string,
  }).isRequired,
  /**
   * The number of pages the component has.
   */
  pages: PropTypes.number,
  /**
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
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * An object containing all the labels for the component.
   */
  labels: PropTypes.shape({
    /**
     * The show label.
     */
    pageSizePrev: PropTypes.string,
    /**
     * Indicate the units of the page size selection.
     */
    pageSizeEntryName: PropTypes.string,
    /**
     * Used for the aria-label of the selection of number of unit.s
     */
    pageSizeSelectorDescription: PropTypes.string,
    /**
     * Separator of current page and total pages.
     */
    pagesSeparator: PropTypes.string,
    /**
     * Title of button `firstPage`.
     */
    paginationFirstPageTitle: PropTypes.string,
    /**
     * Title of button `previousPage`.
     */
    paginationPreviousPageTitle: PropTypes.string,
    /**
     * Title of button `nextPage`.
     */
    paginationNextPageTitle: PropTypes.string,
    /**
     * Title of button `lastPage`.
     */
    paginationLastPageTitle: PropTypes.string,
    /**
     * Aria-label passed to the page input.
     */
    paginationInputLabel: PropTypes.string,
  }),
  /**
   * Other props to show page component.
   */
  showPageProps: PropTypes.instanceOf(Object),
  /**
   * Other props to pagination component.
   */
  navigationProps: PropTypes.instanceOf(Object),
  /**
   * Extra properties passed to the input component representing the current pages.
   */
  currentPageInputProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvPagination" })(Pagination);
