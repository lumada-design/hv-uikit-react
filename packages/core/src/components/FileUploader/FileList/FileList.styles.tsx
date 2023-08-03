import { createClasses } from "@core/utils/classes";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvFileList", {
  list: {
    display: "flex",
    flexDirection: "column",
    gap: theme.space.xs,
    margin: 0,
    padding: 0,
    marginTop: theme.space.sm,
    listStyle: "none",
  },
  listItem: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    background: theme.colors.atmo1,
    padding: `${theme.space.xs} 0px`,
    border: theme.fileUploader.fileList.itemBorder,
    borderRadius: theme.fileUploader.fileList.itemBorderRadius,
  },
});
