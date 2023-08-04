import { createClasses } from "@core/utils/classes";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvFile", {
  root: {},
  progressbar: {
    position: "absolute",
    top: "-1px",
    width: "80%",
    height: theme.fileUploader.file.progressHeight,
    border: `${theme.fileUploader.file.borderWidth} solid ${theme.colors.secondary}`,

    "&::-moz-progress-bar": {
      background: theme.colors.secondary,
    },
  },
  progressbarBack: {
    position: "absolute",
    top: "-1px",
    width: "100%",
    border: `${theme.fileUploader.file.borderWidth} solid ${theme.colors.atmo4}`,
  },
  nameText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  progressTextContainer: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
  },
  removeButton: {
    width: 32,
    height: 32,
    margin: `0px ${theme.space.xs}`,
  },
  previewContainer: {
    display: "flex",
    margin: `0px ${theme.space.xs}`,
    width: theme.fileUploader.file.previewContainerSize,
    height: theme.fileUploader.file.previewContainerSize,
    justifyContent: "center",
    alignItems: "center",

    "& span": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },

    "& img": {
      width: theme.fileUploader.file.imageSize,
      height: theme.fileUploader.file.imageSize,
      objectFit: "cover",
      objectPosition: "center",
      alignSelf: "center",
    },
  },
  icon: {
    width: 32,
    height: 32,
    margin: `0px ${theme.space.xs}`,
  },
  fail: {},
});
