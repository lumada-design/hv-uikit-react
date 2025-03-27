import { render, screen } from "@testing-library/react";

import { HvAppShellContext } from "../../AppShellContext";
import { useHvAppShellConfig } from "../../index";

let test;
const DummyComponent = () => {
  test = useHvAppShellConfig();
  return <p># Menus:{test.menu?.length ?? 0}</p>;
};

describe("useMenuState Hook", () => {
  describe("Empty config", () => {
    it("should return the configuration", () => {
      render(
        <HvAppShellContext.Provider value={{}}>
          <DummyComponent />
        </HvAppShellContext.Provider>,
      );
      screen.debug();
      expect(screen.queryByText("# Menus:0")).toBeInTheDocument();
    });
  });
});
