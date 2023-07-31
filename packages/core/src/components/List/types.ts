import { HvExtraProps } from "@core/types/generic";

export interface HvListValue extends HvExtraProps {
  id?: string | number;
  label: React.ReactNode;
  searchValue?: string;
  selected?: boolean;
  disabled?: boolean;
  isHidden?: boolean;
  icon?:
    | React.ReactNode
    | ((params: {
        isDisabled?: boolean;
        isSelected?: boolean;
      }) => React.ReactNode);
  showNavIcon?: boolean;
  path?: string;
  params?: object;
  tabIndex?: number;
}

export interface HvListLabels {
  /** The label used for the All checkbox action. */
  selectAll?: string;
  /** The label used in the middle of the multi-selection count. */
  selectionConjunction?: string;
}
