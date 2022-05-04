import * as React from "react";
import { StandardProps } from "@mui/material";
import { FilesAddedEvent } from "../File";

export interface HvDropZoneLabelsProp {
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

export type HvDropZoneClassKey =
  | "dropZoneContainer"
  | "dropZoneLabelsGroup"
  | "dragAction"
  | "dropZoneContainerDisabled"
  | "inputArea"
  | "dropArea"
  | "dropZoneAreaLabels"
  | "dropZoneAreaIcon"
  | "dropZoneLabel"
  | "dragText"
  | "selectFilesText";

export interface DropZoneProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvDropZoneClassKey> {
  /**
   * Labels to present in FileUploader.
   */
  labels?: HvDropZoneLabelsProp;
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
  onFilesAdded?: FilesAddedEvent;
  /**
   * Whether the DropZone should hide labels or not.
   */
  hideLabels?: boolean;
  /**
   * Attributes applied to the input element.
   */
  inputProps?: object;
}

export default function DropZone(props: DropZoneProps): JSX.Element | null;
