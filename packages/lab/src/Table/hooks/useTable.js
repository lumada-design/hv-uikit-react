import { useMemo } from "react";
import { useTable, usePagination, useExpanded, useSortBy, useResizeColumns } from "react-table";

import useHvTableStyles from "./useTableStyles";

const toTitleCase = (str) => {
  return str
    .replace(/([^A-Z])([A-Z])/g, "$1 $2") // split cameCase
    .replace(/[_-]+/g, " ") // split snake_case and lisp-case
    .toLowerCase()
    .replace(/(^\w|\b\w)/g, (m) => m.toUpperCase()) // title case words
    .replace(/\s+/g, " ") // collapse repeated whitespace
    .trim(); // remove leading/trailing whitespace
};

const useDefaultData = (data) =>
  useMemo(() => {
    return data || [];
  }, [data]);

const useDefaultColumns = (columns, data) =>
  useMemo(() => {
    if (columns != null) {
      return columns;
    }

    const uniqueKeys = Object.keys(Object.assign({}, ...data));
    return uniqueKeys
      .filter((key) => !["subRows", "subComponent"].includes(key))
      .map((key) => ({
        accessor: key,
        Header: toTitleCase(key),
      }));
  }, [columns, data]);

const ensureCorePluginInstallation = (plugins, hvPluginName, corePluginToInstall) => {
  const indexOfCorePlugin = plugins.findIndex(
    (plugin) => plugin.pluginName === corePluginToInstall.pluginName
  );
  const indexOfHvPlugin = plugins.findIndex((plugin) => plugin.pluginName === hvPluginName);

  if (indexOfHvPlugin !== -1 && (indexOfCorePlugin === -1 || indexOfCorePlugin > indexOfHvPlugin)) {
    if (indexOfCorePlugin > -1) {
      plugins.splice(indexOfCorePlugin, 1);
    }

    plugins.splice(indexOfHvPlugin, 0, corePluginToInstall);
  }
};

const useInstanceHook = (instance) => {
  const { rowsById } = instance;

  Object.assign(instance, {
    initialRowsById: rowsById,
  });
};

const useHvTableSetup = (hooks) => {
  hooks.useInstance.push(useInstanceHook);
};

useHvTableSetup.pluginName = "useHvTableSetup";

const useHvTable = (props, ...plugins) => {
  const { data: dataProp, columns: columnsProp, ...others } = props;

  const data = useDefaultData(dataProp);
  const columns = useDefaultColumns(columnsProp, data);

  ensureCorePluginInstallation(plugins, "useHvPagination", usePagination);
  ensureCorePluginInstallation(plugins, "useHvRowExpand", useExpanded);
  ensureCorePluginInstallation(plugins, "useHvSortBy", useSortBy);
  ensureCorePluginInstallation(plugins, "useHvResizeColumns", useResizeColumns);

  const indexOfHvTableStylesPlugin = plugins.findIndex(
    (plugin) => plugin.pluginName === "useHvTableStyles"
  );
  if (indexOfHvTableStylesPlugin === -1) {
    plugins.push(useHvTableStyles);
  }

  // main hook call
  return useTable(
    {
      data,
      columns,
      ...others,
    },
    useHvTableSetup,
    ...plugins
  );
};

export default useHvTable;
