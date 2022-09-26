import { themeUtils, themeVars } from "theme";

const styles = {
  // border: `1px solid ${themeVars.colors.atmo4}` as string,
  // width: "100%",
  // borderRadius: 2,
  // position: "relative",
  // display: "inline-block",
  // oadd

  cursor: "pointer",
  userSelect: "none",
  position: "relative",
  width: "100%",
  background: themeVars.colors.atmo1,
  border: `1px solid ${themeVars.colors.atmo4}`,
  "&:hover": {
    border: `1px solid ${themeVars.colors.acce1}`,
  },
  borderRadius: "2px",
  display: "flex",
  alignItems: "center",
  height: themeUtils.spacing(4),
  padding: `0 ${themeUtils.spacing(1)} 0 ${themeUtils.spacing(1)}`,
  "& select": {
    color: themeVars.colors.acce1,
  },
} as unknown as TemplateStringsArray;

export default styles;
