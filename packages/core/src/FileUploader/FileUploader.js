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
import DropZone from "./DropZone";
import FileList from "./FileList";

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
  inputElementLabel: "Dropzone Input Element"
};

const FileUploader = ({
  labels,
  fileList,
  multiple,
  maxFileSize,
  acceptedFiles,
  onFilesAdded,
  onFileRemoved
}) => (
  <>
    <DropZone
      labels={labels}
      multiple={multiple}
      acceptedFiles={acceptedFiles}
      maxFileSize={maxFileSize}
      onFilesAdded={onFilesAdded}
    />
    <FileList
      list={fileList}
      progressConjunctionLabel={labels.progressConjunction}
      onFileRemoved={onFileRemoved}
      removeFileButtonLabel={labels.removeFileButtonLabel}
    />
  </>
);

FileUploader.propTypes = {
  /**
   * An object containing all the labels.
   *
   * - progressConjunction: The label used in the middle of the progress message.
   */
  labels: PropTypes.shape({
    progressConjunction: PropTypes.string,
    /**
     * Dropzone area label.
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
    /**
     * Value of label associated with dropzone input
     * */
    inputElementLabel: PropTypes.string
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
      status: PropTypes.oneOf(["progress", "success", "fail"])
    })
  ).isRequired,
  /**
   * Whether the Dropzone should accept multiple files at once.
   */
  multiple: PropTypes.bool,
  /**
   * Max upload size
   * */
  maxFileSize: PropTypes.number,
  /**
   * Files extensions accepted for upload.
   */
  acceptedFiles: PropTypes.arrayOf(PropTypes.string),
  /**
   * Callback fired when files are addded.
   */
  onFilesAdded: PropTypes.func,
  /**
   * Callback fired when file is removed from list.
   */
  onFileRemoved: PropTypes.func
};

FileUploader.defaultProps = {
  labels: DEFAULT_LABELS,
  multiple: true,
  maxFileSize: Infinity,
  acceptedFiles: [],
  onFilesAdded: () => {},
  onFileRemoved: () => {}
};

export default FileUploader;
