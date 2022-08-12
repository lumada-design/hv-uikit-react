import React, { useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { HvInput, setId } from "../..";
import { HvControlsContext } from "../context/ControlsContext";
import styleCreator from "./styles";

const HvLeftControl = ({
  id,
  classes,
  className,
  children,
  placeholder = "Search",
  onSearch,
  hideSearch = false,
  searchProps,
  ...others
}) => {
  const { onSearch: onSearchHandler } = useContext(HvControlsContext);

  const onChangeFilter = (e, value) => {
    onSearch?.(e, value);
    onSearchHandler?.(value);
  };

  return (
    <div id={id} className={clsx(className, classes.root)} {...others}>
      {!hideSearch && (
        <HvInput
          id={setId(id, "search-input")}
          type="search"
          placeholder={placeholder}
          onChange={(e, value) => onChangeFilter(e, value)}
          {...searchProps}
        />
      )}
      {children}
    </div>
  );
};

HvLeftControl.propTypes = {
  /** Children to be rendered. */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /** Children to be rendered. */
  children: PropTypes.node,
  /**
   * the classes object to be applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component.
     */
    root: PropTypes.string,
    /**
     * Style applied to the dropdown in charge of sorting.
     */
    sortDropdown: PropTypes.string,
  }).isRequired,
  /** Placeholder text to be show within the search input. */
  placeholder: PropTypes.string,
  /** Callback fired when the user starts to type in the search field. */
  onSearch: PropTypes.func,
  /** Boolean to control whether if the search input should appears or not. */
  hideSearch: PropTypes.bool,
  /**
   * Extra props to be passed onto the input
   */
  searchProps: PropTypes.object,
};

export default withStyles(styleCreator, { name: "HvLeftControl", withTheme: true })(HvLeftControl);
