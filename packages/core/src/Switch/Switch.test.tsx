import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { HvSwitch } from "./Switch";

describe("Switch", () => {
  describe("Basic functionality", () => {
    it("should match snapshot", () => {
      const { container } = render(
        <>
          <HvSwitch aria-label="Engine 1" />
          <HvSwitch defaultChecked aria-label="Engine 2" />
        </>,
      );
      expect(container).toBeDefined();
    });

    it("correctly render the switches", () => {
      const { getByLabelText } = render(
        <>
          <HvSwitch aria-label="Engine 1" />
          <HvSwitch defaultChecked aria-label="Engine 2" />
        </>,
      );
      const switch1 = getByLabelText("Engine 1");
      const switch2 = getByLabelText("Engine 2");
      expect(switch1).toBeInTheDocument();
      expect(switch1).not.toBeChecked();

      expect(switch2).toBeInTheDocument();
      expect(switch2).toBeChecked();
    });

    it("changes state when clicked", async () => {
      const { getByLabelText } = render(
        <>
          <HvSwitch aria-label="Engine 1" />
          <HvSwitch defaultChecked aria-label="Engine 2" />
        </>,
      );

      const switchComponent = getByLabelText("Engine 1");

      expect(switchComponent).toBeInTheDocument();
      expect(switchComponent).not.toBeChecked();
      await userEvent.click(switchComponent);
      expect(switchComponent).toBeChecked();
    });
  });

  describe("Disabled switch", () => {
    it("should match snapshot", () => {
      const { container } = render(
        <>
          <HvSwitch disabled aria-label="Engine 1" />
          <HvSwitch defaultChecked disabled aria-label="Engine 2" />
        </>,
      );
      expect(container).toBeDefined();
    });

    it("correctly render the switches", () => {
      const { getByLabelText } = render(
        <>
          <HvSwitch disabled aria-label="Engine 1" />
          <HvSwitch defaultChecked disabled aria-label="Engine 2" />
        </>,
      );
      const switch1 = getByLabelText("Engine 1");
      const switch2 = getByLabelText("Engine 2");
      expect(switch1).toBeInTheDocument();
      expect(switch1).not.toBeChecked();

      expect(switch2).toBeInTheDocument();
      expect(switch2).toBeChecked();
    });

    it("changes state when clicked", async () => {
      const { getByLabelText } = render(
        <>
          <HvSwitch disabled aria-label="Engine 1" />
          <HvSwitch defaultChecked disabled aria-label="Engine 2" />
        </>,
      );

      const switchComponent = getByLabelText("Engine 1");

      expect(switchComponent).toBeInTheDocument();
      expect(switchComponent).not.toBeChecked();
      await fireEvent.click(switchComponent);
      expect(switchComponent).toBeChecked();
    });
  });
});
