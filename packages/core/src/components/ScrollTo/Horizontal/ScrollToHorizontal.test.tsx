import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvProvider } from "@core/providers";
import { HvScrollToHorizontal } from "./ScrollToHorizontal";
import { WithContent } from "./ScrollToHorizontal.stories";
import userEvent from "@testing-library/user-event";

const Main = () => {
  const options = [
    { label: "Tab 1", value: "mainId1" },
    { label: "Tab 2", value: "mainId2" },
    { label: "Tab 3", value: "mainId3" },
    { label: "Tab 4", value: "mainId4" },
  ];

  return (
    <HvProvider>
      <HvScrollToHorizontal options={options} />
    </HvProvider>
  );
};

describe("ScrollToHorizontal", () => {
  it("should render correctly", () => {
    const { container } = render(<Main />);

    expect(container).toMatchSnapshot();
  });

  it("should render the component as expected", () => {
    const { getByRole } = render(
      <HvProvider>
        <WithContent />
      </HvProvider>
    );

    const tab1 = getByRole("button", { name: "Server status summary" });
    expect(tab1).toBeInTheDocument();

    const tab2 = getByRole("button", { name: "Optimization" });
    expect(tab2).toBeInTheDocument();

    const tab3 = getByRole("button", { name: "Performance analysis" });
    expect(tab3).toBeInTheDocument();

    const tab4 = getByRole("button", { name: "Insights" });
    expect(tab4).toBeInTheDocument();
  });

  it("should have the correct tab selected", async () => {
    const { getAllByRole } = render(
      <HvProvider>
        <WithContent />
      </HvProvider>
    );

    const tabs = getAllByRole("listitem");
    expect(tabs.length).toBe(4);
    expect(tabs[0]).toHaveAttribute("aria-current", "true");

    const tabButtons = getAllByRole("button");
    expect(tabButtons.length).toBe(4);

    await userEvent.click(tabButtons[3]);

    expect(tabs[0]).toHaveAttribute("aria-current", "false");
    expect(tabs[3]).toHaveAttribute("aria-current", "true");
  });
});
