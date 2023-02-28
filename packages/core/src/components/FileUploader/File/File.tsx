import { Close } from "@hitachivantara/uikit-react-icons";
import clsx from "clsx";
import { setId } from "utils";
import fileClasses, { HvFileClasses } from "./fileClasses";
import { HvTypography } from "components";
import { convertUnits } from "../utils";
import {
  StyledFail,
  StyledErrorMessage,
  StyledSuccess,
  StyledProgressBarBack,
  StyledProgressBar,
  StyledNameText,
  StyledProgressTextContainer,
  StyledPreviewContainer,
  StyledIconButton,
  StyledEmptyIcon,
} from "./File.styles";

export type HvFileData = File & {
  /**
   * The file id.
   */
  id?: string;
  /**
   * The file name.
   */
  name?: string;
  /**
   * The upload status.
   */
  status?: "progress" | "success" | "fail";
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
  /**
   * Error message when the upload failed.
   */
  errorMessage?: string;
};

export type HvFilesAddedEvent = (files: HvFileData[]) => void;

export type HvFileRemovedEvent = (file: HvFileData) => void;

export type HvFileProps = {
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * File information to be displayed.
   */
  data: HvFileData;
  /**
   * Callback fired when file is removed from list.
   */
  onFileRemoved?: HvFileRemovedEvent;
  /**
   * Value of aria-label to apply to remove file button in file list.
   * */
  removeFileButtonLabel?: string;
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes?: HvFileClasses;
};

const getStatusIcon = (
  classes?: HvFileClasses,
  status?: HvFileData["status"]
) => {
  switch (status) {
    case "success":
      return (
        <StyledSuccess
          className={clsx(classes?.icon, fileClasses.icon)}
          color="sema1"
        />
      );
    case "fail":
      return (
        <StyledFail
          className={clsx(classes?.icon, fileClasses.icon)}
          color="sema4"
        />
      );
    default:
      return (
        <StyledEmptyIcon className={clsx(classes?.icon, fileClasses.icon)} />
      );
  }
};

const getProgressText = (data: HvFileData, classes?: HvFileClasses) => {
  const hasFailed = data.status === "fail";
  const inProgress = data.status === "progress";

  return (
    <>
      {data.progress || data.size || data.errorMessage ? `\xa0|\xa0` : null}

      {inProgress && data.progress != null && (
        <HvTypography variant="label">
          {`${convertUnits(data.progress)}\xa0/\xa0`}
        </HvTypography>
      )}

      {!hasFailed && data.size && (
        <HvTypography>{`${convertUnits(data.size)}`}</HvTypography>
      )}

      {hasFailed && data.errorMessage && (
        <StyledErrorMessage className={clsx(classes?.fail, fileClasses.fail)}>
          {data.errorMessage}
        </StyledErrorMessage>
      )}
    </>
  );
};

const getProgressBarWith = ({ size, progress }: HvFileData) => {
  const width =
    progress != null && size != null ? Math.round((progress * 100) / size) : 0;

  return width;
};

export const HvFile = ({
  id,
  classes,
  data,
  onFileRemoved,
  removeFileButtonLabel,
}: HvFileProps) => {
  const hasError = data.status === "fail";

  const inProgress = data.status === "progress";

  const progressText = getProgressText(data, classes);

  const statusIcon = getStatusIcon(classes, data.status);

  const currentProgress = getProgressBarWith(data);

  return (
    <li className={clsx(classes?.root, fileClasses.root)}>
      {!hasError && inProgress && (
        <StyledProgressBarBack
          className={clsx(
            classes?.progressbarBack,
            fileClasses.progressbarBack
          )}
        />
      )}

      {!hasError && inProgress && (
        <StyledProgressBar
          className={clsx(classes?.progressbar, fileClasses.progressbar)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={currentProgress}
          style={{ width: `${currentProgress}%` }}
        />
      )}

      {statusIcon}

      <StyledNameText
        className={clsx(classes?.nameText, fileClasses.nameText)}
        variant="label"
      >
        {data.name}
      </StyledNameText>

      <StyledProgressTextContainer
        className={clsx(
          classes?.progressTextContainer,
          fileClasses.progressTextContainer
        )}
      >
        {progressText}
      </StyledProgressTextContainer>

      {data.preview && (
        <StyledPreviewContainer
          className={clsx(
            classes?.previewContainer,
            fileClasses.previewContainer
          )}
        >
          {data.preview}
        </StyledPreviewContainer>
      )}

      <StyledIconButton
        id={setId(id, "remove-button")}
        aria-label={removeFileButtonLabel}
        className={clsx(classes?.removeButton, fileClasses.removeButton)}
        onClick={() => onFileRemoved?.(data)}
        variant="secondaryGhost"
        icon
      >
        <Close iconSize="XS" />
      </StyledIconButton>
    </li>
  );
};
