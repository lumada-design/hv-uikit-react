import { lazy, useEffect, useMemo, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  createBrowserRouter,
  matchRoutes,
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
    const { bundle, route } = view;
    const appId = getAppIdFromBundle(bundle);

    const RouteComponent = lazy(() => import(/* @vite-ignore */ bundle));

    const path = route.replace(/^\//, "");

    return {
      path,
      // "Component" used instead of "element" due to lazy loading
      Component: () => (
        <AppShellViewProvider id={appId}>
          <ErrorBoundary
            key={view.$key}
            fallback={<GenericError fullPage={false} />}
          >
            <RouteComponent {...view.config}>
              {view.views ? <Outlet /> : null}
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
  if (mainPanel?.views == null) {
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
      $key,
      conditions,
      ...viewContainerProps
    } = view;

    const appId = getAppIdFromBundle(bundle);

    const RouteComponent = lazy(() => import(/* @vite-ignore */ bundle));

    const containerProps = {
      maxWidth: viewMaxWidth ?? maxWidth,
      ...mainContainerProps,
      ...viewContainerProps,
    };

    return {
      path: route,
      // "Component" used instead of "element" due to lazy loading
      Component: () => (
        <HvContainer {...containerProps}>
          <AppShellViewProvider id={appId}>
            <ErrorBoundary
              key={view.$key}
              fallback={<GenericError fullPage={false} />}
            >
              <RouteComponent {...config}>
                {nestedViews ? <Outlet /> : null}
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
  const { baseUrl, mainPanel, services } = useHvAppShellConfig();

  const { providers } = useHvAppShellCombinedProviders();
  const [providerKey, setProviderKey] = useState(0);
  const prevRoutesRef = useRef<RouteObject[]>([]);

  const childRoutes = useMemo(() => {
    return [...renderRoutes(mainPanel), ...renderErrorRoutes(mainPanel)];
  }, [mainPanel]);

  useEffect(() => {
    // Skip on initial mount (no previous routes)
    if (prevRoutesRef.current.length === 0) {
      prevRoutesRef.current = childRoutes;
      return;
    }

    const currentPath = globalThis.location.pathname.replace(
      baseUrl ?? "/",
      "",
    );
    const normalizedPath = currentPath.startsWith("/")
      ? currentPath
      : `/${currentPath}`;

    // Check if current route changed from/to 404
    const prevMatch = matchRoutes(prevRoutesRef.current, normalizedPath);
    const newMatch = matchRoutes(childRoutes, normalizedPath);

    const prevWas404 = !prevMatch || prevMatch.at(-1)?.route.path === "*";
    const newIs404 = !newMatch || newMatch.at(-1)?.route.path === "*";

    // If transitioning between 404 and valid route, we need to remount
    if ((prevWas404 && !newIs404) || (!prevWas404 && newIs404)) {
      setProviderKey((prev) => prev + 1);
    }

    prevRoutesRef.current = childRoutes;
  }, [baseUrl, childRoutes]);

  const router = useMemo(() => {
    const rootRoutes = [
      {
        element: <RootRoute services={services} providers={providers} />,
        errorElement: <GenericError fullPage />,
        children: childRoutes,
      },
    ];

    return createBrowserRouter(rootRoutes, {
      basename: baseUrl ?? "/",
    });
  }, [baseUrl, childRoutes, services, providers]);

  return (
    <RouterProvider
      key={providerKey}
      fallbackElement={<LoadingPage />}
      router={router}
    />
  );
};

export default AppShellRoutes;
