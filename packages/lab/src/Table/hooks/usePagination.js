/* eslint-disable no-param-reassign */
import { makePropGetter, useGetLatest, ensurePluginOrder } from "react-table";

export const useInstanceHook = (instance) => {
  ensurePluginOrder(instance.plugins, ["usePagination"], "useHvPagination");

  const getInstance = useGetLatest(instance);
  const getHvPaginationProps = makePropGetter(instance.getHooks().getHvPaginationProps, {
    instance: getInstance(),
  });

  Object.assign(instance, {
    getHvPaginationProps,
  });
};

export const defaultGetHvPaginationProps = (props, { instance }) => {
  const {
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    setPageSize,
    state: { pageSize, pageIndex },
    labels,
  } = instance;

  const nextProps = {
    canPrevious: canPreviousPage,
    canNext: canNextPage,
    pages: pageOptions.length,
    page: pageIndex,
    pageSize,
    onPageChange: gotoPage,
    onPageSizeChange: setPageSize,
    labels,
  };

  return [props, nextProps];
};

const usePagination = (hooks) => {
  hooks.getHvPaginationProps = [defaultGetHvPaginationProps];

  hooks.useInstance.push(useInstanceHook);
};

usePagination.pluginName = "useHvPagination";

export default usePagination;
