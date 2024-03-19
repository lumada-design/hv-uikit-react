import { Hooks } from "react-table";

// #region ##### TYPES #####

export interface UseHvHeaderGroupsInstance {
  hasGroupedColumns?: boolean;
}

// props target: <table><thead><tr><th>
export interface UseHvHeaderGroupsColumnProps {
  style?: React.CSSProperties;
  groupColumnMostLeft?: boolean;
  groupColumnMostRight?: boolean;
}

// props target: <table><tbody><tr><td>
export interface UseHvHeaderGroupsCellProps {
  groupColumnMostLeft?: boolean;
  groupColumnMostRight?: boolean;
}

export type UseHvHeaderGroupsProps = (<
  D extends object = Record<string, unknown>
>(
  hooks: Hooks<D>
) => void) & { pluginName: string };

// #endregion ##### TYPES #####

/**
 * Moving non grouped headers to the top level,
 * by placing them in the position of their top level placeholder.
 *
 * By default the header groups are built bottom top,
 * that results in non grouped headers to be placed
 * at the bottom row in the table head.
 *
 * @param {Array.<Object>} headerGroups - table header groups
 */
const replaceHeaderPlaceholders = (headerGroups) => {
  const [headerGroup] = headerGroups;

  const hasPlaceholderHeaders = headerGroup.headers.some(
    (h) => h.placeholderOf != null
  );
  if (!hasPlaceholderHeaders) {
    return; // no placeholder header found to replace
  }

  const maxDepth = headerGroups.length - 1;
  const leafGroup = headerGroups[maxDepth];

  headerGroup.headers.forEach((header, position) => {
    const { placeholderOf } = header;

    const isPlaceholderHeader = placeholderOf != null;
    if (isPlaceholderHeader) {
      // is placeholder header
      const leafIndex =
        leafGroup.headers
          .slice(position)
          .findIndex(({ id }) => id === placeholderOf.id) + position;

      // store leaf placeholder header
      header.variant = placeholderOf.variant;
      header.depth = maxDepth;
      leafGroup.headers[leafIndex] = header;

      // replace placeholder with leaf header
      placeholderOf.rowSpan = maxDepth + 1;
      headerGroup.headers[position] = placeholderOf;
    }
  });
};

const getCellProps = (column, isHeaderCell = false) => ({
  groupColumnMostLeft: column.isGroupLeftColumn,
  groupColumnMostRight: column.isGroupRightColumn,
  rowSpan: isHeaderCell && column.rowSpan != null ? column.rowSpan : 1,
});

// props target: <table><thead><tr><th>
const getHeaderPropsHook = (props, { instance, column }) => {
  const nextProps: UseHvHeaderGroupsColumnProps = instance.hasGroupedColumns
    ? getCellProps(column, true)
    : {};

  if (instance.hasGroupedColumns) {
    const isPlaceholder = column.placeholderOf != null;

    nextProps.style = {
      display: isPlaceholder ? "none" : props.style?.display,
    };

    if (instance.hasStickyColumns) {
      if (isPlaceholder) {
        nextProps.style.visibility = "hidden";
      }

      if (column.rowSpan > 1) {
        // rowSpan doesn't work with flex, so we need to simulate it by adjusting the height value manually
        nextProps.style.height = `calc(var(--first-row-cell-height) + var(--cell-height) * ${
          column.rowSpan - 1
        })`;
      }
    }
  }

  return [props, nextProps];
};

// props target: <table><tbody><tr><td>
const getCellPropsHook = (props, { instance, cell }) => {
  const nextProps: UseHvHeaderGroupsCellProps = instance.hasGroupedColumns
    ? getCellProps(cell.column)
    : {};

  return [props, nextProps];
};

const visibleColumnsHook = (visibleColumns, { instance }) => {
  const parentList = new Set();

  visibleColumns.forEach(({ parent }) => {
    if (parent != null && !parentList.has(parent)) {
      parentList.add(parent);
    }
  });

  const hasGroupedColumns = parentList.size > 0;
  if (hasGroupedColumns) {
    parentList.forEach((parent: any) => {
      parent.align = "center";
      parent.isGroupLeftColumn = true;
      parent.isGroupRightColumn = true;

      const { columns } = parent;
      columns[0].isGroupLeftColumn = true;
      columns[columns.length - 1].isGroupRightColumn = true;
    });
  }

  Object.assign(instance, { hasGroupedColumns });

  return visibleColumns;
};

const useInstanceHook = (instance) => {
  if (instance.hasGroupedColumns) {
    replaceHeaderPlaceholders(instance.headerGroups);
  }
};

const useHeaderGroups: UseHvHeaderGroupsProps = (hooks) => {
  hooks.visibleColumns.push(visibleColumnsHook);
  hooks.useInstance.push(useInstanceHook);

  // props target: <table><thead><tr><th>
  hooks.getHeaderProps.push(getHeaderPropsHook);
  // props target: <table><tbody><tr><td>
  hooks.getCellProps.push(getCellPropsHook);
};

useHeaderGroups.pluginName = "useHvHeaderGroups";

export default useHeaderGroups;
