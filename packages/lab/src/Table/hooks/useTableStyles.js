// props target: <table><thead><tr><th>
export const getHeaderPropsHook = (props, { column }) => {
  const nextProps = {
    variant: column.variant,
    align: column.align,
  };

  return [props, nextProps];
};

// props target: <table><tbody><tr>
export const getRowPropsHook = (props) => {
  const nextProps = {
    hover: true,
  };

  return [props, nextProps];
};

// props target: <table><tbody><tr><td>
export const getCellPropsHook = (props, { cell }) => {
  const nextProps = {
    variant: cell.column.variant,
    align: cell.column.align,
  };

  return [props, nextProps];
};

const useTableStyles = (hooks) => {
  // props target: <table><thead><tr><th>
  hooks.getHeaderProps.push(getHeaderPropsHook);
  // props target: <table><tbody><tr>
  hooks.getRowProps.push(getRowPropsHook);
  // props target: <table><tbody><tr><td>
  hooks.getCellProps.push(getCellPropsHook);
};

useTableStyles.pluginName = "useHvTableStyles";

export default useTableStyles;
