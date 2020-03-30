import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { IconButton, withStyles } from "@material-ui/core";
import Down from "@hv/uikit-react-icons/dist/DropDownXS";
import ArrowFirst from "@hv/uikit-react-icons/dist/Start";
import ArrowLeft from "@hv/uikit-react-icons/dist/Backwards";
import ArrowRight from "@hv/uikit-react-icons/dist/Forwards";
import ArrowLast from "@hv/uikit-react-icons/dist/End";
import { isKeypress, KeyboardCodes as Codes } from "../utils/KeyboardUtils";
import HvTypography from "../Typography";
import HvInput from "../Input";
import withLabels from "../withLabels";
import { setId } from "../utils";
import styles from "./styles";

const DEFAULT_LABELS = {
  pageSizePrev: "Show",
  pageSizeEntryName: "rows",
  pageSizeSelectorDescription: "Select how many to display",
  pagesSeparator: "of",
  pagesIndeterminate: "Many"
};

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
  labels,
  showPageProps,
  navigationProps
}) => {
  const [statePage, setStatePage] = useState(page);

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

  return (
    <div id={id} className={clsx(className, classes.root)}>
      <div className={classes.pageSizeOptions} {...showPageProps}>
        {showPageSizeOptions && (
          <>
            <HvTypography component="span" variant="sText">
              {labels.pageSizePrev}
            </HvTypography>
            <select
              id={setId(id, "pageSize")}
              disabled={pageSize === 0}
              className={classes.pageSizeOptionsSelect}
              aria-label={labels.pageSizeSelectorDescription}
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
              {labels.pageSizeEntryName}
            </HvTypography>
          </>
        )}
      </div>
      <div className={classes.pageNavigator} {...navigationProps}>
        <IconButton
          id={setId(id, "firstPage-button")}
          className={classes.iconContainer}
          disabled={!canPrevious}
          onClick={() => changePage(0)}
        >
          <ArrowFirst className={classes.icon} color={!canPrevious ? "atmo7" : undefined} />
        </IconButton>
        <IconButton
          id={setId(id, "previousPage-button")}
          className={classes.iconContainer}
          disabled={!canPrevious}
          onClick={() => changePage(statePage - 1)}
        >
          <ArrowLeft className={classes.icon} color={!canPrevious ? "atmo7" : undefined} />
        </IconButton>
        <div className={classes.pageInfo}>
          {showPageJump ? (
            <div className={classes.pageJump}>
              <HvInput
                id={setId(id, "currentPage")}
                labels={labels}
                classes={{
                  root: classes.pageSizeInputContainer,
                  input: classes.pageSizeInput,
                  inputRoot: classes.pageSizeInputRoot
                }}
                onChange={(event, val) => setStatePage(val - 1)}
                initialValue={`${statePage + 1}`}
                value={`${statePage === "" ? "" : Number(statePage) + 1}`}
                onBlur={applyPage}
                onKeyDown={e => isKeypress(e, Codes.Enter) && applyPage()}
                validationIconVisible={false}
                disabled={pageSize === 0}
                disableClear
                type="number"
              />
            </div>
          ) : (
            <HvTypography component="span" variant="sText">
              {`${statePage + 1}`}
            </HvTypography>
          )}
          <HvTypography component="span" variant="sText">
            {` ${labels.pagesSeparator} `}
          </HvTypography>
          <HvTypography id={setId(id, "totalPages")} component="span" variant="sText">
            {pages || 1}
          </HvTypography>
        </div>
        <IconButton
          id={setId(id, "nextPage-button")}
          className={classes.iconContainer}
          disabled={!canNext}
          onClick={() => changePage(statePage + 1)}
        >
          <ArrowRight className={classes.icon} color={!canNext ? "atmo7" : undefined} />
        </IconButton>
        <IconButton
          id={setId(id, "lastPage-button")}
          className={classes.iconContainer}
          disabled={!canNext}
          onClick={() => changePage(pages - 1)}
        >
          <ArrowLast className={classes.icon} color={!canNext ? "atmo7" : undefined} />
        </IconButton>
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
     * Styles passed down to the page selector Input component as `inputRoot` .
     */
    pageSizeInputRoot: PropTypes.string,
    /**
     * Styles passed down to the page selector Input component as `container`.
     */
    pageSizeInputContainer: PropTypes.string,
    /**
     * Styles applied to each navigation `IconButton` icon container.
     */
    iconContainer: PropTypes.string,
    /**
     * Styles applied to each navigation icon.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the page size dropdown icon.
     */
    selectDownIcon: PropTypes.string
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
    pageSizePrev: PropTypes.string,
    pageSizeEntryName: PropTypes.string,
    pageSizeSelectorDescription: PropTypes.string,
    pagesSeparator: PropTypes.string,
    pagesIndeterminate: PropTypes.string
  }),
  /**
   * Other props to show page component.
   */
  showPageProps: PropTypes.instanceOf(Object),
  /**
   * Other props to pagination component.
   */
  navigationProps: PropTypes.instanceOf(Object)
};

export default withStyles(styles, { name: "HvPagination" })(withLabels(DEFAULT_LABELS)(Pagination));
