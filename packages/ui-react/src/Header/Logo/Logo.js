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
import Typography from "@material-ui/core/Typography";

const getProductLogo = ( classes, productLogo ) => {
  if( productLogo ) {
    return (
        <img
            src={productLogo}
            className={classes.productLogoImage}
        />
    );
  }
};

const getProductName = ( classes, productName ) => {
  if( productName ) {
    return (
        <div className={classes.productLogoText}>
          <Typography className={classes.productLogoText1}>
            { productName }
          </Typography>
        </div>
    );
  }
};

const Logo = ({ classes, companyLogo, productLogo, productName }) => (
  <div className={classes.companyLogoContainer}>
    <img
      src={companyLogo}
      className={classes.companyLogoImage}
      alt="Company logo"
    />
    <span className={classes.separator} />
    { getProductLogo(classes, productLogo) }
    { getProductName(classes, productName) }
  </div>
);

Logo.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  companyLogo: PropTypes.string,
  productLogo: PropTypes.string,
  productName: PropTypes.string
};

Logo.defaultProps = {
  companyLogo: null,
  productLogo: null,
  productName: null
};

export default Logo;
