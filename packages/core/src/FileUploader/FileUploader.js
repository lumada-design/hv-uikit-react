import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { setId, useLabels } from "../utils";
import DropZone from "./DropZone";
import FileList from "./FileList";
import styles from "./styles";

// TODO: this component needs to adopt the Form element shape and deprecate its way of composing labels

const DEFAULT_LABELS = {
  dropzone: "Label",
  sizeWarning: "Max. file size:",
  drag: "Drop files here or",
  selectFiles: "click to upload",
  dropFiles: "Drop files here",
  fileSizeError: "The file exceeds the maximum upload size",
  fileTypeError: "File type not allowed for upload",
  removeFileButtonLabel: "Remove File",
};

/**
 * Lets the user choose one or more files from their device storage. Once chosen,
 * the files can be uploaded to a server or manipulated on the client side.
 *
 * Accepted file types follow the format of the html input accept attribute. Please check https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file for more details.
 */
const FileUploader = ({
  id,
  className,
  labels: labelsProp,
  fileList,
  multiple = true,
  disabled = false,
  maxFileSize = Infinity,
  acceptedFiles = [],
  onFilesAdded,
  onFileRemoved,

  hideLabels = false,
  inputProps = {},
  ...others
}) => {
  const labels = useLabels(DEFAULT_LABELS, labelsProp);

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
        inputProps={inputProps}
        hideLabels={hideLabels}
      />
      <FileList
        id={setId(id, "filelist")}
        list={fileList}
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
   */
  labels: PropTypes.shape({
    /**
     * Accepted file list label
     */
    acceptedFiles: PropTypes.string,
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
      /**
       * Optional node representing a preview of the uploaded file.
       */
      preview: PropTypes.node,
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
  /**
   * Whether the DropZone should hide labels or not.
   */
  hideLabels: PropTypes.bool,
  /**
   * Attributes applied to the input element.
   */
  inputProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvFileUploader" })(FileUploader);
