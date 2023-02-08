import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvSnackbar } from "./Snackbar";

describe("Snackbar", () => {
  it("should be defined", () => {
    const { container } = render(<HvSnackbar />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvSnackbar />);
    expect(container).toMatchSnapshot();
  });

  it("should render the snackbar text correctly", () => {
    const { getByText } = render(
      <HvSnackbar open showIcon variant="success" label="My snackbar" />
    );
    expect(getByText("My snackbar")).toBeInTheDocument();
  });
});
