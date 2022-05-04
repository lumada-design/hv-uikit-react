import * as React from "react";
import { StandardProps } from "@mui/material";
import { File, FileRemovedEvent } from "../File";

export type HvFileListClassKey = "list";

export interface FileListProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvFileListClassKey> {
  /**
   * The files to upload.
   */
  list?: File[];
  /**
   * Callback fired when file is removed from list.
   */
  onFileRemoved?: FileRemovedEvent;
  /**
   * Value of aria-label to apply to remove file button in FileList
   * */
  removeFileButtonLabel: string;
}

export default function HvFileList(props: FileListProps): JSX.Element | null;
