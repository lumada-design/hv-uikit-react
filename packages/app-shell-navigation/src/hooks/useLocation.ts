import { useMemo } from "react";
import {
  Location,
  matchRoutes,
  useLocation as useLocationReactRouter,
} from "react-router-dom";
import {
  HvAppShellViewsConfig,
  useHvAppShellConfig,
} from "@hitachivantara/app-shell-shared";

interface IndexedView {
  path: string;
  children?: IndexedView[];
  view: HvAppShellViewsConfig;
}

function indexViews(views: HvAppShellViewsConfig[]): IndexedView[] {
  return views.map((view) => {
    // remove prefix slash from view.route
    const path = view.route.slice(1);
    const isIndex =
      path === "" && (view.views == null || view.views.length === 0);

    if (isIndex) {
      return {
        path,
        view,
      };
    }

    return {
      path,
      view,
      children: view.views ? indexViews(view.views) : undefined,
    };
  });
}

class LocationWithViews<State = unknown> implements Location<State> {
  state: State;

  key: string;

  pathname: string;

  search: string;

  hash: string;

  #configViews: HvAppShellViewsConfig[];

  private matches: HvAppShellViewsConfig[] | null = null;

  constructor(
    location: Location<State>,
    views: HvAppShellViewsConfig[] | undefined | null,
  ) {
    this.state = location.state;
    this.key = location.key;
    this.pathname = location.pathname;
    this.search = location.search;
    this.hash = location.hash;

    this.#configViews = views ?? [];
  }

  get views() {
    if (this.matches == null) {
      const indexedViews = indexViews(this.#configViews);
      this.matches =
        matchRoutes(indexedViews, this)?.map((match) => match.route.view) ?? [];
    }

    return this.matches;
  }
}

export const useHvLocation = () => {
  const location = useLocationReactRouter();
  const config = useHvAppShellConfig();
  const toReturn = useMemo(() => {
    return new LocationWithViews(location, config.mainPanel?.views);
  }, [location, config.mainPanel?.views]);

  return toReturn;
};
