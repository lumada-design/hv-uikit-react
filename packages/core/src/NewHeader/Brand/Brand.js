/*
 * Copyright 2020 Hitachi Vantara Corporation
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
import HvTypography from "../../Typography";
import useUniqueId from "../../useUniqueId";

const Brand = ({ classes, id, logo, name }) => {
  const uniqueId = useUniqueId(id, "hv-brand-");

  return (
    <div id={uniqueId} className={classes.root}>
      {logo}
      {logo && name && <div className={classes.separator} />}
      {name && <HvTypography variant="highlightText">{name}</HvTypography>}
    </div>
  );
};

Brand.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the separator component class.
     */
    separator: PropTypes.string
  }).isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * The brand image node.
   */
  logo: PropTypes.node,
  /**
   * The brand name string.
   */
  name: PropTypes.string
};

Brand.defaultProps = {
  id: undefined,
  logo: null,
  name: null
};

export default Brand;
