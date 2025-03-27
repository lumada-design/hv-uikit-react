import { Path } from "react-router-dom";

export type ViewDestination = {
  /**
   * The application view bundle identifier to fetch the corresponding route from the App Shell configuration file.
   */
  viewBundle: string;

  /**
   * The module path parameters to be compiled with the modulePath.
   */
  pathParams?: Record<string, string>;

  /**
   * A URL search string, beginning with a ?.
   */
  search?: string;

  /**
   * A URL fragment identifier, beginning with a #.
   */
  hash?: string;
};

export type To = string | Partial<Path> | ViewDestination;

export interface NavigationOptions {
  /**
   * Whether a history replace action should be performed instead of the default history push.
   */
  replace: boolean;

  /**
   * Data to associate with the new location.
   */
  state: unknown;
}
