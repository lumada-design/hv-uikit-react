export interface HvListValue extends Record<string, any> {
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
