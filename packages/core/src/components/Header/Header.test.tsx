import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { HvButton } from "~/components";
import { HvProvider } from "~/providers";
import { HvHeader } from "./Header";
import { HvHeaderNavigation } from "./Navigation";
import { HvHeaderBrand } from "./Brand";
import { HvHeaderActions } from "./Actions";
import HitachiLogo from "./assets/HitachiLogo";

describe("Header", () => {
  it("should render correctly with no data", () => {
    const { container } = render(
      <HvProvider cssBaseline="none">
        <HvHeader />
      </HvProvider>
    );
    expect(container).toBeDefined();
  });

  it("should render correctly the brand data", () => {
    const { getByText, getByTestId } = render(
      <HvProvider cssBaseline="none">
        <HvHeader>
          <HvHeaderBrand
            logo={<HitachiLogo data-testid="logo" />}
            name="Lumada App"
          />
        </HvHeader>
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
      <HvProvider cssBaseline="none">
        <HvHeader>
          <HvHeaderNavigation data={navigationData} />
        </HvHeader>
      </HvProvider>
    );
    expect(getAllByRole("link")).toHaveLength(1);
    expect(getAllByText("text")).toHaveLength(3);
  });

  it("should render correctly the actions elements", () => {
    const { getAllByRole } = render(
      <HvProvider cssBaseline="none">
        <HvHeader>
          <HvHeaderActions aria-label="My-aria-label">
            <HvButton
              onClick={() => {}}
              aria-label="Open Notifications panel"
              variant="primaryGhost"
            >
              Badge
            </HvButton>
            <HvButton
              onClick={() => {}}
              aria-label="Open User panel"
              variant="primaryGhost"
            >
              User
            </HvButton>
          </HvHeaderActions>
        </HvHeader>
      </HvProvider>
    );
    expect(getAllByRole("button")).toHaveLength(2);
  });
});
