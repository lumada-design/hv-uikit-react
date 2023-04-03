import { HvFileData, HvFilesAddedEvent } from "../File";
import dropZoneClasses, { HvDropZoneClasses } from "./dropZoneClasses";
import React, { useRef, useState } from "react";
import uniqueId from "lodash/uniqueId";
import accept from "attr-accept";
import {
  StyledDragText,
  StyledDropArea,
  StyledDropAreaIcon,
  StyledDropAreaLabel,
  StyledDropAreaLabels,
  StyledDropZoneContainer,
  StyledDropZoneLabelsGroup,
  StyledInfoMessage,
  StyledInput,
  StyledLabel,
  StyledSelectedFilesText,
} from "./DropZone.styles";
import clsx from "clsx";
import { isKeypress, keyboardCodes, setId } from "utils";
import { convertUnits } from "../utils";
import withId from "../../../hocs/withId";

export type HvDropZoneLabels = {
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
};

export type HvDropZoneProps = {
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
};

export const HvDropZone = withId(
  ({
    id,
    classes,
    labels,
    acceptedFiles,
    maxFileSize,
    inputProps,
    hideLabels,
    multiple = true,
    disabled = false,
    onFilesAdded,
  }: HvDropZoneProps) => {
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
          <StyledDropZoneLabelsGroup
            id={id}
            className={clsx(
              classes?.dropZoneLabelsGroup,
              dropZoneClasses.dropZoneLabelsGroup
            )}
            aria-label="File Dropzone"
          >
            <StyledLabel
              id={setId(id, "input-file-label")}
              htmlFor={setId(id, "input-file")}
              label={labels?.dropzone}
              className={clsx(
                classes?.dropZoneLabel,
                dropZoneClasses.dropZoneLabel
              )}
              $disabled={disabled}
            />
            <StyledInfoMessage
              $disabled={disabled}
              id={setId(id, "description")}
            >
              {Number.isInteger(maxFileSize) &&
                `${labels?.sizeWarning} ${convertUnits(maxFileSize)}`}
              {labels?.acceptedFiles && labels.acceptedFiles}
              {!labels?.acceptedFiles &&
                acceptedFiles.length > 0 &&
                `\u00A0(${acceptedFiles.join(", ")})`}
            </StyledInfoMessage>
          </StyledDropZoneLabelsGroup>
        )}
        <StyledDropZoneContainer
          id={setId(id, "button")}
          className={clsx(
            classes?.dropZoneContainer,
            dropZoneClasses.dropZoneContainer,
            dragState && clsx(classes?.dragAction, dropZoneClasses.dragAction),
            disabled &&
              clsx(
                classes?.dropZoneContainerDisabled,
                dropZoneClasses.dropZoneContainerDisabled
              )
          )}
          $drag={dragState}
          $disabled={disabled}
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
            if (isKeypress(e, keyboardCodes.Enter) || isKeypress(e, 32)) {
              inputRef.current?.click();
            }
          }}
        >
          <StyledInput
            id={setId(id, "input-file")}
            tabIndex={-1}
            className={clsx(classes?.inputArea, dropZoneClasses.inputArea)}
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
            ref={inputRef}
            accept={acceptedFiles.join(",")}
            {...inputProps}
          />
          <StyledDropArea
            className={clsx(classes?.dropArea, dropZoneClasses.dropArea)}
          >
            {dragState ? (
              <StyledDropAreaLabel
                className={clsx(
                  classes?.dropZoneAreaLabels,
                  dropZoneClasses.dropZoneAreaLabels
                )}
              >
                <StyledDragText
                  className={clsx(classes?.dragText, dropZoneClasses.dragText)}
                >
                  {labels?.dropFiles}
                </StyledDragText>
              </StyledDropAreaLabel>
            ) : (
              <>
                <StyledDropAreaIcon
                  iconSize="M"
                  className={clsx(
                    classes?.dropZoneAreaIcon,
                    dropZoneClasses.dropZoneAreaIcon
                  )}
                  color={disabled ? "secondary_60" : "secondary"}
                />
                <StyledDropAreaLabels
                  className={clsx(
                    classes?.dropZoneAreaLabels,
                    dropZoneClasses.dropZoneAreaLabels
                  )}
                >
                  <StyledDragText
                    className={clsx(
                      classes?.dragText,
                      dropZoneClasses.dragText
                    )}
                  >
                    {labels?.drag}
                    <StyledSelectedFilesText
                      className={clsx(
                        classes?.selectFilesText,
                        dropZoneClasses.selectFilesText
                      )}
                    >{`\xa0${labels?.selectFiles}`}</StyledSelectedFilesText>
                  </StyledDragText>
                </StyledDropAreaLabels>
              </>
            )}
          </StyledDropArea>
        </StyledDropZoneContainer>
      </>
    );
  }
);
