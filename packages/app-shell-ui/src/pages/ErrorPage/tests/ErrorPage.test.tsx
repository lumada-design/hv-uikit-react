import { RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import renderTestProvider from "../../../tests/testUtils";
import ErrorPage from "../ErrorPage";

const navigateSpy = vi.fn();
vi.mock("@hitachivantara/app-shell-navigation", async () => {
  const mod = await vi.importActual("@hitachivantara/app-shell-navigation");
  return {
    ...(mod as object),
    useHvNavigation: vi.fn(() => {
      return {
        navigate: navigateSpy,
      };
    }),
  };
});

describe("`ErrorPage` page", () => {
  describe("with menus defined", () => {
    const user = userEvent.setup();
    let renderResult: RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >;

    beforeEach(async () => {
      renderResult = await renderTestProvider(
        <ErrorPage
          title="dummyTitle"
          code="dummyCode"
          background="dummyLocation"
          backgroundLabel="dummyBackgroundLabel"
        />,
        {
          menu: [
            {
              label: "DummyMenu0",
              target: "/target0",
            },
            {
              label: "DummyMenu1",
              target: "/target1",
            },
          ],
        },
      );
    });

    it("Should include textual and accessibility info", () => {
      const headings = renderResult.getAllByRole("heading");
      expect(headings[0].textContent).toBe("dummyCode");
      expect(headings[1].textContent).toBe("dummyTitle");
      expect(
        screen.getByRole("img", {
          name: "dummyBackgroundLabel",
        }),
      ).toBeDefined();
    });

    it("should have a link element", () => {
      const link = renderResult.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href");
    });

    it("should call `onClick` method on Link click", async () => {
      const link = { href: "./target0", id: "0" };

      const linkElement = renderResult.getByRole("link");

      await user.click(linkElement);

      expect(navigateSpy).toHaveBeenCalledWith(link.href);
    });
  });

  describe("without menus defined", () => {
    it("should not have message to first menu", async () => {
      const { queryByRole } = await renderTestProvider(
        <ErrorPage
          title="dummyTitle"
          background="dummyLocation"
          backgroundLabel="dummyBackgroundLabel"
        />,
      );
      expect(queryByRole("link")).not.toBeInTheDocument();
    });
  });

  describe("without footer included", () => {
    it("should not have message to first menu", async () => {
      const { queryByRole } = await renderTestProvider(
        <ErrorPage
          title="dummyTitle"
          background="dummyLocation"
          backgroundLabel="dummyBackgroundLabel"
          includeFooter={false}
        />,
      );
      expect(queryByRole("link")).not.toBeInTheDocument();
    });
  });
});
