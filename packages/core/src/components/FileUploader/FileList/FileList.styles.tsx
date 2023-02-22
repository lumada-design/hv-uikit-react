import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import fileListClasses from "./fileListClasses";

export const StyledList = styled("ul")({
  display: "flex",
  flexDirection: "column",
  gap: theme.space.xs,
  margin: 0,
  padding: 0,
  marginTop: theme.space.sm,
  listStyle: "none",

  [`& .${fileListClasses.listItem}`]: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    background: theme.colors.atmo1,
    padding: `${theme.space.xs} 0px`,
    border: theme.fileUploader.fileList.itemBorder,
    borderRadius: theme.fileUploader.fileList.itemBorderRadius,
  },
});
