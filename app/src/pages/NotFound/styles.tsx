import { makeStyles } from "@mui/styles";

import { HEADER_HEIGHT } from "lib/utils/layout";

const styles = makeStyles(() => ({
  empty: {
    display: "flex",
    alignItems: "center",
    height: `calc(100vh - ${HEADER_HEIGHT}px - 40px)`,
  },
}));

export default styles;
