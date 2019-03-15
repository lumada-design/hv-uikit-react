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
import isNill from "lodash/isNil";
import classNames from "classnames";
import ImageContainer from "../ImageContainer";

/**
 * Separator element between company and product information.
 *
 * @param classes
 * @returns {*}
 * @constructor
 */
// eslint-disable-next-line react/prop-types
const Separator = ({ classes }) => (
  <div className={classes.separatorBox}>
    <div className={classes.separator} />
    <div className={classes.separatorPadding} />
  </div>
);

/**
 * Product text title.
 *
 * @param textContainerClassName
 * @param text
 * @returns {*}
 * @constructor
 */
// eslint-disable-next-line react/prop-types
const ElementContainer = ({ classes, text, existLogo }) => (
  <div
    className={classNames(classes.productLogoTextContainer, {
      [classes.paddingTextLeft]: existLogo
    })}
  >
    <Typography variant="subtitle1">{text}</Typography>
  </div>
);

/**
 * Brand container. It may contain a company logo, product logo and product text.
 *
 * @param classes
 * @param companyLogo
 * @param productLogo
 * @param productText
 * @returns {*}
 * @constructor
 */
const Brand = ({ classes, companyLogo, productLogo, productText }) => {
  const existSeparator =
    !isNill(companyLogo) && !(isNill(productLogo) && isNill(productText));

  return (
    <div className={classes.brandContainer}>
      {companyLogo && (
        <ImageContainer
          image={companyLogo}
          containerClassName={classes.iconContainer}
        />
      )}
      {existSeparator && <Separator classes={classes} />}
      {productLogo && (
        <ImageContainer
          image={productLogo}
          containerClassName={classes.iconContainer}
        />
      )}
      {productText && (
        <ElementContainer
          classes={classes}
          text={productText}
          existLogo={!isNill(productLogo)}
        />
      )}
    </div>
  );
};

Brand.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Company logo. Can be a path for a image or a component.
   */
  companyLogo: PropTypes.node,
  /**
   * Product logo. Can be a path for a image or a component.
   */
  productLogo: PropTypes.node,
  /**
   * Product text.
   */
  productText: PropTypes.string
};

Brand.defaultProps = {
  companyLogo: null,
  productLogo: null,
  productText: null
};

export default Brand;
