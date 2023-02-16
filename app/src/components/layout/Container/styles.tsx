import { makeStyles } from "@mui/styles";
import { theme } from "@hitachivantara/uikit-styles";

import { HEADER_HEIGHT } from "lib/utils/layout";

const useStyles = makeStyles((muitTheme) => ({
  content: {
    display: "flex",
    width: "100%",
    marginTop: HEADER_HEIGHT,
  },
  container: {
    marginTop: `${theme.spacing(2)}px`,
  },
  hasSecondLevel: {
    [muitTheme.breakpoints.up("md")]: {
      marginTop: `calc(${HEADER_HEIGHT}px + ${theme.spacing(2)}px)`,
    },
  },
  fullHeight: {
    marginTop: 0,
    padding: 0,
    height: `calc(100vh - ${HEADER_HEIGHT}px - 40px)`,
    [muitTheme.breakpoints.down("sm")]: {
      height: `calc(100vh - ${HEADER_HEIGHT}px - 92px)`,
    },
  },
}));

export default useStyles;
