import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import fileListClasses from "./fileListClasses";

export const StyledList = styled("ul")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  margin: 0,
  padding: 0,
  marginTop: "20px",
  listStyle: "none",

  [`& .${fileListClasses.listItem}`]: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    background: theme.colors.atmo1,
    padding: "10px 0px",
    border: theme.fileUploader.fileList.itemBorder,
    borderRadius: theme.fileUploader.fileList.itemBorderRadius,
  },
});
