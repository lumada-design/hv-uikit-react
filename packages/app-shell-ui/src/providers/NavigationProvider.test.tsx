import { useContext } from "react";
import { useMediaQuery } from "@mui/material";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Mock, vi } from "vitest";

import { LOCAL_STORAGE_KEYS } from "../hooks/useLocalStorage";
import renderTestProvider from "../tests/testUtils";
import { NavigationContext } from "./NavigationProvider";

vi.mock("@mui/material", async () => {
  const mod = await vi.importActual("@mui/material");
  return {
    ...(mod as object),
    useMediaQuery: vi.fn().mockReturnValue(false),
  };
});

const TestComponent = () => {
  const {
    selectedMenuItemId,
    rootMenuItemId,
    items,
    verticalNavigationItems,
    hasVerticalNavigation,
    showHeaderSubMenu,
    isCompactMode,
    verticalNavigationMode,
    switchVerticalNavigationMode,
  } = useContext(NavigationContext);

  return (
    <div>
      <span>selectedMenuItemId: {selectedMenuItemId}</span>
      <span>rootMenuItemId: {rootMenuItemId}</span>
      <span>items: {items.length}</span>
      <span>verticalNavigationItems: {verticalNavigationItems.length}</span>
      <span>hasVerticalNavigation: {hasVerticalNavigation.toString()}</span>
      <span>showHeaderSubMenu: {showHeaderSubMenu.toString()}</span>
      <span>isCompactMode: {isCompactMode.toString()}</span>
      <span>verticalNavigationMode: {verticalNavigationMode}</span>
      <button type="button" onClick={switchVerticalNavigationMode}>
        Switch Vertical Navigation Mode
      </button>
    </div>
  );
};

describe("NavigationProvider", () => {
  it("should render the component with the correct values from the context", async () => {
    const user = userEvent.setup();

    const { getByText, getByRole } = await renderTestProvider(
      <TestComponent />,
      {
        menu: [
          {
            label: "Menu 1",
            submenus: [
              {
                label: "Menu 1-1",
                target: "/menu1-1",
              },
              {
                label: "Menu 1-2",
                target: "/menu1-2",
              },
              {
                label: "Menu 1-3",
                target: "/menu1-3",
              },
            ],
          },
          {
            label: "Menu 2",
            target: "/menu2",
          },
          {
            label: "Menu 3",
            target: "/menu3",
          },
        ],
        navigationMode: "TOP_AND_LEFT",
      },
    );

    expect(getByText("selectedMenuItemId: 0-0")).toBeInTheDocument();
    expect(getByText("rootMenuItemId: 0")).toBeInTheDocument();
    expect(getByText("items: 3")).toBeInTheDocument();
    expect(getByText("verticalNavigationItems: 3")).toBeInTheDocument();
    expect(getByText("hasVerticalNavigation: true")).toBeInTheDocument();
    expect(getByText("showHeaderSubMenu: false")).toBeInTheDocument();
    expect(getByText("isCompactMode: false")).toBeInTheDocument();
    expect(getByText("verticalNavigationMode: EXPANDED")).toBeInTheDocument();

    const button = getByRole("button", {
      name: "Switch Vertical Navigation Mode",
    });

    await user.click(button);

    expect(getByText("verticalNavigationMode: COLLAPSED")).toBeInTheDocument();
  });

  it("should inherit verticalNavigationMode from localStorage when isCompactMode is false", async () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.NAV_EXPANDED, "false");

    await renderTestProvider(<TestComponent />);

    expect(
      screen.getByText("verticalNavigationMode: COLLAPSED"),
    ).toBeInTheDocument();

    localStorage.removeItem(LOCAL_STORAGE_KEYS.NAV_EXPANDED);
  });

  it("should switch between verticalNavigationMode EXPANDED / COLLAPSED when isCompactMode is false", async () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.NAV_EXPANDED, "true");
    const user = userEvent.setup();
    const { getByText, getByRole } = await renderTestProvider(
      <TestComponent />,
    );

    const button = getByRole("button", {
      name: "Switch Vertical Navigation Mode",
    });

    expect(getByText("verticalNavigationMode: EXPANDED")).toBeInTheDocument();

    await user.click(button);

    expect(getByText("verticalNavigationMode: COLLAPSED")).toBeInTheDocument();

    await user.click(button);

    expect(getByText("verticalNavigationMode: EXPANDED")).toBeInTheDocument();
    localStorage.removeItem(LOCAL_STORAGE_KEYS.NAV_EXPANDED);
  });

  it("should switch between verticalNavigationMode CLOSED / EXPANDED when isCompactMode is true", async () => {
    (useMediaQuery as unknown as Mock).mockReturnValue(true);
    const user = userEvent.setup();
    const { getByText, getByRole } = await renderTestProvider(
      <TestComponent />,
    );

    const button = getByRole("button", {
      name: "Switch Vertical Navigation Mode",
    });

    expect(getByText("verticalNavigationMode: CLOSED")).toBeInTheDocument();

    await user.click(button);

    expect(getByText("verticalNavigationMode: EXPANDED")).toBeInTheDocument();

    await user.click(button);

    expect(getByText("verticalNavigationMode: CLOSED")).toBeInTheDocument();
  });
});
