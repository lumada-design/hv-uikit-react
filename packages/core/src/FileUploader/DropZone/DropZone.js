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

import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { KeyboardCodes, isKeypress } from "@hv/uikit-common-utils/dist";
import uniqueId from "lodash/uniqueId";
import classnames from "classnames";
import Doc from "@hv/uikit-react-icons/dist/Generic/Doc";
import HvTypography from "../../Typography";
import { convertUnits } from "../utils";

const DropZone = ({
  id,
  classes,
  labels,
  multiple,
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
        !acceptedFiles.length ||
        acceptedFiles.indexOf(file.type.split("/")[1]) > -1;

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
      <div
        id={fileDropZoneId}
        className={classes.dropzoneLabelsGroup}
        aria-label="File Dropzone"
      >
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
            <HvTypography variant="labelText">
              {labels.acceptedFiles}
            </HvTypography>
            <HvTypography variant="infoText">
              {acceptedFiles.join(", ")}
            </HvTypography>
          </>
        )}
      </div>

      <div
        id={`${fileDropZoneId}-button`}
        className={classnames(classes.dropzoneContainer, {
          [classes.dragAction]: dragState
        })}
        role="button"
        tabIndex={0}
        onDragEnter={event => {
          enterDropArea();
          event.stopPropagation();
          event.preventDefault();
        }}
        onDragLeave={leaveDropArea}
        onDropCapture={leaveDropArea}
        onDragOver={event => {
          enterDropArea();
          event.stopPropagation();
          event.preventDefault();
        }}
        onDrop={event => {
          event.stopPropagation();
          event.preventDefault();
          onChangeHandler(event.dataTransfer.files);
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
          onClick={() => {
            inputRef.current.value = null;
          }}
          onChange={() => {
            onChangeHandler(inputRef.current.files);
          }}
          ref={inputRef}
        />

        <div className={classes.dropArea}>
          {dragState ? (
            <>
              <div className={classes.dropzoneAreaLabels}>
                <HvTypography className={classes.drag}>
                  {labels.dropFiles}
                </HvTypography>
              </div>
            </>
          ) : (
            <>
              <Doc iconSize="M" className={classes.dropzoneAreaIcon} />
              <div className={classes.dropzoneAreaLabels}>
                <HvTypography className={classes.drag}>
                  {labels.drag}
                  <span className={classes.selectFilesText}>
                    {`\xa0${labels.selectFiles}`}
                  </span>
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
     * Styles applied to the root element.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the root element.
     */
    dropzoneContainer: PropTypes.string
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
  onFilesAdded: () => {}
};

export default DropZone;
