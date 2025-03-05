import type { NavigationData } from "@hitachivantara/uikit-react-core";
import type { RouteObject } from "react-router-dom";

export const appRoutes: RouteObject[] = [
  // APP ROUTES
];

// Automatic `navigationData`. Change to manual & i18n labels if needed.
export const navigationData = appRoutes.map<NavigationData>((route) => ({
  id: route.path ?? "",
  label: (route.path ?? "").split("-").join(" "),
  path: route.path,
}));
