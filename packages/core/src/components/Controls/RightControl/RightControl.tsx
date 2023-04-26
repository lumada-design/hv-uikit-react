import { clsx } from "clsx";
import { useContext, useState } from "react";
import { HvBaseProps } from "@core/types";
import { setId } from "@core/utils";
import { HvDropdownProps, HvListValue } from "@core/components";
import { StyledDropdown, StyledRoot } from "./RightControl.styles";
import rightControlClasses, {
  HvRightControlClasses,
} from "./rightControlClasses";
import { HvControlsContext } from "../context/ControlsContext";

export interface HvRightListControls extends HvListValue {
  accessor: string;
  desc: boolean;
}

export interface HvRightControlProps extends HvBaseProps {
  /** if `true` the hide sort by dropdown is not rendered */
  hideSortBy?: boolean;
  /** options for the dropdown to sort */
  values?: HvRightListControls[];
  /** Callback called when a sort action occurs */
  onSort?: (selected: HvRightListControls | undefined) => void;
  /** Extra props passed to dropdown */
  sortProps?: HvDropdownProps;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvRightControlClasses;
}

export const HvRightControl = ({
  id,
  classes,
  className,
  children,
  values,
  onSort,
  hideSortBy = false,
  sortProps,
  ...others
}: HvRightControlProps) => {
  const [dropDownValues, setDropdownValues] = useState(values);

  const { onSort: onSortHandler } = useContext(HvControlsContext);

  const handleChangeSort = (value) => {
    onSort?.(value);
    onSortHandler?.(value);
    // this should be changed when dropdown changes his "values" behavior
    setDropdownValues((prevValues) =>
      prevValues?.map((prevValue) => ({
        ...prevValue,
        selected: prevValue.id === value.id,
      }))
    );
  };

  return (
    <StyledRoot
      id={id}
      className={clsx(className, rightControlClasses.root, classes?.root)}
      {...others}
    >
      {!hideSortBy && (
        <StyledDropdown
          id={setId(id, "sort-by-dropdown")}
          values={dropDownValues}
          className={clsx(
            rightControlClasses.sortDropdown,
            classes?.sortDropdown
          )}
          onChange={handleChangeSort}
          singleSelectionToggle={false}
          {...sortProps}
        />
      )}
      {children}
    </StyledRoot>
  );
};
