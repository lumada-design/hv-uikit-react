import { createClasses, theme } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvLevel", {
  root: {
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: theme.colors.atmo1,
    borderWidth: "1px",
    borderColor: theme.colors.atmo3,
    width: "100%",
    height: "100%",
  },
  header: {
    borderRadius: "16px 16px 0 0",
    borderBottom: `1px solid ${theme.colors.atmo3}`,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.atmo1,
    alignItems: "center",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing("sm"),
    gap: theme.spacing("xs"),
  },
  childless: {
    borderRadius: "16px",
    border: "unset",
  },
});
