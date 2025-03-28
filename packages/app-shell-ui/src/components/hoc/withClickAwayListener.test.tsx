import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import withClickAwayListener from "./withClickAwayListener";

describe("withClickAwayListener", () => {
  it("should render WrappedComponent", () => {
    const WrappedComponent = () => <div>Wrapped Component</div>;
    const ComponentWithClickAwayListener =
      withClickAwayListener(WrappedComponent);

    render(<ComponentWithClickAwayListener />);

    expect(screen.getByText("Wrapped Component")).toBeInTheDocument();
  });

  it("should call onClickAway when clicked outside of the WrappedComponent", async () => {
    const clickAwayHandlerMock = vi.fn();

    const WrappedComponent = () => <div>Wrapped Component</div>;

    const ComponentWithClickAwayListener =
      withClickAwayListener(WrappedComponent);

    const DummyBody = () => (
      <>
        <ComponentWithClickAwayListener onClickAway={clickAwayHandlerMock} />
        <button type="button">To Simulate Outside Click</button>
      </>
    );

    render(<DummyBody />);

    const outsideButton = await waitFor(
      () => screen.getByText("To Simulate Outside Click"),
      { timeout: 5000 },
    );

    fireEvent.click(outsideButton);

    expect(clickAwayHandlerMock).toHaveBeenCalled();
  });
});
