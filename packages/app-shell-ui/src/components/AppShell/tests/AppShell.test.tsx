import { render, screen } from "@testing-library/react";

import AppShell from "../AppShell";

describe("AppShell component", () => {
  it("should include a Header when a minimum configuration is provided", () => {
    render(
      <AppShell
        config={{
          apps: [],
          menu: [],
        }}
      />,
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
