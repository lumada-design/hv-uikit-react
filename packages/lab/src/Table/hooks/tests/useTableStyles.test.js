import useTableStyles from "../useTableStyles";

import * as useTableStylesHooks from "../useTableStyles";

describe("useHvTableStyles", () => {
  it("registers hooks", () => {
    const hooks = {
      getHeaderProps: { push: jest.fn() },
      getFooterProps: { push: jest.fn() },
      getRowProps: { push: jest.fn() },
      getCellProps: { push: jest.fn() },
    };

    useTableStyles(hooks);

    // props target: <table><thead><tr><th>
    expect(hooks.getHeaderProps.push).toHaveBeenCalledWith(
      useTableStylesHooks.getHeaderFooterPropsHook
    );
    // props target: <table><tfoot><tr><td>
    expect(hooks.getFooterProps.push).toHaveBeenCalledWith(
      useTableStylesHooks.getHeaderFooterPropsHook
    );
    // props target: <table><tbody><tr>
    expect(hooks.getRowProps.push).toHaveBeenCalledWith(useTableStylesHooks.getRowPropsHook);
    // props target: <table><tbody><tr><td>
    expect(hooks.getCellProps.push).toHaveBeenCalledWith(useTableStylesHooks.getCellPropsHook);
  });

  describe("getHeaderProps/getFooterProps", () => {
    it("adds variant and align properties", () => {
      const existingProps = {};

      const [existing, props] = useTableStylesHooks.getHeaderFooterPropsHook(existingProps, {
        column: { variant: "variant_value", align: "align_value" },
      });

      expect(props.variant).toBe("variant_value");
      expect(props.align).toBe("align_value");

      // should return the other properties
      expect(existing).toBe(existingProps);
    });
  });

  describe("getRowProps", () => {
    it("adds hover property", () => {
      const existingProps = {};

      const [existing, props] = useTableStylesHooks.getRowPropsHook(existingProps, {});

      expect(props.hover).toBe(true);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });
  });

  describe("getCellProps", () => {
    it("adds variant and align properties", () => {
      const existingProps = {};

      const [existing, props] = useTableStylesHooks.getCellPropsHook(existingProps, {
        cell: { column: { variant: "variant_value", align: "align_value" } },
      });

      expect(props.variant).toBe("variant_value");
      expect(props.align).toBe("align_value");

      // should return the other properties
      expect(existing).toBe(existingProps);
    });
  });
});
