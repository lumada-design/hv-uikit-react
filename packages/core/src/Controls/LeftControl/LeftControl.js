import React from "react";
import PropTypes from "prop-types";
import HvInput from "../../Input/Input";

import useStyles from "./styles";

const LeftControl = ({
  children,
  placeholder = "Search",
  _setGlobalFilter,
  onSearchChange,
  search = true,
}) => {
  const styles = useStyles();

  const onChangeFilter = (value) => {
    _setGlobalFilter(value || undefined);
    onSearchChange?.();
  };

  return (
    <div className={styles.root}>
      {search && (
        <HvInput
          type="search"
          aria-label="Search content"
          placeholder={placeholder}
          onChange={(e) => onChangeFilter(e.target.value)}
        />
      )}
      {children}
    </div>
  );
};

LeftControl.propTypes = {
  /** Children to be rendered. */
  children: PropTypes.node,
  /** Placeholder text to be show within the search input. */
  placeholder: PropTypes.string,
  _setGlobalFilter: PropTypes.func,
  /** Callback fired when the user starts to type in the search field. */
  onSearchChange: PropTypes.func,
  /** Boolean to control whether if the search input should appears or not. */
  search: PropTypes.bool,
};

export default LeftControl;
