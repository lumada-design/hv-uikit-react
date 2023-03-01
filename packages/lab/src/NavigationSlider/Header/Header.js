import React from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";

import { HvButton, HvTypography } from "@hitachivantara/uikit-react-core";
import { Backwards } from "@hitachivantara/uikit-react-icons";

import useStyles from "./styles";

const Header = ({ id, title, showBackButton, headerHeight, onBackButtonClick }) => {
  const classes = useStyles({ headerHeight })();

  const backButtonClickHandler = () => {
    onBackButtonClick();
  };

  return (
    <div id={id} className={classes.menuContainer}>
      <div className={classes.button}>
        {showBackButton && (
          <HvButton icon onClick={backButtonClickHandler}>
            <Backwards iconSize="XS" />
          </HvButton>
        )}
      </div>

      <div className={`${classes.title} ${classes.justifyContentCenter}`}>
        {title && <HvTypography variant="highlightText">{title}</HvTypography>}
      </div>
    </div>
  );
};

Header.propTypes = {
  /**
   * Id to be applied to the root node of the panel.
   */
  id: PropTypes.string,
  /**
   * The text to be displayed on the header.
   */
  title: PropTypes.string,
  /**
   * Flag to show / hide the back button.
   */
  showBackButton: PropTypes.bool,
  /**
   * The header height.
   */
  headerHeight: PropTypes.number,
  /**
   * Callback function triggered when the back button is clicked.
   */
  onBackButtonClick: PropTypes.func,
};

Header.defaultProps = {
  headerHeight: 80,
};

export default withStyles(useStyles, { name: "Header" })(Header);
