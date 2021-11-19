/* eslint-env jest */
import React from "react";

import userEvent from "@testing-library/user-event";

import { render } from "testing-utils";

import { HvFileUploaderPreview } from "../..";

describe("HvFileUploaderPreview", () => {
  describe("general", () => {
    it("just renders its children", () => {
      const { container, queryByRole, getByTestId } = render(
        <HvFileUploaderPreview>
          <div data-testid="child">Hello</div>
        </HvFileUploaderPreview>
      );

      const button = queryByRole("button");
      const child = getByTestId("child");

      expect(button).not.toBeInTheDocument();
      expect(child).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-node-access
      expect(container.firstChild).toBe(child);
    });

    it("renders its children inside a button if onClick is provided", () => {
      const onClickSpy = jest.fn();

      const { container, getByRole, getByTestId } = render(
        <HvFileUploaderPreview onClick={onClickSpy}>
          <div data-testid="child">Hello</div>
        </HvFileUploaderPreview>
      );

      const button = getByRole("button");
      const child = getByTestId("child");

      expect(button).toBeInTheDocument();
      expect(child).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-node-access
      expect(container.firstChild).toBe(button);
    });

    it("calls onUnload when unmounted", () => {
      const onUnloadSpy = jest.fn();

      const { unmount } = render(
        <HvFileUploaderPreview onUnload={onUnloadSpy}>
          <div data-testid="child">Hello</div>
        </HvFileUploaderPreview>
      );

      expect(onUnloadSpy).toHaveBeenCalledTimes(0);

      unmount();

      expect(onUnloadSpy).toHaveBeenCalledTimes(1);
    });

    it("calls onClick when clicked", () => {
      const onClickSpy = jest.fn();

      const { getByRole } = render(
        <HvFileUploaderPreview onClick={onClickSpy}>
          <div data-testid="child">Hello</div>
        </HvFileUploaderPreview>
      );

      const button = getByRole("button");

      expect(onClickSpy).toHaveBeenCalledTimes(0);

      userEvent.click(button);

      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });
  });
});
