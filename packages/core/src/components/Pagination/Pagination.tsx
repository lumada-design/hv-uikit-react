import { useCallback, useEffect } from "react";
import clsx from "clsx";
import { Hidden } from "@mui/material";
import { HvInput, HvTypography } from "components";
import { Start, End, Backwards, Forwards } from "@hitachivantara/uikit-icons";
import { HvBaseProps } from "../../types";
import { Option } from "./Select";
import {
  StyledRoot,
  StyledPageSizeOptions,
  StyledPageSizePrev,
  StyledSelect,
  StyledPageSizeTextContainer,
  StyledPageNavigator,
  StyledButtonIconTooltip,
  StyledPageJump,
  StyledPageInfo,
} from "./Pagination.styles";
import { paginationClasses, HvPaginationClasses } from ".";
import { isKeypress, keyboardCodes, setId } from "utils";
import { usePageInput, getSafePage, setColor } from "./utils";
import { useLabels } from "hooks";

export type HvPaginationLabels = {
  /** The show label. */
  pageSizePrev?: string;
  /** Indicate the units of the page size selection. */
  pageSizeEntryName?: string;
  /** Used for the aria-label of the selection of number of unit.s */
  pageSizeSelectorDescription?: string;
  /** Separator of current page and total pages. */
  pagesSeparator?: string;
  /** Title of button `firstPage`. */
  paginationFirstPageTitle?: string;
  /** Title of button `previousPage`. */
  paginationPreviousPageTitle?: string;
  /** Title of button `nextPage`. */
  paginationNextPageTitle?: string;
  /** Title of button `lastPage`. */
  paginationLastPageTitle?: string;
  /** Aria-label passed to the page input. */
  paginationInputLabel?: string;
  /** Aria-label of the first page button */
  firstPage?: string;
  /** Aria-label of the previous page button */
  previousPage?: string;
  /** Aria-label of the next page button */
  nextPage?: string;
  /** Aria-label of the last page button */
  lastPage?: string;
};

export type HvPaginationProps = HvBaseProps & {
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
  onPageChange?: Function;
  /** Function called when the page size changes. */
  onPageSizeChange?: Function;
  /** An object containing all the labels for the component. */
  labels?: HvPaginationLabels;
  /** Other props to show page component. */
  showPageProps?: object;
  /** Other props to pagination component. */
  navigationProps?: object;
  /** Extra properties passed to the input component representing the current pages. */
  currentPageInputProps?: object;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvPaginationClasses;
};

const DEFAULT_LABELS = {
  pageSizePrev: "Show",
  pageSizeEntryName: "rows",
  pageSizeSelectorDescription: "Select how many to display",
  pagesSeparator: "/",
  paginationFirstPageTitle: "First page",
  paginationPreviousPageTitle: "Previous page",
  paginationNextPageTitle: "Next page",
  paginationLastPageTitle: "Last page",
  paginationInputLabel: "Current page",
  firstPage: "First Page",
  previousPage: "Previous Page",
  nextPage: "Next Page",
  lastPage: "Last Page",
};

const { Enter } = keyboardCodes;

/**
 * Pagination is the process of dividing a document into discrete pages. It relates to how users interact
 * with structured content on a website or application.
 */
