import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import withLabels from "../withLabels";
import { setId } from "../utils/setId";
import DropZone from "./DropZone";
import FileList from "./FileList";
import styles from "./styles";

const DEFAULT_LABELS = {
  dropzone: "Label",
  progressConjunction: "of",
  sizeWarning: "Max. file size:",
  acceptedFiles: "Accepted files:",
  drag: "Drag and drop or",
  selectFiles: "Select files",
  dropFiles: "Drop files here",
  fileSizeError: "The file exceeds the maximum upload size",
  fileTypeError: "File type not allowed for upload",
  removeFileButtonLabel: "Remove File",
};

const FileUploader = ({
  id,
  className,
  labels,
  fileList,
  multiple = true,
  disabled = false,
  maxFileSize = Infinity,
  acceptedFiles = [],
  onFilesAdded,
  onFileRemoved,
  ...others
}) => {
  return (
    <div id={id} className={className} {...others}>
      <DropZone
        id={setId(id, "dropzone")}
        labels={labels}
        multiple={multiple}
        disabled={disabled}
        acceptedFiles={acceptedFiles}
        maxFileSize={maxFileSize}
        onFilesAdded={onFilesAdded}
      />
      <FileList
        id={setId(id, "filelist")}
        list={fileList}
        progressConjunctionLabel={labels.progressConjunction}
        onFileRemoved={onFileRemoved}
        removeFileButtonLabel={labels.removeFileButtonLabel}
      />
    </div>
  );
};

FileUploader.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * An object containing all the labels.
   *
   * - progressConjunction: The label used in the middle of the progress message.
   */
  labels: PropTypes.shape({
    /**
     *
     */
    acceptedFiles: PropTypes.string,
    /**
     *
     */
    progressConjunction: PropTypes.string,
    /**
     * DropZone area label.
     */
    dropzone: PropTypes.string,
    /**
     * Size file warning label.
     */
    sizeWarning: PropTypes.string,
    /**
     * Size file warning label.
     */
    drag: PropTypes.string,
    /**
     * Size file warning label.
     */
    selectFiles: PropTypes.string,
    /**
     * Theming sheet used to style components
     * */
    dropFiles: PropTypes.string,
    /**
     * Message to display when file size is greater than allowed
     * */
    fileSizeError: PropTypes.string,
    /**
     * Message to display when file type is greater than allowed
     * */
    fileTypeError: PropTypes.string,
    /**
     * Value of aria-label to apply to remove file button in filelist
     * */
    removeFileButtonLabel: PropTypes.string,
  }),
  /**
   * The files to upload.
   */
  fileList: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The file name.
       */
      name: PropTypes.string,
      /**
       * The file size in bytes.
       */
      size: PropTypes.number,
      /**
       * Upload progress in bytes.
       */
      progress: PropTypes.number,
      /**
       * Upload status.
       */
      status: PropTypes.oneOf(["progress", "success", "fail"]),
    })
  ).isRequired,
  /**
   * Whether the DropZone should accept multiple files at once.
   */
  multiple: PropTypes.bool,
  /**
   * If the input is disabled or not
   */
  disabled: PropTypes.bool,
  /**
   * Max upload size
   * */
  maxFileSize: PropTypes.number,
  /**
   * Files extensions accepted for upload.
   */
  acceptedFiles: PropTypes.arrayOf(PropTypes.string),
  /**
   * Callback fired when files are added.
   */
  onFilesAdded: PropTypes.func,
  /**
   * Callback fired when file is removed from list.
   */
  onFileRemoved: PropTypes.func,
};

export default withStyles(styles, { name: "HvFileUploader" })(
  withLabels(DEFAULT_LABELS)(FileUploader)
);
