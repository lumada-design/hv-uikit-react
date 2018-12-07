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

import critical from "./images/critical.svg";
import low from "./images/low.svg";
import major from "./images/major.svg";
import moderate from "./images/moderate.svg";

const PriorityIcon = ({ priority, width }) => {
  let icon;

  switch (priority) {
    case "CRITICAL":
      icon = critical;
      break;
    case "HIGH":
      icon = major;
      break;
    case "MEDIUM":
      icon = moderate;
      break;
    case "LOW":
      icon = low;
      break;
    default:
      icon = "";
      break;
  }

  return <img alt="" width={width} src={icon} />;
};

PriorityIcon.propTypes = {
  priority: PropTypes.string.isRequired,
  width: PropTypes.number
};

PriorityIcon.defaultProps = {
  width: 32
};

export default PriorityIcon;
