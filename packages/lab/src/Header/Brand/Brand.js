/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import PropTypes from "prop-types";
import isNill from "lodash/isNil";
import classNames from "classnames";
import Hidden from "@material-ui/core/Hidden"
import Grid from "@material-ui/core/Grid"
import HvTypography from "@hv/uikit-react-core/dist/Typography";
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
    <HvTypography variant="highlightText">{text}</HvTypography>
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
      <Hidden implementation="css" mdDown>
        <Grid alignItems="center" wrap="nowrap" container>
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
        </Grid>
      </Hidden>
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
