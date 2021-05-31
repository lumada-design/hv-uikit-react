/* eslint-disable no-param-reassign */

import { makePropGetter, useGetLatest } from "react-table";

const normalizeStickyValue = (column) => {
  const sticky = column?.sticky?.toLowerCase();
  if (sticky === "left" || sticky === "right") {
    return sticky;
  }

  // TODO: add support for grouped columns (column.parent)

  return undefined;
};

export const visibleColumnsHook = (columns, { instance }) => {
  const toTheLeft = [];
  const toTheRight = [];
  const others = [];

  columns.forEach((column) => {
    column.sticky = normalizeStickyValue(column);

    if (column.sticky === "left") {
      toTheLeft.push(column);
    } else if (column.sticky === "right") {
      toTheRight.push(column);
    } else {
      others.push(column);
    }
  });

  if (toTheLeft.length > 0) {
    toTheLeft[toTheLeft.length - 1].isLastLeftSticky = true;
  }
  if (toTheRight.length > 0) {
    toTheRight[0].isFirstRightSticky = true;
  }

  instance.hasStickyColumns = toTheLeft.length > 0 || toTheRight.length > 0;

  return [...toTheLeft, ...others, ...toTheRight];
};

const calculateHeaderWidthsToTheRight = (headers, right = 0) => {
  if (!headers?.length) {
    return;
  }

  for (let i = headers.length - 1; i !== -1; i -= 1) {
    const header = headers[i];

    header.totalRight = right;

    // TODO: Add support for sub-headers
    // const { headers: subHeaders } = header;
    // if (subHeaders && subHeaders.length) {
    //   calculateHeaderWidthsToTheRight(subHeaders, right);
    // }
    if (header.isVisible) {
      right += header.totalWidth;
    }
  }
};

export const useInstanceHook = (instance) => {
  calculateHeaderWidthsToTheRight(instance.headers);

  const getInstance = useGetLatest(instance);
  instance.getTableHeadProps = makePropGetter(instance.getHooks().getTableHeadProps, {
    instance: getInstance(),
  });
};

const getRowProps = (instance) => ({
  style: {
    display: "flex",
    width: `${instance.totalColumnsWidth}px`,
  },
});

const getCellProps = (header, isHeaderCell) => {
  const props = {
    style: {
      display: "flex",
      alignItems: isHeaderCell ? "start" : "center",
      width: `${header.totalWidth}px`,
    },
  };

  if (header.sticky != null) {
    props.stickyColumn = true;

    const margin = header.sticky === "left" ? header.totalLeft : header.totalRight;

    props.style[header.sticky] = `${margin}px`;

    if (header.isLastLeftSticky) {
      props.stickyColumnMostLeft = true;
    }

    if (header.isFirstRightSticky) {
      props.stickyColumnLeastRight = true;
    }
  }

  return props;
};

/*
 * STICKY POSITION MANAGEMENT
 *
 * What would make sense:
 *   <thead>: sticky if stickyHeader: true
 *   <tr>: never sticky
 *   <th>: sticky only if that particular column is sticky (left or right)
 *
 * What works cross-browser:
 *   <thead>: sticky only if stickyHeader: true and there are sticky columns
 *   <tr>: sticky only if stickyHeader: true and there are sticky columns
 *   <th>: always sticky if stickyHeader: true, otherwise only if that particular column is sticky (left or right)
 *
 * Why:
 *   Chrome ignores position: sticky on the <thead> (and <tr>) (https://bugs.chromium.org/p/chromium/issues/detail?id=702927).
 *   Seems to be fixed on Chrome Canary, so this might be changed in the near future.
 *   Therefore we need to add position: sticky to every <th>.
 *
 *   However this will break Safari (and Chrome Canary), with the header actually scrolling down with the table...
 *   So we need to remove the position: sticky from the <thead>.
 *
 *   But, when not using table-* displays (when hasStickyColumns: true), Chrome (again, not Google Canary) ignores position: sticky
 *   from both the <thead> and the <th> **unless** the <tr> is also sticky.
 *
 * Everything will work fine when Chrome gets its bugs fixed (as they seem to be in Google Canary).
 */

// props target: <table>
export const getTablePropsHook = (props, { instance }) => {
  const nextProps = {
    stickyHeader: instance.stickyHeader,
    stickyColumns: instance.hasStickyColumns,
  };

  return [props, nextProps];
};

// props target: <table><thead>
export const getTableHeadPropsHook = (props, { instance }) => {
  const nextProps = {};
  if (instance.stickyHeader) {
    nextProps.stickyHeader = true;

    // To be removed when not needed (see comment above)
    if (instance.hasStickyColumns) {
      nextProps.style = { position: "sticky", zIndex: 3, top: 0, ...nextProps.style };
    }
  }

  return [props, nextProps];
};

// props target: <table><thead><tr>
export const getHeaderGroupPropsHook = (props, { instance }) => {
  const nextProps = instance.hasStickyColumns ? getRowProps(instance) : {};

  // To be removed when not needed (see comment above)
  if (instance.stickyHeader && instance.hasStickyColumns) {
    nextProps.style = { position: "sticky", top: 0, ...nextProps.style };
  }

  return [props, nextProps];
};

// props target: <table><thead><tr><th>
export const getHeaderPropsHook = (props, { instance, column }) => {
  const nextProps = instance.hasStickyColumns ? getCellProps(column, true) : {};

  // To be removed when not needed (see comment above)
  if (instance.stickyHeader && !instance.hasStickyColumns) {
    nextProps.style = { position: "sticky", top: 0, zIndex: 2, ...nextProps.style };
  }

  return [props, nextProps];
};

// props target: <table><tbody><tr>
export const getRowPropsHook = (props, { instance }) => {
  const nextProps = instance.hasStickyColumns ? getRowProps(instance) : {};

  return [props, nextProps];
};

// props target: <table><tbody><tr><td>
export const getCellPropsHook = (props, { instance, cell }) => {
  const nextProps = instance.hasStickyColumns ? getCellProps(cell.column, false) : {};

  return [props, nextProps];
};

const useSticky = (hooks) => {
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
