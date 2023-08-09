import {
  makePropGetter,
  useGetLatest,
  Hooks,
  PropGetter,
  TableCommonProps,
} from "react-table";
import { CSSProperties } from "react";
import { theme } from "@hitachivantara/uikit-styles";

// #region ##### TYPES #####

export interface UseHvTableStickyTableHeadProps extends TableCommonProps {
  stickyHeader?: boolean;
}

export type HvTableHeadPropGetter<D extends object> = PropGetter<
  D,
  UseHvTableStickyTableHeadProps
>;

export type UseHvTableStickyTableOptions = {
  stickyHeader?: boolean;
  stickyColumns?: boolean;
};

export interface UseHvTableStickyHooks<D extends object> {
  getTableHeadProps: Array<HvTableHeadPropGetter<D>>;
}

export interface UseHvTableStickyTableInstance<D extends object> {
  getTableHeadProps: (
    propGetter?: HvTableHeadPropGetter<D>
  ) => UseHvTableStickyTableHeadProps;

  totalRight?: number;
  hasStickyColumns?: boolean;
}

// props target: <table>
export interface UseHvTableStickyTableProps {
  stickyHeader?: boolean;
  stickyColumns?: boolean;
}

// props target: <table><thead><tr><th>
export interface UseHvTableStickyColumnProps {
  stickyColumn?: boolean;
  stickyColumnMostLeft?: boolean;
  stickyColumnLeastRight?: boolean;
}

// props target: <table><tbody><tr><td>
export interface UseHvTableStickyCellProps {
  stickyColumn?: boolean;
  stickyColumnMostLeft?: boolean;
  stickyColumnLeastRight?: boolean;
}

export type UseHvTableSticky = (<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
) => void) & { pluginName: string };

// #endregion ##### TYPES #####

const isSticky = (value) => /left|right/i.test(value);

const getStickyValue = ({ sticky, parent }) => {
  if (isSticky(sticky)) {
    return sticky;
  }

  if (parent != null) {
    // check if parent is sticky
    sticky = getStickyValue(parent);
    if (isSticky(sticky)) {
      return sticky;
    }

    const { columns } = parent;
    // check if any column in the same group is sticky
    if (columns?.length > 0) {
      sticky = columns?.find((col) => col.sticky != null)?.sticky;
      if (isSticky(sticky)) {
        return sticky;
      }
    }
  }

  return undefined;
};

const updateColumnAndParent = (column, props) => {
  Object.assign(column, props);

  if (column.parent != null) {
    updateColumnAndParent(column.parent, props);
  }
};

const visibleColumnsHook = (columns, { instance }) => {
  const toTheLeft: any[] = [];
  const toTheRight: any[] = [];
  const others: any[] = [];

  columns.forEach((column) => {
    const sticky = getStickyValue(column)?.toLowerCase();

    updateColumnAndParent(column, { sticky });

    if (sticky === "left") {
      toTheLeft.push(column);
    } else if (sticky === "right") {
      toTheRight.push(column);
    } else {
      others.push(column);
    }
  });

  if (others.length > 0) {
    const [firstNotSticky] = others;
    updateColumnAndParent(firstNotSticky, { isFirstNotSticky: true });

    const lastNotSticky = others[others.length - 1];
    updateColumnAndParent(lastNotSticky, { isLastNotSticky: true });
  }

  const hasLeftSticky = toTheLeft.length > 0;
  if (hasLeftSticky) {
    const lastLeftSticky = toTheLeft[toTheLeft.length - 1];

    updateColumnAndParent(lastLeftSticky, { isLastLeftSticky: true });
  }

  const hasRightSticky = toTheRight.length > 0;
  if (hasRightSticky) {
    const [firstRightSticky] = toTheRight;

    updateColumnAndParent(firstRightSticky, { isFirstRightSticky: true });
  }

  instance.hasStickyColumns = hasLeftSticky || hasRightSticky;

  return [...toTheLeft, ...others, ...toTheRight];
};

const calculateHeaderWidthsToTheRight = (headers, right = 0) => {
  if (!headers?.length) {
    return;
  }

  for (let i = headers.length - 1; i !== -1; i -= 1) {
    const header = headers[i];

    header.totalRight = right;

    const { headers: subHeaders } = header;
    if (subHeaders?.length > 0) {
      calculateHeaderWidthsToTheRight(subHeaders, right);
    }

    if (header.isVisible) {
      right += header.totalWidth;
    }
  }
};

