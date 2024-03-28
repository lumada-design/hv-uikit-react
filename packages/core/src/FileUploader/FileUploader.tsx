import { useDefaultProps } from "../hooks/useDefaultProps";
import { useLabels } from "../hooks/useLabels";
import { HvBaseProps } from "../types/generic";
import { setId } from "../utils/setId";
import { HvDropZone, HvDropZoneLabels } from "./DropZone";
import { HvFileData, HvFileRemovedEvent, HvFilesAddedEvent } from "./File";
import { HvFileList } from "./FileList";

export interface HvFileUploaderLabels extends HvDropZoneLabels {
  /**
   * Value of aria-label to apply to remove file button in FileList
   * */
  removeFileButtonLabel?: string;
}

export interface HvFileUploaderProps extends HvBaseProps {
  /**
   * An object containing all the labels.
   */
  labels?: HvFileUploaderLabels;
  /**
   * The files to upload.
   */
  fileList?: HvFileData[];
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
   * Callback fired when files are added.
   */
  onFilesAdded?: HvFilesAddedEvent;
  /**
   * Callback fired when file is removed from list.
   */
  onFileRemoved?: HvFileRemovedEvent;
  /**
   * Whether the DropZone should hide labels or not.
   */
  hideLabels?: boolean;
  /**
   * Attributes applied to the input element.
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

// TODO: This component needs to adopt the Form element shape and deprecate its way of composing labels

const DEFAULT_LABELS: HvFileUploaderLabels = {
  dropzone: "Label",
  sizeWarning: "Max. file size:",
  drag: "Drop files here or",
  selectFiles: "click to upload",
  dropFiles: "Drop files here",
  fileSizeError: "The file exceeds the maximum upload size",
  fileTypeError: "File type not allowed for upload",
  removeFileButtonLabel: "Remove File",
};

/**
 * Lets the user choose one or more files from their device storage. Once chosen,
 * the files can be uploaded to a server or manipulated on the client side.
 *
 * Accepted file types follow the format of the html input accept attribute. Please check https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file for more details.
 */
export const HvFileUploader = (props: HvFileUploaderProps) => {
  const {
    id,
    className,
    labels: labelsProp,
    fileList,
    multiple = true,
    disabled = false,
    hideLabels = false,
    maxFileSize = Infinity,
    inputProps = {},
    acceptedFiles = [],
    onFilesAdded,
    onFileRemoved,
    ...others
  } = useDefaultProps("HvFileUploader", props);
  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  return (
    <div id={id} className={className} {...others}>
      <HvDropZone
        id={setId(id, "dropzone")}
        labels={labels}
        multiple={multiple}
        disabled={disabled}
        accept={acceptedFiles.join(",")}
        maxFileSize={maxFileSize}
        onFilesAdded={onFilesAdded}
        inputProps={inputProps}
        hideLabels={hideLabels}
      />
      <HvFileList
        id={setId(id, "filelist")}
        list={fileList}
        onFileRemoved={onFileRemoved}
        removeFileButtonLabel={labels?.removeFileButtonLabel}
      />
    </div>
  );
};
