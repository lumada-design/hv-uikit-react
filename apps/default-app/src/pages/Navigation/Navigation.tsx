import { Link } from "react-router-dom";
import { useHvNavigation } from "@hitachivantara/app-shell-navigation";
import {
  HvGlobalActions,
  HvGrid,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import useStyles from "./styles";

const Navigation = () => {
  const classes = useStyles();
  const { getViewRoute } = useHvNavigation();

  const internalNavigation =
    getViewRoute({
      viewBundle: "/pages/Details",
      pathParams: {
        cardId: "10",
        cardText: "Dummy text",
      },
    }) ?? "";

  const scopedNavigation =
    getViewRoute({
      viewBundle: "@hv/bobafett-simple-app/pages/Home",
      search: "?mode=light",
    }) ?? "";

  const nonScopedNavigation =
    getViewRoute({
      viewBundle: "simple-app/pages/Home",
      search: "?mode=dark",
    }) ?? "";

  return (
    <>
      <HvGlobalActions title="Navigation" className={classes.section} />

      <HvGrid container className={classes.section}>
        <HvGrid item xs={12} display="flex">
          <HvTypography variant="label">
            For the correct usage of this page, it is required that simple app
            is available.
          </HvTypography>
        </HvGrid>
        <HvGrid item xs={12} display="flex">
          <Link
            aria-label="Detail: Internal Navigation (/pages/Details)"
            className={classes.link}
            to={internalNavigation}
          >
            Detail: Internal Navigation (/pages/Details)
          </Link>
        </HvGrid>
        <HvGrid item xs={12} display="flex">
          <Link
            aria-label="Light Mode: Scoped bundle navigation (@hv/bobafett-simple-app/pages/Home)"
            to={scopedNavigation}
            className={classes.link}
          >
            Light Mode: Scoped bundle navigation
            (@hv/bobafett-simple-app/pages/Home)
          </Link>
        </HvGrid>
        <HvGrid item xs={12} display="flex">
          <Link
            aria-label="Dark Mode: Non scoped bundle navigation (simple-app/pages/Home)"
            to={nonScopedNavigation}
            className={classes.link}
          >
            Dark Mode: Non scoped bundle navigation (simple-app/pages/Home)
          </Link>
        </HvGrid>
      </HvGrid>
    </>
  );
};

export default Navigation;
