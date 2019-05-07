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
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import classNames from "classnames";
import HvTypography from "../../Typography";
import { mapSeverityToVariant, severityIcon } from "./VariantUtils";

/**
 * Title component of the modal.
 *
 * @param classes
 * @param children
 * @param disableTypography
 * @param others
 * @returns {*}
 * @constructor
 */
const ModalTitle = ({
  classes,
  className,
  children,
  variant,
  showIcon,
  customIcon,
  theme,
  ...others
}) => {
  const isString = typeof children === "string";

  let icon = null;
  // inject the correct classes to the icon
  if (customIcon) {
    icon = React.cloneElement(customIcon, { className: classes.icon });
  } else if (showIcon) {
    icon = React.cloneElement(
      severityIcon(mapSeverityToVariant(variant), theme),
      {
        className: classes.icon
      }
    );
  }

  return (
    <MuiDialogTitle
      className={classNames(classes.root, className)}
      disableTypography
      {...others}
    >
      <div className={classes.messageContainer}>
        {icon}
        <div className={classNames({ [classes.textWithIcon]: icon })}>
          {!isString && children}
          {isString && <HvTypography variant="sTitle">{children}</HvTypography>}
        </div>
      </div>
    </MuiDialogTitle>
  );
};

ModalTitle.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component (container for the title).
     */
    root: PropTypes.string,
    /**
     * Style applied to the container of the title
     */
    messageContainer: PropTypes.string,
    /**
     * Style applied to the text when the icon is present.
     */
    textWithIcon: PropTypes.string,
    /**
     * Style applied to the icon.
     */
    icon: PropTypes.string
  }).isRequired,
  /**
   * Variant of the modal.
   */
  variant: PropTypes.oneOf(["success", "warning", "error", "info", "default"]),
  /**
   * Controls if the associated icon to the variant should be shown.
   */
  showIcon: PropTypes.bool,
  /**
   * Custom icon to replace the variant default.
   */
  customIcon: PropTypes.node,
  /**
   * Node to be render.
   */
  children: PropTypes.node.isRequired,
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object)
};

ModalTitle.defaultProps = {
  className: "",
  variant: "default",
  customIcon: null,
  showIcon: true,
  theme: undefined
};

export default ModalTitle;