export const HvPagination = ({
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
}: HvPaginationProps) => {
  const labels = useLabels(DEFAULT_LABELS, labelsProp);
  const [pageInput, handleInputChange] = usePageInput(page);

  const changePage = useCallback(
    (newPage) => {
      const safePage = getSafePage(newPage, page, pages);

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
    // (either externaly or when internally commited - onBlur or Enter),
    // not while editing the input.
    // breaking a rule of hooks isn't ideal and it's just a hack for fixing
    // a bug preventing properly controling of the `page` property.
    // fixing it some other way would potentialy introduce a breaking change.
  }, [handleInputChange, page]);

  const renderPageJump = () => (
    <StyledPageJump
      className={clsx(paginationClasses.pageJump, classes?.pageJump)}
    >
      <HvInput
        id={setId(id, "currentPage")}
        labels={labels}
        inputProps={{
          "aria-label": labels?.paginationInputLabel,
          // we really want the native number input
          type: "number",
        }}
        classes={{
          root: clsx(
            paginationClasses.pageSizeInputContainer,
            classes?.pageSizeInputContainer
          ),
          input: clsx(paginationClasses.pageSizeInput, classes?.pageSizeInput),
          inputRoot: clsx(
            paginationClasses.pageSizeInputRoot,
            classes?.pageSizeInputRoot
          ),
        }}
        onChange={handleInputChange}
        value={String(pageInput)}
        onBlur={(evt, value) => changePage(value - 1)}
        onKeyDown={(evt, value) =>
          isKeypress(evt, Enter) && changePage(value - 1)
        }
        disabled={pageSize === 0}
        disableClear
        {...currentPageInputProps}
      />
    </StyledPageJump>
  );

  return (
    <StyledRoot
      id={id}
      className={clsx(className, paginationClasses.root, classes?.root)}
      {...others}
    >
      <StyledPageSizeOptions
        className={clsx(
          paginationClasses.pageSizeOptions,
          classes?.pageSizeOptions
        )}
        {...showPageProps}
      >
        {showPageSizeOptions && (
          <>
            <Hidden xsDown>
              <StyledPageSizePrev
                className={clsx(
                  paginationClasses.pageSizeTextContainer,
                  classes?.pageSizeTextContainer
                )}
              >
                <HvTypography as="span">{labels?.pageSizePrev}</HvTypography>
              </StyledPageSizePrev>
            </Hidden>
            <StyledSelect
              id={setId(id, "pageSize")}
              disabled={pageSize === 0}
              className={clsx(
                paginationClasses.pageSizeOptionsSelect,
                classes?.pageSizeOptionsSelect
              )}
              classes={{}}
              aria-label={labels?.pageSizeSelectorDescription}
              onChange={(evt, val) => onPageSizeChange?.(val)}
              value={pageSize}
            >
              {pageSizeOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </StyledSelect>
            <Hidden xsDown>
              <StyledPageSizeTextContainer
                className={clsx(
                  paginationClasses.pageSizeTextContainer,
                  classes?.pageSizeTextContainer
                )}
              >
                <HvTypography as="span">
                  {labels?.pageSizeEntryName}
                </HvTypography>
              </StyledPageSizeTextContainer>
            </Hidden>
          </>
        )}
      </StyledPageSizeOptions>
      <StyledPageNavigator
        className={clsx(
          paginationClasses.pageNavigator,
          classes?.pageNavigator
        )}
        {...navigationProps}
      >
        <StyledButtonIconTooltip
          id={setId(id, "firstPage-button")}
          aria-label={labels?.firstPage}
          className={clsx(
            paginationClasses.iconContainer,
            classes?.iconContainer
          )}
          disabled={!canPrevious}
          onClick={() => changePage(0)}
          tooltip={labels?.paginationFirstPageTitle}
        >
          <Start
            className={clsx(paginationClasses.icon, classes?.icon)}
            color={setColor(!canPrevious)}
          />
        </StyledButtonIconTooltip>
        <StyledButtonIconTooltip
          id={setId(id, "previousPage-button")}
          className={clsx(
            paginationClasses.iconContainer,
            classes?.iconContainer
          )}
          disabled={!canPrevious}
          onClick={() => changePage(page - 1)}
          tooltip={labels?.paginationPreviousPageTitle}
        >
          <Backwards
            className={clsx(paginationClasses.icon, classes?.icon)}
            color={setColor(!canPrevious)}
          />
        </StyledButtonIconTooltip>
        <StyledPageInfo
          className={clsx(paginationClasses.pageInfo, classes?.pageInfo)}
        >
          {showPageJump ? (
            renderPageJump()
          ) : (
            <HvTypography as="span">{`${page + 1}`}</HvTypography>
          )}
          <HvTypography as="span">{`${labels?.pagesSeparator} `}</HvTypography>
          <HvTypography id={setId(id, "totalPages")} as="span">
            {pages}
          </HvTypography>
        </StyledPageInfo>
        <StyledButtonIconTooltip
          id={setId(id, "nextPage-button")}
          aria-label={labels?.nextPage}
          className={clsx(
            paginationClasses.iconContainer,
            classes?.iconContainer
          )}
          disabled={!canNext}
          onClick={() => changePage(page + 1)}
          tooltip={labels?.paginationNextPageTitle}
        >
          <Forwards
            className={clsx(paginationClasses.icon, classes?.icon)}
            color={setColor(!canNext)}
          />
        </StyledButtonIconTooltip>
        <StyledButtonIconTooltip
          id={setId(id, "lastPage-button")}
          aria-label={labels?.lastPage}
          className={clsx(
            paginationClasses.iconContainer,
            classes?.iconContainer
          )}
          disabled={!canNext}
          onClick={() => changePage(pages - 1)}
          tooltip={labels?.paginationLastPageTitle}
        >
          <End
            className={clsx(paginationClasses.icon, classes?.icon)}
            color={setColor(!canNext)}
          />
        </StyledButtonIconTooltip>
      </StyledPageNavigator>
    </StyledRoot>
  );
};
