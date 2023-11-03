import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";

const styles = {
  root: css({ height: "100%" }),
  emptyFlow: css({ display: "flex", flexDirection: "row" }),
  flow: css({ height: `calc(100% - ${theme.header.secondLevelHeight})` }),
};

export default styles;
