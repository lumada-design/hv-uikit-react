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

import React, { useState } from "react";
import PropTypes from "prop-types";
import Success from "@hv/uikit-react-icons/dist/Generic/Success";
import uniqueId from "lodash/uniqueId";
import Fail from "@hv/uikit-react-icons/dist/Generic/Fail";
import Close from "@hv/uikit-react-icons/dist/Generic/Close";
import HvTypography from "../../Typography";
import Button from "../../Button";
import { convertUnits } from "../utils";

const getStatusIcon = (classes, theme, status) => {
  const { sema1, sema4 } = theme.hv.palette.semantic;
  switch (status) {
    case "success":
      return <Success iconSize="S" className={classes.icon} color={[sema1]} />;
    case "fail":
      return <Fail iconSize="S" className={classes.icon} color={[sema4]} />;
    default:
      return <div className={classes.icon} />;
  }
};

const getProgressText = (classes, data, progressConjunctionLabel) => {
  const hasFailed = data.status === "fail";

  return (
    <>
      {!hasFailed && data.progress != null && (
        <HvTypography variant="labelText">
          {`${convertUnits(data.progress)} ${progressConjunctionLabel}`}
        </HvTypography>
      )}

      {!hasFailed && data.size && (
        <HvTypography variant="sText">
          {`\xa0${convertUnits(data.size)}`}
        </HvTypography>
      )}

      {hasFailed && data.errorMessage && (
        <HvTypography variant="sText" className={classes.fail}>
          {data.errorMessage}
        </HvTypography>
      )}
    </>
  );
};

const getProgressBarWith = ({ size, progress }) => {
  const width = Math.round((progress * 100) / size);

  return `${width}%`;
};

const File = ({
  id,
  theme,
  classes,
  data,
  progressConjunctionLabel,
  onFileRemoved,
  removeFileButtonLabel
}) => {
  const [fileId] = useState(id || uniqueId("hv-file-"));

  const hasError = data.status === "fail";
  const inProgress = data.status === "progress";
  const progressText = getProgressText(classes, data, progressConjunctionLabel);
  const statusIcon = getStatusIcon(classes, theme, data.status);

  return (
    <>
      {!hasError && inProgress && <span className={classes.progressbarBack} />}

      {!hasError && inProgress && (
        <span
          className={classes.progressbar}
          style={{ width: getProgressBarWith(data) }}
        />
      )}

      {statusIcon}

      <HvTypography className={classes.textTruncation} variant="sText">
        {data.name}
      </HvTypography>

      <span className={classes.progressText}>{progressText}</span>

      <Button
        id={`${fileId}-remove-button`}
        aria-label={removeFileButtonLabel}
        className={classes.removeButton}
        category="ghost"
        onClick={() => onFileRemoved(data)}
      >
        <Close iconSize="XS" className={classes.iconContainer} />
      </Button>
    </>
  );
};

File.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object).isRequired,
  /**
   * A Jss Object used to override or extend the styles applied to the Switch Component.
   */
  classes: PropTypes.shape({}).isRequired,
  /**
   * File information to be displayed
   */
  data: PropTypes.shape({}).isRequired,
  /**
   * Callback fired when file is removed from list.
   */
  onFileRemoved: PropTypes.func.isRequired,
  /**
   * File upload progress conjunction.
   */
  progressConjunctionLabel: PropTypes.string.isRequired,
  /**
   * Value of aria-label to apply to remove file button in filelist
   * */
  removeFileButtonLabel: PropTypes.string.isRequired
};

File.defaultProps = {
  id: null
};

export default File;
