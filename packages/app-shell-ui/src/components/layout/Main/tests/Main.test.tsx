import { vi } from "vitest";

import Main from "..";
import * as useNavigationContextHook from "../../../../providers/hooks/useNavigationContext";
import useNavigationContextDefaultMock from "../../../../tests/defaultMocks";
import renderTestProvider from "../../../../tests/testUtils";

const navigationContextSpy = vi.spyOn(useNavigationContextHook, "default");

describe("`Main` component", () => {
  describe("with valid configuration", () => {
    it("should render the `StyledAppContainer` component", async () => {
      const { getByRole } = await renderTestProvider(
        <Main>
          <div />
        </Main>,
      );
      const appContainer = getByRole("main");

      expect(appContainer).toBeInTheDocument();
    });

    it("should not render the `VerticalNavigation` component when `hasVerticalNavigation` is false", async () => {
      const { queryByRole } = await renderTestProvider(
        <Main>
          <div />
        </Main>,
      );

      const navigationTree = queryByRole("navigation", {
        name: "Vertical navigation",
      });

      expect(navigationTree).not.toBeInTheDocument();
    });

    it("should render the `HvVerticalNavigationTree` component when `hasVerticalNavigation` is true", async () => {
      navigationContextSpy.mockImplementation(() => ({
        ...useNavigationContextDefaultMock,
        selectedMenuItemId: "0-0",
        rootMenuItemId: "0",
        items: [
          {
            id: "0",
            label: "DummyMenu0",
            href: "/dummypath0",
          },
          { id: "1", label: "DummyMenu1", href: "/dummypath1" },
          { id: "2", label: "DummyMenu2", href: "/dummypath2" },
        ],
        verticalNavigationItems: [
          { id: "0-0", label: "DummyMenu0-0", href: "/dummypath0-0" },
        ],
        hasVerticalNavigation: true,
      }));

      const { findByRole } = await renderTestProvider(
        <Main>
          <div />
        </Main>,
      );

      const navigationTree = await findByRole("navigation", {
        name: "Vertical navigation",
      });

      expect(navigationTree).toBeInTheDocument();
    });
  });

  describe("with navigationMode set to only top", () => {
    beforeEach(() => {
      navigationContextSpy.mockImplementation(() => ({
        ...useNavigationContextDefaultMock,
        hasVerticalNavigation: false,
      }));
    });

    it("should render the `StyledAppContainer` component", async () => {
      const { queryByRole } = await renderTestProvider(
        <Main>
          <div />
        </Main>,
        {
          menu: [
            {
              label: "TopMenu1",
              target: "/top-menu-1",
            },
            {
              label: "TopMenu2",
              submenus: [
                {
                  label: "SubMenu2-1",
                  target: "/sub-menu-2-1",
                },
                {
                  label: "SubMenu2-2",
                  target: "/sub-menu-2-2",
                },
              ],
            },
          ],
          navigationMode: "ONLY_TOP",
        },
      );

      expect(queryByRole("main")).toBeInTheDocument();
    });

    it("should not render the `VerticalNavigation` component", async () => {
      const { queryByRole } = await renderTestProvider(
        <Main>
          <div />
        </Main>,
      );

      const navigationTree = queryByRole("navigation", {
        name: "Vertical navigation",
      });

      expect(navigationTree).not.toBeInTheDocument();
    });
  });

  describe("with navigationMode set to only left", () => {
    it("should not render the `VerticalNavigation` component when no menu are defined in the configuration", async () => {
      const { queryByRole } = await renderTestProvider(
        <Main>
          <div />
        </Main>,
        {
          navigationMode: "ONLY_LEFT",
        },
      );
      const navigationTree = queryByRole("navigation", {
        name: "Vertical navigation",
      });

      expect(navigationTree).not.toBeInTheDocument();
    });
  });
});