const useInstanceHook = (instance) => {
  calculateHeaderWidthsToTheRight(instance.headers);

  const getInstance = useGetLatest(instance);
  instance.getTableHeadProps = makePropGetter(
    instance.getHooks().getTableHeadProps,
    {
      instance: getInstance(),
    }
  );
};

const getRowProps = () => ({
  style: {
    display: "flex",
    flex: "1 0 auto",
  },
});

const getCellProps = (header, isHeaderCell: boolean) => {
  const props: UseHvTableStickyCellProps & { style: CSSProperties } = {
    style: {
      display: "inline-flex",
      flex: `${header.totalWidth} ${header.totalMinWidth} auto`,
      alignItems: isHeaderCell ? "start" : "center",
      justifyContent: header.align,

      width: `${header.totalWidth}px`,
      minWidth: `${header.totalMinWidth}px`,
      ...(isHeaderCell && { backgroundColor: theme.colors.atmo2 }),
    },
  };

  if (header.sticky != null) {
    props.stickyColumn = true;

    const margin =
      header.sticky === "left" ? header.totalLeft : header.totalRight;

    props.style[header.sticky] = `${margin}px`;

    if (header.isLastLeftSticky) {
      props.stickyColumnMostLeft = true;
    }

    if (header.isFirstRightSticky) {
      props.stickyColumnLeastRight = true;
    }
  } else {
    if (header.isFirstNotSticky) {
      props.style.borderLeft = 0;
    }

    if (header.isLastNotSticky) {
      props.style.borderRight = 0;
    }
  }

  return props;
};

/*
 * STICKY POSITION MANAGEMENT
 *   <thead>: sticky if stickyHeader: true
 *   <tr>: never sticky
 *   <th>: sticky only if that particular column is sticky (left or right)
 */

/*
 * We need to hide the last non sticky column right border, to avoid issues with double borders.
 *
 * This could be done with css, using the `:has()` selector:
 *  - ".not-sticky:has(+ .first-right-sticky)": { border-right: 0 }
 *
 * Until the `:has()` selector is supported by modern browsers,
 * that at the moment is just a proposal https://developer.mozilla.org/en-US/docs/Web/CSS/:has,
 * we need to override the last not sticky column "borderRight" here.
 */

// props target: <table>
const getTablePropsHook = (props, { instance }) => {
  const nextProps: UseHvTableStickyTableProps = {
    stickyHeader: instance.stickyHeader,
    stickyColumns: instance.hasStickyColumns,
  };

  return [props, nextProps];
};

// props target: <table><thead>
export const getTableHeadPropsHook = (props, { instance }) => {
  const nextProps = {
    stickyHeader: instance.stickyHeader,
  };

  return [props, nextProps];
};

// props target: <table><thead><tr>
export const getHeaderGroupPropsHook = (props, { instance }) => {
  const nextProps = instance.hasStickyColumns ? getRowProps() : {};

  return [props, nextProps];
};

// props target: <table><thead><tr><th>
const getHeaderPropsHook = (props, { instance, column }) => {
  const nextProps = instance.hasStickyColumns ? getCellProps(column, true) : {};

  return [props, nextProps];
};

// props target: <table><tbody><tr>
const getRowPropsHook = (props, { instance }) => {
  const nextProps = instance.hasStickyColumns ? getRowProps() : {};

  return [props, nextProps];
};

// props target: <table><tbody><tr><td>
const getCellPropsHook = (props, { instance, cell }) => {
  const nextProps: UseHvTableStickyCellProps = instance.hasStickyColumns
    ? getCellProps(cell.column, false)
    : {};

  return [props, nextProps];
};

const useSticky: UseHvTableSticky = (hooks) => {
  hooks.visibleColumns.push(visibleColumnsHook);
  hooks.useInstance.push(useInstanceHook);

  // props target: <table>
  hooks.getTableProps.push(getTablePropsHook);
  // props target: <table><thead>
  hooks.getTableHeadProps = [getTableHeadPropsHook];
  // props target: <table><thead><tr>
  hooks.getHeaderGroupProps.push(getHeaderGroupPropsHook);
  // props target: <table><thead><tr><th>
  hooks.getHeaderProps.push(getHeaderPropsHook);
  // props target: <table><tbody><tr>
  hooks.getRowProps.push(getRowPropsHook);
  // props target: <table><tbody><tr><td>
  hooks.getCellProps.push(getCellPropsHook);
};

useSticky.pluginName = "useHvTableSticky";

export default useSticky;
