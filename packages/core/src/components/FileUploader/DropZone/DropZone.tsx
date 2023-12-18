import React, { useRef, useState } from "react";

import uniqueId from "lodash/uniqueId";

import accept from "attr-accept";

import { Doc } from "@hitachivantara/uikit-react-icons";

import { setId } from "@core/utils/setId";
import { useUniqueId } from "@core/hooks/useUniqueId";

import { HvTypography } from "@core/components/Typography";
import { HvInfoMessage, HvLabel } from "@core/components/Forms";
import { ExtractNames } from "@core/utils/classes";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

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
  acceptedFiles: string[];
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

export const HvDropZone = (props: HvDropZoneProps) => {
  const {
    id: idProp,
    classes: classesProp,
    labels,
    acceptedFiles,
    maxFileSize,
    inputProps,
    hideLabels,
    multiple = true,
    disabled = false,
    onFilesAdded,
  } = useDefaultProps("HvDropZone", props);
  const id = useUniqueId(idProp, "dropzone");

  const { classes, cx } = useClasses(classesProp);

  const [dragState, setDrag] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const leaveDropArea = () => {
    setDrag(false);
  };

  const enterDropArea = () => {
    setDrag(true);
  };

  const onChangeHandler = (filesList: FileList) => {
    const filesToProcess = Object.keys(filesList).map((e) => filesList[e]);

    const newFiles: HvFileData[] = [];

    filesToProcess.forEach((file: File) => {
      const newFile: HvFileData = file;

      const isSizeAllowed = file.size <= maxFileSize;
      const isFileAccepted =
        !acceptedFiles.length ||
        acceptedFiles.indexOf(file.type.split("/")[1]) > -1 ||
        acceptedFiles.some((acceptExtension) =>
          accept({ name: file.name, type: file.type }, acceptExtension)
        );

      if (!isFileAccepted) {
        newFile.errorMessage = labels?.fileTypeError;
        newFile.status = "fail";
      } else if (!isSizeAllowed) {
        newFile.errorMessage = labels?.fileSizeError;
        newFile.status = "fail";
      }

      newFile.id = uniqueId("uploaded-file-data-");
      newFiles.push(newFile);
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
            {labels?.acceptedFiles && labels.acceptedFiles}
            {!labels?.acceptedFiles &&
              acceptedFiles.length > 0 &&
              `\u00A0(${acceptedFiles.join(", ")})`}
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
          ref={inputRef}
          accept={acceptedFiles.join(",")}
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
