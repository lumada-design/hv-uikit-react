import React, { useRef, useState } from "react";
import { Doc } from "@hitachivantara/uikit-react-icons";

import { setId } from "../../utils/setId";
import { useUniqueId } from "../../hooks/useUniqueId";
import { uniqueId } from "../../utils/helpers";
import { HvTypography } from "../../Typography";
import { HvInfoMessage, HvLabel } from "../../Forms";
import { ExtractNames } from "../../utils/classes";
import { useDefaultProps } from "../../hooks/useDefaultProps";

import { convertUnits } from "../utils";
import { HvFileData, HvFilesAddedEvent } from "../File";

import { staticClasses, useClasses } from "./DropZone.styles";

export { staticClasses as dropZoneClasses };

export type HvDropZoneClasses = ExtractNames<typeof useClasses>;

export interface HvDropZoneLabels {
  /**
   * Extensions of the accepted file types
   */
  acceptedFiles?: string;
  /**
   * Dropzone area label.
   */
  dropzone?: string;
  /**
   * Size file warning label.
   */
  sizeWarning?: string;
  /**
   * Size file warning label.
   */
  drag?: string;
  /**
   * Size file warning label.
   */
  selectFiles?: string;
  /**
   * Theming sheet used to style components
   * */
  dropFiles?: string;
  /**
   * Message to display when file size is greater than allowed
   * */
  fileSizeError?: string;
  /**
   * Message to display when file type is greater than allowed
   * */
  fileTypeError?: string;
}

export interface HvDropZoneProps {
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * Labels to present in FileUploader.
   */
  labels?: HvDropZoneLabels;
  /**
   * Whether the Dropzone should accept multiple files at once.
   */
  multiple?: boolean;
  /**
   * If the input is disabled or not
   */
  disabled?: boolean;
  /**
   * Files extensions accepted for upload.
   */
  accept?: React.InputHTMLAttributes<HTMLInputElement>["accept"];
  /**
   * Max upload size
   * */
  maxFileSize: number;
  /**
   * Function responsible for processing files added to the drop zone.
   */
  onFilesAdded?: HvFilesAddedEvent;
  /**
   * Whether the DropZone should hide labels or not.
   */
  hideLabels?: boolean;
  /**
   * Attributes applied to the input element.
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes?: HvDropZoneClasses;
}

// TODO: remove/review in `v6`: delegate to HTML `accept` and/or add custom validation
function validateAccept(file?: File, acceptAttr?: string) {
  if (!file || !acceptAttr) return true;

  const acceptEntries = acceptAttr.split(",");
  const fileName = file.name || "";
  const mimeType = (file.type || "").toLowerCase();
  const baseMimeType = mimeType.replace(/\/.*$/, "");

  return acceptEntries.some((type) => {
    const validType = type.trim().toLowerCase();
    if (validType.charAt(0) === ".") {
      return fileName.toLowerCase().endsWith(validType);
    }
    // This is something like a image/* mime type
    if (validType.endsWith("/*")) {
      return baseMimeType === validType.replace(/\/.*$/, "");
    }
    return mimeType === validType;
  });
}

export const HvDropZone = (props: HvDropZoneProps) => {
  const {
    id: idProp,
    classes: classesProp,
    labels,
    accept,
    maxFileSize,
    inputProps,
    hideLabels,
    multiple = true,
    disabled = false,
    onFilesAdded,
  } = useDefaultProps("HvDropZone", props);
  const id = useUniqueId(idProp, "dropzone");

  const { classes, cx } = useClasses(classesProp);

  const [dragState, setDragState] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDragLeave = () => {
    setDragState(false);
  };

  const handleDragEnter: React.DragEventHandler = (event) => {
    if (disabled) return;
    event.stopPropagation();
    event.preventDefault();
    setDragState(true);
  };

  const onChangeHandler = (filesList: FileList) => {
    const filesToProcess = Object.values(filesList);

    const newFiles = filesToProcess.map((file) => {
      const newFile: HvFileData = new File([file], file.name, {
        type: file.type,
        lastModified: file.lastModified,
      });
      newFile.id = uniqueId("uploaded-file-data-");

      const isSizeAllowed = file.size <= maxFileSize;
      const isFileAccepted =
        !accept ||
        accept.includes(file.type?.split("/")[1]) || // TODO: remove in v6
        validateAccept(file, accept);

      if (!isFileAccepted) {
        newFile.errorMessage = labels?.fileTypeError;
        newFile.status = "fail";
      } else if (!isSizeAllowed) {
        newFile.errorMessage = labels?.fileSizeError;
        newFile.status = "fail";
      }

      return newFile;
    });

    onFilesAdded?.(newFiles);
  };

  return (
    <>
      {!hideLabels && (
        <div id={id} className={classes.dropZoneLabelsGroup}>
          <HvLabel
            id={setId(id, "input-file-label")}
            htmlFor={setId(id, "input-file")}
            label={labels?.dropzone}
            className={classes.dropZoneLabel}
          />
          <HvInfoMessage id={setId(id, "description")}>
            {Number.isInteger(maxFileSize) &&
              `${labels?.sizeWarning} ${convertUnits(maxFileSize)}`}
            {labels?.acceptedFiles
              ? labels.acceptedFiles
              : accept && `\u00A0(${accept?.replaceAll(",", ", ")})`}
          </HvInfoMessage>
        </div>
      )}
      <div
        id={setId(id, "input-file-container")}
        className={cx(classes.dropZoneContainer, {
          [classes.dragAction]: dragState,
          [classes.dropZoneContainerDisabled]: disabled,
        })}
      >
        <input
          id={setId(id, "input-file")}
          className={classes.inputArea}
          type="file"
          multiple={multiple}
          disabled={disabled}
          title={!disabled ? `${labels?.drag}\xa0${labels?.selectFiles}` : ""}
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = "";
            }
          }}
          onChange={() => {
            if (!disabled && inputRef.current?.files) {
              onChangeHandler(inputRef.current.files);
            }
          }}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDropCapture={handleDragLeave}
          onDrop={(event) => {
            if (disabled) return;

            const { files } = event.dataTransfer;
            if (multiple === true || files.length === 1) {
              event.stopPropagation();
              event.preventDefault();
              onChangeHandler(files);
            }
          }}
          ref={inputRef}
          accept={accept}
          {...inputProps}
        />
        <div className={classes?.dropArea}>
          {dragState ? (
            <div className={classes.dropZoneAreaLabels}>
              <HvTypography className={classes.dragText}>
                {labels?.dropFiles}
              </HvTypography>
            </div>
          ) : (
            <>
              <Doc
                iconSize="M"
                className={classes.dropZoneAreaIcon}
                color={disabled ? "secondary_60" : "secondary"}
              />
              <div className={classes.dropZoneAreaLabels}>
                <HvTypography className={classes.dragText}>
                  {labels?.drag}
                  <span
                    className={classes.selectFilesText}
                  >{`\xa0${labels?.selectFiles}`}</span>
                </HvTypography>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
