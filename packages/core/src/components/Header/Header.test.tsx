import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Actions, Brand, Header, Navigation } from ".";
import { Button } from "../";
import { HvProvider } from "../../providers";
import HitachiLogo from "./assets/HitachiLogo";

describe("Header", () => {
  it("should render correctly with no data", () => {
    const { container } = render(
      <HvProvider enableCssBaseline={false}>
        <Header />
      </HvProvider>
    );
    expect(container).toBeDefined();
  });

  it("should render correctly the brand data", () => {
    const { getByText, getByTestId } = render(
      <HvProvider enableCssBaseline={false}>
        <Header>
          <Brand logo={<HitachiLogo data-testid="logo" />} name="Lumada App" />
        </Header>
      </HvProvider>
    );
    expect(getByText("Lumada App")).toBeInTheDocument();
    expect(getByTestId("logo")).toBeInTheDocument();
  });

  it("should render correctly the navigation menu", () => {
    const navigationData = [
      {
        id: "1",
        label: "text",
        href: "test-link",
        data: [
          {
            id: "1-1",
            label: "text",
          },
        ],
      },
      {
        id: "2",
        label: "text",
      },
    ];

    const { getAllByText, getAllByRole } = render(
      <HvProvider enableCssBaseline={false}>
        <Header>
          <Navigation data={navigationData} />
        </Header>
      </HvProvider>
    );
    // I should be using `getAllByRole` here, but for some strange reason
    // that's returning the incorrect count even though the `render` method
    // returns the correct DOM with 3 buttons.
    expect(getAllByRole("link")).toHaveLength(1);
    expect(getAllByText("text")).toHaveLength(3);
  });

  it("should render correctly the actions elements", () => {
    const { getAllByRole } = render(
      <HvProvider enableCssBaseline={false}>
        <Header>
          <Actions aria-label="My-aria-label">
            <Button
              onClick={() => console.log("badge")}
              aria-label="Open Notifications panel"
              variant="ghost"
            >
              Badge
            </Button>
            <Button
              onClick={() => console.log("user")}
              aria-label="Open User panel"
              variant="ghost"
            >
              User
            </Button>
          </Actions>
        </Header>
      </HvProvider>
    );
    expect(getAllByRole("button")).toHaveLength(2);
  });
});
