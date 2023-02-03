import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { HvFileUploaderPreview } from "./Preview";

describe("FileUploaderPreview", () => {
  it("should be defined", () => {
    const { container } = render(
      <HvFileUploaderPreview>
        <div>Hello</div>
      </HvFileUploaderPreview>
    );

    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(
      <HvFileUploaderPreview>
        <div>Hello</div>
      </HvFileUploaderPreview>
    );

    expect(container).toMatchSnapshot();
  });

  it("should just render its children", () => {
    const { container, queryByRole, getByTestId } = render(
      <HvFileUploaderPreview>
        <div data-testid="child">Hello</div>
      </HvFileUploaderPreview>
    );

    const button = queryByRole("button");

    expect(button).not.toBeInTheDocument();

    const child = getByTestId("child");

    expect(child).toBeInTheDocument();
    expect(container.firstChild).toBe(child);
  });

  it("should render its children inside a button if onClick is provided", () => {
    const onClickMock = vi.fn();

    const { container, getByRole, getByTestId } = render(
      <HvFileUploaderPreview onClick={onClickMock}>
        <div data-testid="child">Hello</div>
      </HvFileUploaderPreview>
    );

    const button = getByRole("button");

    expect(button).toBeInTheDocument();

    const child = getByTestId("child");

    expect(child).toBeInTheDocument();
    expect(container.firstChild).toBe(button);
  });

  it("should call onUnload when unmounted", () => {
    const onUnloadMock = vi.fn();

    const { unmount } = render(
      <HvFileUploaderPreview onUnload={onUnloadMock}>
        <div data-testid="child">Hello</div>
      </HvFileUploaderPreview>
    );

    expect(onUnloadMock).toHaveBeenCalledTimes(0);

    unmount();

    expect(onUnloadMock).toHaveBeenCalledTimes(1);
  });

  it("should call onClick when clicked", async () => {
    const onClickMock = vi.fn();

    const { getByRole } = render(
      <HvFileUploaderPreview onClick={onClickMock}>
        <div data-testid="child">Hello</div>
      </HvFileUploaderPreview>
    );

    const button = getByRole("button");

    expect(onClickMock).toHaveBeenCalledTimes(0);

    await userEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
