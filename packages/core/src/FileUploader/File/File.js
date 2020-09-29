import React from "react";
import PropTypes from "prop-types";
import { IconButton, withStyles } from "@material-ui/core";
import Fail from "@hv/uikit-react-icons/dist/Fail";
import Close from "@hv/uikit-react-icons/dist/Close";
import Success from "@hv/uikit-react-icons/dist/Success";
import HvTypography from "../../Typography";
import { setId } from "../../utils/setId";
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

const getProgressText = (classes, data) => {
  const hasFailed = data.status === "fail";

  return (
    <>
      {`\xa0|\xa0`}

      {!hasFailed && data.progress != null && (
        <HvTypography variant="highlightText">{`${convertUnits(data.progress)}`}</HvTypography>
      )}

      {!hasFailed && data.size && (
        <HvTypography>{`\xa0/\xa0${convertUnits(data.size)}`}</HvTypography>
      )}

      {hasFailed && data.errorMessage && (
        <HvTypography className={classes.fail}>{data.errorMessage}</HvTypography>
      )}
    </>
  );
};

const getProgressBarWith = ({ size, progress }) => {
  const width = Math.round((progress * 100) / size);

  return width;
};

const File = ({ id, classes, data, onFileRemoved, removeFileButtonLabel }) => {
  const hasError = data.status === "fail";
  const inProgress = data.status === "progress";
  const progressText = getProgressText(classes, data);
  const statusIcon = getStatusIcon(classes, data.status);

  const currentProgress = getProgressBarWith(data);

  return (
    <li>
      {!hasError && inProgress && <span className={classes.progressbarBack} />}

      {!hasError && inProgress && (
        <progress
          className={classes.progressbar}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={currentProgress}
          style={{ width: `${currentProgress}%` }}
        />
      )}

      {statusIcon}

      <HvTypography noWrap className={classes.nameText} variant="highlightText">
        {data.name}
      </HvTypography>

      <span className={classes.progressTextContainer}>{progressText}</span>

      <IconButton
        id={setId(id, "remove-button")}
        aria-label={removeFileButtonLabel}
        className={classes.removeButton}
        category="ghost"
        onClick={() => onFileRemoved?.(data)}
      >
        <Close iconSize="XS" />
      </IconButton>
    </li>
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
  classes: PropTypes.shape({
    /**
     * Style applied to the progress bar.
     */
    progressbar: PropTypes.string,
    /**
     * Style applied to the progress bar background.
     */
    progressbarBack: PropTypes.string,
    /**
     * Style applied to the file name.
     */
    nameText: PropTypes.string,
    /**
     * Style applied to the container of the progress bar.
     */
    progressTextContainer: PropTypes.string,
    /**
     * Style applied to the remove button.
     */
    removeButton: PropTypes.string,
  }).isRequired,
  /**
   * File information to be displayed
   */
  data: PropTypes.shape({
    /**
     * The file id.
     */
    id: PropTypes.string,
    /**
     * The file name.
     */
    name: PropTypes.string,
    /**
     * The upload status.
     */
    status: PropTypes.oneOf(["progress", "success", "fail"]),
  }).isRequired,
  /**
   * Callback fired when file is removed from list.
   */
  onFileRemoved: PropTypes.func.isRequired,
  /**
   * Value of aria-label to apply to remove file button in filelist
   * */
  removeFileButtonLabel: PropTypes.string.isRequired,
};

export default withStyles(styles, { name: "HvFileUploaderFile" })(File);
