/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Input from "@material-ui/core/Input";

const HvDropdownSearch = (props) => {

    const{ onChange, classes } = props;
    const iconButton = classNames([classes.icon, classes.searchIcon]);

    return (
      <>
        <div className={classes.searchContainer}>
          <Input
            classes={{
              input: classes.input
            }}
            className={classes.search} 
            onChange={onChange} 
          />
          <div className={iconButton} />
        </div>
      </>
    )
}

HvDropdownSearch.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  onChange: PropTypes.func
};

HvDropdownSearch.defaultProps = {
  onChange: () => {}
};

export default HvDropdownSearch;
