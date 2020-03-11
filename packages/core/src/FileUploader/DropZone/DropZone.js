import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import Doc from "@hv/uikit-react-icons/dist/Doc";
import { KeyboardCodes, isKeypress } from "../../utils/KeyboardUtils";
import HvTypography from "../../Typography";
import { convertUnits } from "../utils";
import styles from "./styles";

const DropZone = ({
  id,
  classes,
  labels,
  multiple,
  disabled,
  acceptedFiles,
  maxFileSize,
  onFilesAdded
}) => {
  const [fileDropZoneId] = useState(id || uniqueId("hv-filedropzone-"));

  const [dragState, setDrag] = useState(false);

  const leaveDropArea = () => {
    setDrag(false);
  };

  const inputRef = useRef();

  const onChangeHandler = evt => {
    const filesToProcess = Object.keys(evt).map(e => evt[e]);

    const newFiles = [];

    filesToProcess.forEach(file => {
      const newFile = file;

      const isSizeAllowed = file.size <= maxFileSize;
      const isFileAccepted =
        !acceptedFiles.length || acceptedFiles.indexOf(file.type.split("/")[1]) > -1;

      if (!isFileAccepted) {
        newFile.errorMessage = labels.fileTypeError;
        newFile.status = "fail";
      } else if (!isSizeAllowed) {
        newFile.errorMessage = labels.fileSizeError;
        newFile.status = "fail";
      }

      newFile.id = uniqueId("uploaded-file-data-");

      newFiles.push(newFile);
    });

    onFilesAdded(newFiles);
  };

  const enterDropArea = () => {
    setDrag(true);
  };

  return (
    <>
      <div id={fileDropZoneId} className={classes.dropZoneLabelsGroup} aria-label="File Dropzone">
        <HvTypography
          variant="labelText"
          component="label"
          id={`${fileDropZoneId}-input-file-label`}
          htmlFor={`${fileDropZoneId}-input-file`}
        >
          {labels.dropzone}
        </HvTypography>

        <HvTypography variant="infoText">
          {`${labels.sizeWarning} ${convertUnits(maxFileSize)}`}
        </HvTypography>
        {acceptedFiles.length > 0 && (
          <>
            <HvTypography variant="labelText">{labels.acceptedFiles}</HvTypography>
            <HvTypography variant="infoText">{acceptedFiles.join(", ")}</HvTypography>
          </>
        )}
      </div>

      <div
        id={`${fileDropZoneId}-button`}
        className={clsx(classes.dropZoneContainer, {
          [classes.dragAction]: dragState,
          [classes.dropZoneContainerDisabled]: disabled
        })}
        role="button"
        tabIndex={0}
        onDragEnter={event => {
          if (!disabled) {
            enterDropArea();
            event.stopPropagation();
            event.preventDefault();
          }
        }}
        onDragLeave={leaveDropArea}
        onDropCapture={leaveDropArea}
        onDragOver={event => {
          if (!disabled) {
            enterDropArea();
            event.stopPropagation();
            event.preventDefault();
          }
        }}
        onDrop={event => {
          if (!disabled) {
            event.stopPropagation();
            event.preventDefault();
            onChangeHandler(event.dataTransfer.files);
          }
        }}
        onKeyDown={e => {
          if (isKeypress(e, KeyboardCodes.Enter) || isKeypress(e, 32)) {
            inputRef.current.click();
          }
        }}
      >
        <input
          id={`${fileDropZoneId}-input-file`}
          tabIndex={-1}
          className={classes.inputArea}
          type="file"
          multiple={multiple}
          disabled={disabled}
          title={!disabled ? `${labels.drag}\xa0${labels.selectFiles}` : ""}
          onClick={() => {
            inputRef.current.value = null;
          }}
          onChange={() => {
            if (!disabled) {
              onChangeHandler(inputRef.current.files);
            }
          }}
          ref={inputRef}
        />

        <div className={classes.dropArea}>
          {dragState ? (
            <>
              <div className={classes.dropZoneAreaLabels}>
                <HvTypography className={classes.dragText}>{labels.dropFiles}</HvTypography>
              </div>
            </>
          ) : (
            <>
              <Doc
                iconSize="M"
                className={classes.dropZoneAreaIcon}
                color={disabled ? "atmo6" : "acce1"}
              />
              <div className={classes.dropZoneAreaLabels}>
                <HvTypography className={classes.dragText}>
                  {labels.drag}
                  <span className={classes.selectFilesText}>{`\xa0${labels.selectFiles}`}</span>
                </HvTypography>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

DropZone.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the Switch Component.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the container element.
     */
    dropZoneContainer: PropTypes.string,
    /**
     * Styles applied to the labels group.
     */
    dropZoneLabelsGroup: PropTypes.string,
    /**
     * Style applied when dragging.
     */
    dragAction: PropTypes.string,
    /**
     * Style applied when the component is disabled.
     */
    dropZoneContainerDisabled: PropTypes.string,
    /**
     * Style applied to the input area.
     */
    inputArea: PropTypes.string,
    /**
     * Style applied to the drop area.
     */
    dropArea: PropTypes.string,
    /**
     * Style applied to the labels area.
     */
    dropZoneAreaLabels: PropTypes.string,
    /**
     * Style applied to the icon area.
     */
    dropZoneAreaIcon: PropTypes.string,
    /**
     * Style applied to the typography when dragging.
     */
    dragText: PropTypes.string,
    /**
     * Style applied to the selected files.
     */
    selectFilesText: PropTypes.string
  }).isRequired,
  /**
   * Labels to present in Fileuploader.
   */
  labels: PropTypes.instanceOf(Object).isRequired,
  /**
   * Whether the Dropzone should accept multiple files at once.
   */
  multiple: PropTypes.bool,
  /**
   * If the input is disabled or not
   */
  disabled: PropTypes.bool,
  /**
   * Files extensions accepted for upload.
   */
  acceptedFiles: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Max upload size
   * */
  maxFileSize: PropTypes.number.isRequired,
  /**
   * Function responsible for processing files added to the drop zone.
   */
  onFilesAdded: PropTypes.func
};

DropZone.defaultProps = {
  id: null,
  multiple: true,
  disabled: false,
  onFilesAdded: () => {}
};

export default withStyles(styles, { name: "HvFileUploaderDropZone" })(DropZone);
