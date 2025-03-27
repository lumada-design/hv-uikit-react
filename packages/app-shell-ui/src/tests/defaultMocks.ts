import { vi } from "vitest";

import { NavigationContextValue } from "../providers/NavigationProvider";

const useNavigationContextDefaultMock: NavigationContextValue = {
  selectedMenuItemId: undefined,
  rootMenuItemId: undefined,
  items: [],
  verticalNavigationItems: [],
  hasVerticalNavigation: false,
  showHeaderSubMenu: false,
  isCompactMode: false,
  verticalNavigationMode: "EXPANDED",
  switchVerticalNavigationMode: vi.fn,
};

export default useNavigationContextDefaultMock;
