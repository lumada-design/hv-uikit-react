import { render, screen } from "@testing-library/react";
import { HvProvider } from "providers";
import { describe, expect, it } from "vitest";
import { HvWarningText } from "./WarningText";

const TEXT = "text-content";

const setup = (props) =>
  render(
    <HvProvider>
      <HvWarningText {...props}>{TEXT}</HvWarningText>
    </HvProvider>
  );

describe("WarningText", () => {
  it("should be defined", () => {
    const { container } = render(<HvWarningText />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvWarningText />);
    expect(container).toMatchSnapshot();
  });
});

describe("HelperText", () => {
  it("doesn't render component when not visible", () => {
    setup({ isVisible: false });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.queryByText(TEXT)).not.toBeInTheDocument();
  });

  it("renders component and value when visible", () => {
    setup({ isVisible: true });
    const component = screen.getByRole("status");
    const content = screen.getByText(TEXT);
    expect(component).toBeVisible();
    expect(content).toBeVisible();
  });

  it("renders custom adornment", () => {
    setup({ isVisible: true, adornment: "FAKE-ICON" });
    expect(screen.getByText("FAKE-ICON")).toBeVisible();
  });
});
