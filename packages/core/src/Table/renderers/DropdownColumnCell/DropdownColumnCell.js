import React from "react";
import PropTypes from "prop-types";
import { HvDropdown } from "../../..";

const HvDropdownColumnCell = ({ values, disabled, onChange, placeholder, dropdownProps }) => {
  return (
    <HvDropdown
      onChange={(item) => {
        onChange?.(item);
      }}
      placeholder={placeholder}
      disabled={disabled}
      values={values}
      disablePortal
      {...dropdownProps}
    />
  );
};

HvDropdownColumnCell.propTypes = {
  /**
   * values to render in the dropdown.
   */
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.node.isRequired,
      searchValue: PropTypes.string,
      value: PropTypes.any,
      selected: PropTypes.bool,
    })
  ),
  /**
   * The whether the dropdown is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Function called when there is change on the dropdown.
   */
  onChange: PropTypes.func,
  /**
   * Placeholder text for when the dropdown is empty.
   */
  placeholder: PropTypes.string,
  /**
   * Extra props to be passed onto the dropdown.
   */
  dropdownProps: PropTypes.instanceOf(Object),
};

export default HvDropdownColumnCell;
