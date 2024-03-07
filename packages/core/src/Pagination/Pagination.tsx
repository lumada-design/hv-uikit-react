import { HTMLAttributes, useCallback, useEffect } from "react";
import Hidden from "@mui/material/Hidden";
import {
  Start,
  End,
  Backwards,
  Forwards,
} from "@hitachivantara/uikit-react-icons";

import { useDefaultProps } from "../hooks/useDefaultProps";
import { HvInput, HvInputProps } from "../Input";
import { HvTypography } from "../Typography";
import { HvBaseProps } from "../types/generic";
import { setId } from "../utils/setId";
import { isKey } from "../utils/keyboardUtils";
import { ExtractNames } from "../utils/classes";
import { useLabels } from "../hooks/useLabels";
import HvSelect, { Option } from "./Select";
import { staticClasses, useClasses } from "./Pagination.styles";
import { usePageInput, getSafePage, setColor } from "./utils";
import { HvIconButton } from "../IconButton";

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
  showPageProps?: HTMLAttributes<HTMLDivElement>;
  /** Other props to pagination component. */
  navigationProps?: HTMLAttributes<HTMLDivElement>;
  /** Extra properties passed to the input component representing the current pages. */
  currentPageInputProps?: HvInputProps;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvPaginationClasses;
}

/**
 * Pagination is the process of dividing a document into discrete pages. It relates to how users interact
 * with structured content on a website or application.
 */
export const HvPagination = (props: HvPaginationProps) => {
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
    ...others
  } = useDefaultProps("HvPagination", props);

  const labels = useLabels(DEFAULT_LABELS, labelsProp);
  const [pageInput, handleInputChange] = usePageInput(page);
  const { classes, cx } = useClasses(classesProp);

  const changePage = useCallback(
    (newPage: number) => {
      const safePage: number = getSafePage(newPage, page, pages);

      onPageChange?.(safePage);
      handleInputChange(null, safePage + 1);
    },
    [page, pages, onPageChange, handleInputChange]
  );

  useEffect(() => {
    if (page >= pages && pages > 0) {
      changePage(page);
    }
  }, [changePage, page, pages]);

  useEffect(() => {
    if (pageInput !== page + 1) {
      handleInputChange(null, page + 1);
    }

    // we only want to "fix" the input's display value when `page` property changed
    // (either externally or when internally committed - onBlur or Enter),
    // not while editing the input.
    // breaking a rule of hooks isn't ideal and it's just a hack for fixing
    // a bug preventing properly controlling of the `page` property.
    // fixing it some other way would potentially introduce a breaking change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleInputChange, page]);

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
        onChange={(event, value) => handleInputChange(event, Number(value))}
        value={String(pageInput)}
        onBlur={(evt, value) => changePage(Number(value) - 1)}
        onKeyDown={(evt, value) =>
          isKey(evt, "Enter") && changePage(Number(value) - 1)
        }
        disabled={pageSize === 0}
        disableClear
        {...currentPageInputProps}
      />
    </div>
  );

  return (
    <div id={id} className={cx(classes.root, className)} {...others}>
      <div className={classes.pageSizeOptions} {...showPageProps}>
        {showPageSizeOptions && (
          <>
            <Hidden xsDown>
              <HvTypography
                component="span"
                className={classes?.pageSizeTextContainer}
              >
                {labels?.pageSizePrev}
              </HvTypography>
            </Hidden>
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
            <Hidden xsDown>
              <HvTypography
                component="span"
                className={classes.pageSizeTextContainer}
              >
                {labels?.pageSizeEntryName}
              </HvTypography>
            </Hidden>
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
          <Start
            role="none"
            className={classes.icon}
            color={setColor(!canPrevious)}
            iconSize="XS"
          />
        </HvIconButton>
        <HvIconButton
          id={setId(id, "previousPage-button")}
          className={classes.iconContainer}
          disabled={!canPrevious}
          onClick={() => changePage(page - 1)}
          title={labels?.previousPage || labels?.paginationPreviousPageTitle}
        >
          <Backwards
            role="none"
            className={classes.icon}
            color={setColor(!canPrevious)}
            iconSize="XS"
          />
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
          <Forwards
            role="none"
            className={classes.icon}
            color={setColor(!canNext)}
            iconSize="XS"
          />
        </HvIconButton>
        <HvIconButton
          id={setId(id, "lastPage-button")}
          className={classes.iconContainer}
          disabled={!canNext}
          onClick={() => changePage(pages - 1)}
          title={labels?.lastPage || labels?.paginationLastPageTitle}
        >
          <End
            className={classes.icon}
            color={setColor(!canNext)}
            iconSize="XS"
          />
        </HvIconButton>
      </div>
    </div>
  );
};
