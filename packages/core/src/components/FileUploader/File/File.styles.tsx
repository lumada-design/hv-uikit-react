import { createClasses } from "@core/utils/classes";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvFile", {
  root: {},
  progressbar: {
    position: "absolute",
    top: "-1px",
  },
  progressbarContainer: {
    height: theme.fileUploader.file.progressHeight,
  },
  progressbarBack: {},
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
