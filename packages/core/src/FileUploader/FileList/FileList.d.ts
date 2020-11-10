import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { File, FileRemovedEvent } from "../File";

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
   * File upload progress message conjunction.
   */
  progressConjunctionLabel: string;
  /**
   * Value of aria-label to apply to remove file button in FileList
   * */
  removeFileButtonLabel: string;
}

export type HvFileListClassKey = "list";

export default function HvFileList(props: FileListProps): JSX.Element | null;
