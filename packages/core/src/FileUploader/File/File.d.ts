import * as React from "react";
import { StandardProps } from "@material-ui/core";

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
}

export type FileEvent = (file: File) => void;

export type HvFileClassKey =
  | "progressbar"
  | "progressbarBack"
  | "nameText"
  | "progressTextContainer"
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
  onFileRemoved?: FileEvent;
  /**
   * Value of aria-label to apply to remove file button in filelist
   * */
  removeFileButtonLabel: string;
}

export default function HvFile(props: FileProps): JSX.Element | null;
