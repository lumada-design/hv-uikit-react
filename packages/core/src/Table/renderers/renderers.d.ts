import { HvBaseSwitchProps, ListValueProp, HvTagProps } from "../..";
import { HvRowInstance, HvTableColumnConfig } from "..";

export function hvTextColumn<D extends Record<string, unknown>, C extends HvTableColumnConfig<D>>(
  col: C
): HvTableColumnConfig<D>;

export function hvNumberColumn<D extends Record<string, unknown>, C extends HvTableColumnConfig<D>>(
  col: C
): HvTableColumnConfig<D>;

export function hvDateColumn<D extends Record<string, unknown>, C extends HvTableColumnConfig<D>>(
  col: C,
  dateFormat?: string
): HvTableColumnConfig<D>;

export function hvExpandColumn<D extends Record<string, unknown>>(
  col: HvTableColumnConfig<D>,
  expandRowButtonAriaLabel: string,
  collapseRowButtonAriaLabel: string,
  getCanRowExpand?: (row: HvRowInstance<D>) => boolean
): HvTableColumnConfig<D>;

export function hvTagColumn<D extends Record<string, unknown>, C extends HvTableColumnConfig<D>>(
  col: C,
  valueDataKey: keyof D,
  colorDataKey: keyof D,
  textColorDataKey: keyof D,
  fromRowData: boolean,
  tagProps?: HvTagProps
): HvTableColumnConfig<D>;

export function hvSwitchColumn<D extends Record<string, unknown>, C extends HvTableColumnConfig<D>>(
  col: C,
  switchLabel: string,
  falseLabel?: string,
  trueLabel?: string,
  switchProps?: HvBaseSwitchProps
): HvTableColumnConfig<D>;

export function hvDropdownColumn<
  D extends Record<string, unknown>,
  C extends HvTableColumnConfig<D>
>(
  col: C,
  id: string,
  placeholder: string,
  disabledPlaceholder: string,
  onChange?: (identifier: string, value: ListValueProp) => void
): HvTableColumnConfig<D>;

export function hvProgressColumn<
  D extends Record<string, unknown>,
  C extends HvTableColumnConfig<D>
>(
  col: C,
  getPartial?: (row: HvRowInstance<D>) => number,
  getTotal?: (row: HvRowInstance<D>) => number,
  color?: "primary" | "secondary"
): HvTableColumnConfig<D>;
