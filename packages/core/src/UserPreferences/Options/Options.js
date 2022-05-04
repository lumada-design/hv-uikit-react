import React, { useMemo, useState, useCallback } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import OptionsContext from "./OptionsContext";

const Options = ({ classes, className, onClick, children, ...others }) => {
  const [selected, setSelected] = useState();

  const onSelection = useCallback(
    (event, payload) => {
      setSelected(payload.id);
      onClick?.(event, payload);
    },
    [onClick]
  );

  const optionsStateContext = useMemo(
    () => ({
      selected,
      onSelection,
    }),
    [selected, onSelection]
  );

  return (
    <div className={clsx(className, classes.root)} {...others}>
      <OptionsContext.Provider value={optionsStateContext}>{children}</OptionsContext.Provider>
    </div>
  );
};

Options.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
  }),
  /**
   * Function call when a option is chosen.
   */
  onClick: PropTypes.func,
  /**
   * Children component.
   */
  children: PropTypes.node.isRequired,
};

export default withStyles(styles, { name: "HvUserPreferencesOptions" })(Options);
