import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import clsx from "clsx";
import accept from "attr-accept";
import { withStyles } from "@material-ui/core";
import { Doc } from "@hv/uikit-react-icons";
import { isKeypress, KeyboardCodes } from "../../utils";
import HvTypography from "../../Typography";
import { convertUnits } from "../utils";
import { setId, HvLabel, HvInfoMessage } from "../..";
import withId from "../../withId";
import styles from "./styles";

const DropZone = ({
  id,
  classes,
  labels,
  multiple = true,
  disabled = false,
  acceptedFiles,
  maxFileSize,
  onFilesAdded,
  inputProps,
  showLabels,
}) => {
  const [dragState, setDrag] = useState(false);
  const inputRef = useRef();

  const leaveDropArea = () => {
    setDrag(false);
  };

  const enterDropArea = () => {
    setDrag(true);
  };

  const onChangeHandler = (evt) => {
    const filesToProcess = Object.keys(evt).map((e) => evt[e]);

    const newFiles = [];

    filesToProcess.forEach((file) => {
      const newFile = file;

      const isSizeAllowed = file.size <= maxFileSize;
      const isFileAccepted =
        !acceptedFiles.length ||
        acceptedFiles.indexOf(file.type.split("/")[1]) > -1 ||
        acceptedFiles.some((acceptExtension) =>
          accept({ name: file.name, type: file.type }, acceptExtension)
        );

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

    onFilesAdded?.(newFiles);
  };

  return (
    <>
      {showLabels && (
        <div id={id} className={classes.dropZoneLabelsGroup} aria-label="File Dropzone">
          <HvLabel
            id={setId(id, "input-file-label")}
            htmlFor={setId(id, "input-file")}
            label={labels.dropzone}
          />
          <HvInfoMessage id={setId(id, "description")}>
            {Number.isInteger(maxFileSize) && `${labels.sizeWarning} ${convertUnits(maxFileSize)}`}
            {labels.acceptedFiles && labels.acceptedFiles}
            {!labels.acceptedFiles &&
              acceptedFiles.length > 0 &&
              `\u00A0(${acceptedFiles.join(", ")})`}
          </HvInfoMessage>
        </div>
      )}

      <div
        id={setId(id, "button")}
        className={clsx(classes.dropZoneContainer, {
          [classes.dragAction]: dragState,
          [classes.dropZoneContainerDisabled]: disabled,
        })}
        role="button"
        tabIndex={0}
        onDragEnter={(event) => {
          if (!disabled) {
            enterDropArea();
            event.stopPropagation();
            event.preventDefault();
          }
        }}
        onDragLeave={leaveDropArea}
        onDropCapture={leaveDropArea}
        onDragOver={(event) => {
          if (!disabled) {
            enterDropArea();
            event.stopPropagation();
            event.preventDefault();
          }
        }}
        onDrop={(event) => {
          if (!disabled) {
            const { files } = event.dataTransfer;
            if (multiple === true || files.length === 1) {
              event.stopPropagation();
              event.preventDefault();
              onChangeHandler(files);
            }
          }
        }}
        onKeyDown={(e) => {
          if (isKeypress(e, KeyboardCodes.Enter) || isKeypress(e, 32)) {
            inputRef.current.click();
          }
        }}
      >
        <input
          id={setId(id, "input-file")}
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
          accept={acceptedFiles.join(",")}
          {...inputProps}
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
                color={disabled ? "atmo4" : "acce1"}
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
    selectFilesText: PropTypes.string,
  }).isRequired,
  /**
   * Labels to present in Fileuploader.
   */
  labels: PropTypes.instanceOf(Object),
  /**
   * Whether the Dropzone should accept multiple files at once.
   */
  multiple: PropTypes.bool,
  /**
   * If the input is disabled or not
   */
  disabled: PropTypes.bool,
  /**
   * Files extensions accepted for upload. Follows https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
   */
  acceptedFiles: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Max upload size
   * */
  maxFileSize: PropTypes.number.isRequired,
  /**
   * Function responsible for processing files added to the drop zone.
   */
  onFilesAdded: PropTypes.func,
  /**
   * Whether the DropZone should show labels or not.
   */
  showLabels: PropTypes.bool,
  /**
   * Attributes applied to the input element.
   */
  inputProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvFileUploaderDropZone" })(withId(DropZone));
