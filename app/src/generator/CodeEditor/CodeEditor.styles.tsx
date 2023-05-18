import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";

export const styles = {
  codeEditor: css({
    ".margin, .margin-view-overlays": {
      paddingLeft: "4px!important",
    },
    ".visible.scrollbar.horizontal": {
      height: "10px!important",
      "& .slider": {
        top: "2px!important",
      },
    },
  }),
  codeEditorTools: css({
    display: "flex",
    padding: 8,
    border: `1px solid ${theme.colors.atmo4}`,
    borderBottom: "none",
    alignItems: "center",
    justifyContent: "space-between",
  }),
};
