import React, { useState } from "react";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import { IconButton, withStyles } from "@material-ui/core";
import Fail from "@hv/uikit-react-icons/dist/Generic/Fail";
import Close from "@hv/uikit-react-icons/dist/Generic/Close";
import Success from "@hv/uikit-react-icons/dist/Generic/Success";
import HvTypography from "../../Typography";
import { convertUnits } from "../utils";
import styles from "./styles";

const getStatusIcon = (classes, status) => {
  switch (status) {
    case "success":
      return <Success className={classes.icon} color="sema1" />;
    case "fail":
      return <Fail className={classes.icon} color="sema4" />;
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
  const statusIcon = getStatusIcon(classes, data.status);

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

      <IconButton
        id={`${fileId}-remove-button`}
        aria-label={removeFileButtonLabel}
        className={classes.removeButton}
        category="ghost"
        onClick={() => onFileRemoved(data)}
      >
        <Close iconSize="XS" className={classes.iconContainer} />
      </IconButton>
    </>
  );
};

File.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
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

export default withStyles(styles, { name: "HvFileUploaderFile" })(File);
