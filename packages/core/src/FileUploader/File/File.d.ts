import * as React from "react";
import { StandardProps } from "@mui/material";

export interface File {
  /**
   * The file name.
   */
  name: string;
  /**
   * The upload status.
   */
  status: "progress" | "success" | "fail";
  /**
   * The file size in bytes.
   */
  size?: number;
  /**
   * Upload progress in bytes.
   */
  progress?: number;
  /**
   * Optional node representing a preview of the uploaded file.
   */
  preview?: React.ReactNode;
}

export type FilesAddedEvent = (files: File[]) => void;

export type FileRemovedEvent = (file: File) => void;

export type HvFileClassKey =
  | "progressbar"
  | "progressbarBack"
  | "nameText"
  | "progressTextContainer"
  | "previewContainer"
  | "removeButton";

export interface FileProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvFileClassKey> {
  /**
   * File information to be displayed
   */
  data: File;
  /**
   * Callback fired when file is removed from list.
   */
  onFileRemoved?: FileRemovedEvent;
  /**
   * Value of aria-label to apply to remove file button in filelist
   * */
  removeFileButtonLabel: string;
}

export default function HvFile(props: FileProps): JSX.Element | null;
