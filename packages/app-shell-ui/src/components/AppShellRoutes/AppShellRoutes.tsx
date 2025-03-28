import { lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import {
  useHvAppShellCombinedProviders,
  useHvAppShellConfig,
  type HvAppShellMainPanelConfig,
  type HvAppShellViewsConfig,
} from "@hitachivantara/app-shell-shared";
import { HvContainer } from "@hitachivantara/uikit-react-core";

import GenericError from "../../pages/GenericError";
import LoadingPage from "../../pages/LoadingPage";
import RootRoute from "../../pages/Root";
import getBasePath from "../../utils/basePathUtils";
import { getAppIdFromBundle } from "../../utils/navigationUtil";
import AppShellViewProvider from "../AppShellViewProvider";

const NotFound = lazy(() => import("../../pages/NotFound"));

function renderNestedRoutes(
  views: HvAppShellViewsConfig[] | undefined,
): RouteObject[] | undefined {
  if (!views) {
    return undefined;
  }
  return views.map<RouteObject>((view) => {
    const { bundle } = view;
    const appId = getAppIdFromBundle(bundle);

    const RouteComponent = lazy(() => import(/* @vite-ignore */ bundle));

    const path = view.route.replace(/^\//, "");

    return {
      path,
      // "Component" used instead of "element" due to lazy loading
      Component: () => (
        <AppShellViewProvider id={appId}>
          <ErrorBoundary
            key={view.route}
            fallback={<GenericError fullPage={false} />}
          >
            <RouteComponent {...view.config}>
              {view.views != null ? <Outlet /> : null}
            </RouteComponent>
          </ErrorBoundary>
        </AppShellViewProvider>
      ),
      children: renderNestedRoutes(view.views),
    };
  });
}

function renderRoutes(
  mainPanel: HvAppShellMainPanelConfig | undefined,
): RouteObject[] {
  if (mainPanel == null || mainPanel.views == null) {
    return [];
  }

  const { views, maxWidth = "xl", ...mainContainerProps } = mainPanel;

  return views.map((view) => {
    const {
      bundle,
      route,
      config,
      views: nestedViews,
      maxWidth: viewMaxWidth,
      ...viewContainerProps
    } = view;

    const appId = getAppIdFromBundle(bundle);

    const RouteComponent = lazy(() => import(/* @vite-ignore */ bundle));

    return {
      path: route,
      // "Component" used instead of "element" due to lazy loading
      Component: () => (
        <HvContainer
          maxWidth={viewMaxWidth ?? maxWidth}
          {...mainContainerProps}
          {...viewContainerProps}
        >
          <AppShellViewProvider id={appId}>
            <ErrorBoundary
              key={route}
              fallback={<GenericError fullPage={false} />}
            >
              <RouteComponent {...config}>
                {nestedViews != null ? <Outlet /> : null}
              </RouteComponent>
            </ErrorBoundary>
          </AppShellViewProvider>
        </HvContainer>
      ),
      children: renderNestedRoutes(nestedViews),
    };
  });
}

function renderErrorRoutes(
  mainPanel: HvAppShellMainPanelConfig | undefined,
): RouteObject[] {
  const { views, maxWidth = "xl", ...mainContainerProps } = mainPanel ?? {};

  return [
    {
      path: "*",
      element: (
        <HvContainer maxWidth={maxWidth} {...mainContainerProps}>
          <NotFound />
        </HvContainer>
      ),
    },
  ];
}

const AppShellRoutes = () => {
  const config = useHvAppShellConfig();
  const { providers } = useHvAppShellCombinedProviders();

  return (
    <RouterProvider
      fallbackElement={<LoadingPage />}
      router={createBrowserRouter(
        [
          {
            element: <RootRoute providers={providers} />, // All routes live inside `RootRoute`
            errorElement: <GenericError fullPage />,
            children: [
              ...renderRoutes(config.mainPanel),
              ...renderErrorRoutes(config.mainPanel),
            ],
          },
        ],
        { basename: getBasePath(config) },
      )}
    />
  );
};

export default AppShellRoutes;
