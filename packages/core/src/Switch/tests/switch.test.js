/* eslint-env jest */

import React from "react";

import userEvent from "@testing-library/user-event";

import { render } from "testing-utils";

import { Main, Disabled } from "../stories/Switch.stories";

describe("<Switch />", () => {
  describe("Basic functionality", () => {
    it("should match snapshot", () => {
      const { container } = render(<Main />);
      expect(container).toBeDefined();
    });

    it("correctly render the switches", () => {
      const { getByLabelText } = render(<Main />);
      const switch1 = getByLabelText("Engine 1");
      const switch2 = getByLabelText("Engine 2");
      expect(switch1).toBeInTheDocument();
      expect(switch1.checked).toBe(false);

      expect(switch2).toBeInTheDocument();
      expect(switch2.checked).toBe(true);
    });

    it("changes state when clicked", () => {
      const { getByLabelText } = render(<Main />);

      const switchComponent = getByLabelText("Engine 1");

      expect(switchComponent).toBeInTheDocument();
      expect(switchComponent.checked).toBe(false);
      userEvent.click(switchComponent);
      expect(switchComponent.checked).toBe(true);
    });
  });

  describe("Disabled switch", () => {
    it("should match snapshot", () => {
      const { container } = render(<Disabled />);
      expect(container).toBeDefined();
    });

    it("correctly render the switches", () => {
      const { getByLabelText } = render(<Disabled />);
      const switch1 = getByLabelText("Engine 1");
      const switch2 = getByLabelText("Engine 2");
      expect(switch1).toBeInTheDocument();
      expect(switch1.checked).toBe(false);

      expect(switch2).toBeInTheDocument();
      expect(switch2.checked).toBe(true);
    });

    it("changes state when clicked", () => {
      const { getByLabelText } = render(<Disabled />);

      const switchComponent = getByLabelText("Engine 1");

      expect(switchComponent).toBeInTheDocument();
      expect(switchComponent.checked).toBe(false);
      userEvent.click(switchComponent);
      expect(switchComponent.checked).toBe(false);
    });
  });
});
