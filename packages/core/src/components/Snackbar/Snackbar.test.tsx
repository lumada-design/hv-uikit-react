import { render, screen } from "@testing-library/react";
import { Alert } from "@hitachivantara/uikit-react-icons";
import { describe, expect, it } from "vitest";
import { HvSnackbar, HvSnackbarProps } from "./Snackbar";

const setup = (props?: Partial<HvSnackbarProps>) =>
  render(
    <HvSnackbar
      open
      showIcon
      variant="success"
      label="My snackbar"
      {...props}
    />
  );

describe("Snackbar", () => {
  it("renders the label text", () => {
    setup();
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("My snackbar")).toBeInTheDocument();
  });

  it("doesn't render when closed", () => {
    setup({ open: false });
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.queryByText("My snackbar")).toBeNull();
  });

  it("renders the label custom content", () => {
    setup({ label: <div>Custom content</div> });
    expect(screen.getByText("Custom content")).toBeInTheDocument();
  });

  it("renders the custom icon icon", () => {
    setup({ customIcon: <Alert data-testid="iconId" /> });

    expect(screen.getByText("My snackbar")).toBeInTheDocument();
    expect(screen.getByTestId("iconId")).toBeInTheDocument();
  });
});
