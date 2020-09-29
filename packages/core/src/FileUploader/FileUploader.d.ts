import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvDropZoneLabelsProp } from "./DropZone";
import { File, FileEvent } from "./File";

export interface FileUploaderLabelsProp extends HvDropZoneLabelsProp {
  /**
   * Conjunction label 'of'
   */
  progressConjunction: string;
  /**
   * Value of aria-label to apply to remove file button in FileList
   * */
  removeFileButtonLabel: string;
}

export type HvFileUploaderClassKey = "root";

export interface FileUploaderProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvFileUploaderClassKey> {
  /**
   * An object containing all the labels.
   */
  labels: FileUploaderLabelsProp;
  /**
   * The files to upload.
   */
  fileList: File[];
  /**
   * Whether the Dropzone should accept multiple files at once.
   */
  multiple?: boolean;
  /**
   * If the input is disabled or not
   */
  disabled?: boolean;
  /**
   * Max upload size
   * */
  maxFileSize?: number;
  /**
   * Files extensions accepted for upload.
   */
  acceptedFiles?: string[];
  /**
   * Callback fired when files are addded.
   */
  onFilesAdded?: FileEvent;
  /**
   * Callback fired when file is removed from list.
   */
  onFileRemoved?: FileEvent;
}

export default function HvFileUploader(props: FileUploaderProps): JSX.Element | null;
