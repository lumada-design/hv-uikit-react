import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import fileListClasses from "./fileListClasses";

export const StyledList = styled("ul")({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.25),
  margin: 0,
  padding: 0,
  marginTop: theme.spacing(2.5),
  listStyle: "none",

  [`& .${fileListClasses.listItem}`]: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    background: theme.colors.atmo1,
    padding: `${theme.spacing(1.25)} 0px`,
    border: theme.fileUploader.fileList.itemBorder,
    borderRadius: theme.fileUploader.fileList.itemBorderRadius,
  },
});
