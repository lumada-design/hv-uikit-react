import { forwardRef, useCallback, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  clamp,
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";
import { HvSize } from "@hitachivantara/uikit-styles";

import { useLabels } from "../hooks/useLabels";
import { HvIconButton } from "../IconButton";
import { HvIcon } from "../icons";
import { HvInput, HvInputProps } from "../Input";
import { HvBaseProps } from "../types/generic";
import { HvTypography } from "../Typography";
import { setId } from "../utils/setId";
import { staticClasses, useClasses } from "./Pagination.styles";
import HvSelect, { Option } from "./Select";

export { staticClasses as paginationClasses };

export type HvPaginationClasses = ExtractNames<typeof useClasses>;

const defaultPageSizeOptions = [5, 10, 20, 25, 50, 100];

const DEFAULT_LABELS = {
  /** The show label. */
  pageSizePrev: "Show",
  /** Indicate the units of the page size selection. */
  pageSizeEntryName: "rows",
  /** Used for the aria-label of the selection of number of unit.s */
  pageSizeSelectorDescription: "Select how many to display",
  /** Separator of current page and total pages. */
  pagesSeparator: "/",
  /** Title of button `firstPage`. @deprecated Use `firstPage` instead. */
  paginationFirstPageTitle: "First page",
  /** Title of button `previousPage`. @deprecated Use `previousPage` instead. */
  paginationPreviousPageTitle: "Previous page",
  /** Title of button `nextPage`. @deprecated Use `nextPage` instead. */
  paginationNextPageTitle: "Next page",
  /** Title of button `lastPage`. @deprecated Use `lastPage` instead. */
  paginationLastPageTitle: "Last page",
  /** Aria-label passed to the page input. */
  paginationInputLabel: "Current page",
  /** Label of the first page button */
  firstPage: "First Page",
  /** Label of the previous page button */
  previousPage: "Previous Page",
  /** Label of the next page button */
  nextPage: "Next Page",
  /** Label of the last page button */
  lastPage: "Last Page",
};

export type HvPaginationLabels = Partial<typeof DEFAULT_LABELS>;

export interface HvPaginationProps extends HvBaseProps {
  /** The number of pages the component has. */
  pages?: number;
  /** The currently selected page (0-indexed). */
  page?: number;
  /** Controls whether the left page size mechanism should be visible. */
  showPageSizeOptions?: boolean;
  /** The array of possible page sizes for the dropdown. */
  pageSizeOptions?: number[];
  /** The currently selected page size. */
  pageSize?: number;
  /** Controls whether the central page changing mechanism should be visible. */
  showPageJump?: boolean;
  /** Controls whether the previous/first page buttons are enabled. */
  canPrevious?: boolean;
  /** Controls whether the next/last page buttons are enabled. */
  canNext?: boolean;
  /** Function called when the page changes. */
  onPageChange?: (page: number) => void;
  /** Function called when the page size changes. */
  onPageSizeChange?: (pageSize: number) => void;
  /** An object containing all the labels for the component. */
  labels?: HvPaginationLabels;
  /** Other props to show page component. */
  showPageProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Other props to pagination component. */
  navigationProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Extra properties passed to the input component representing the current pages. */
  currentPageInputProps?: HvInputProps;
  /** The size to use on the icons */
  iconSize?: HvSize;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvPaginationClasses;
}

/**
 * Pagination is the process of dividing a document into discrete pages. It relates to how users interact
 * with structured content on a website or application.
 */
export const HvPagination = forwardRef<
  React.ComponentRef<"div">,
  HvPaginationProps
>(function HvPagination(props, ref) {
  const {
    classes: classesProp,
    className,
    id,
    pages = 1,
    page = 0,
    showPageSizeOptions = true,
    pageSizeOptions = defaultPageSizeOptions,
    pageSize = defaultPageSizeOptions[1],
    showPageJump = true,
    canPrevious = false,
    canNext = false,
    onPageChange,
    onPageSizeChange,
    labels: labelsProp,
    showPageProps,
    navigationProps,
    currentPageInputProps,
    iconSize = "xs",
    ...others
  } = useDefaultProps("HvPagination", props);
  const { classes, cx } = useClasses(classesProp);
  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  const muiTheme = useTheme();
  const isXsDown = useMediaQuery(muiTheme.breakpoints.down("xs"));

  const [pageInput, setPageInput] = useState(page);

  const changePage = useCallback(
    (newPage: number) => {
      const safePage = Number.isNaN(newPage) ? page : clamp(newPage, pages - 1);

      onPageChange?.(safePage);
      setPageInput(safePage);
    },
    [page, pages, onPageChange],
  );

  useEffect(() => {
    if (page >= pages && pages > 0) {
      changePage(page);
    }
  }, [changePage, page, pages]);

  useEffect(() => {
    setPageInput(page);
  }, [page]);

  const renderPageJump = () => (
    <div className={classes.pageJump}>
      <HvInput
        id={setId(id, "currentPage")}
        labels={labels}
        inputProps={{
          "aria-label": labels?.paginationInputLabel,
          // We really want the native number input
          type: "number",
        }}
        classes={{
          root: classes?.pageSizeInputContainer,
          input: classes?.pageSizeInput,
          inputRoot: classes?.pageSizeInputRoot,
        }}
        value={String(pageInput + 1)}
        onChange={(event, value) => setPageInput(Number(value) - 1)}
        onBlur={(evt, value) => changePage(Math.round(Number(value)) - 1)}
        onEnter={(evt, value) => changePage(Math.round(Number(value)) - 1)}
        disabled={pageSize === 0}
        disableClear
        {...currentPageInputProps}
      />
    </div>
  );

  return (
    <div ref={ref} id={id} className={cx(classes.root, className)} {...others}>
      <div className={classes.pageSizeOptions} {...showPageProps}>
        {showPageSizeOptions && (
          <>
            {!isXsDown && (
              <HvTypography
                component="span"
                className={classes?.pageSizeTextContainer}
              >
                {labels?.pageSizePrev}
              </HvTypography>
            )}
            <HvSelect
              id={setId(id, "pageSize")}
              disabled={pageSize === 0}
              className={classes.pageSizeOptionsSelect}
              aria-label={labels?.pageSizeSelectorDescription}
              onChange={(_: any, val: number) => onPageSizeChange?.(val)}
              value={pageSize}
              classes={{
                header: classes.pageSizeHeader,
                root: classes.pageSizeRoot,
              }}
            >
              {pageSizeOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </HvSelect>
            {!isXsDown && (
              <HvTypography
                component="span"
                className={classes.pageSizeTextContainer}
              >
                {labels?.pageSizeEntryName}
              </HvTypography>
            )}
          </>
        )}
      </div>
      <div className={classes.pageNavigator} {...navigationProps}>
        <HvIconButton
          id={setId(id, "firstPage-button")}
          className={classes.iconContainer}
          disabled={!canPrevious}
          onClick={() => changePage(0)}
          title={labels?.firstPage || labels?.paginationFirstPageTitle}
        >
          <HvIcon name="Start" className={classes.icon} size={iconSize} />
        </HvIconButton>
        <HvIconButton
          id={setId(id, "previousPage-button")}
          className={classes.iconContainer}
          disabled={!canPrevious}
          onClick={() => changePage(page - 1)}
          title={labels?.previousPage || labels?.paginationPreviousPageTitle}
        >
          <HvIcon name="Backwards" className={classes.icon} size={iconSize} />
        </HvIconButton>
        <div className={classes.pageInfo}>
          {showPageJump ? (
            renderPageJump()
          ) : (
            <HvTypography variant="caption2" component="span">{`${
              page + 1
            }`}</HvTypography>
          )}
          <HvTypography component="span">{`${labels?.pagesSeparator} `}</HvTypography>
          <HvTypography
            component="span"
            id={setId(id, "totalPages")}
            className={classes.totalPagesTextContainer}
          >
            {pages}
          </HvTypography>
        </div>
        <HvIconButton
          id={setId(id, "nextPage-button")}
          className={classes.iconContainer}
          disabled={!canNext}
          onClick={() => changePage(page + 1)}
          title={labels?.nextPage || labels?.paginationNextPageTitle}
        >
          <HvIcon name="Forwards" className={classes.icon} size={iconSize} />
        </HvIconButton>
        <HvIconButton
          id={setId(id, "lastPage-button")}
          className={classes.iconContainer}
          disabled={!canNext}
          onClick={() => changePage(pages - 1)}
          title={labels?.lastPage || labels?.paginationLastPageTitle}
        >
          <HvIcon name="End" className={classes.icon} size={iconSize} />
        </HvIconButton>
      </div>
    </div>
  );
});
