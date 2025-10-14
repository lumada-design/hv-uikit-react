import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent, {
  PointerEventsCheckLevel,
} from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { HvSwitch } from "./Switch";

const ControlledSwitch = () => {
  const [checked, setChecked] = useState(false);

  return (
    <HvSwitch
      aria-label="Controlled"
      checked={checked}
      onChange={(evt) => setChecked(evt.target.checked)}
    />
  );
};

describe("Switch", () => {
  it("renders the labels", () => {
    render(
      <>
        <HvSwitch aria-label="Engine 1" />
        <HvSwitch defaultChecked aria-label="Engine 2" />
      </>,
    );
    const switches = screen.getAllByRole("switch");
    const [switch1, switch2] = switches;
    expect(switch1).not.toBeChecked();
    expect(switch2).toBeChecked();
  });

  it("changes state when clicked Uncontrolled", async () => {
    render(<HvSwitch aria-label="Engine 1" />);

    const switchElement = screen.getByRole("switch");

    expect(switchElement).not.toBeChecked();
    await userEvent.click(switchElement);
    expect(switchElement).toBeChecked();
  });

  it("changes state when clicked Controlled", async () => {
    render(<ControlledSwitch />);

    const switchElement = screen.getByRole("switch");

    expect(switchElement).not.toBeChecked();
    await userEvent.click(switchElement);
    expect(switchElement).toBeChecked();
  });

  it("changes state when clicked", async () => {
    const changeMock = vi.fn();
    render(
      <HvSwitch
        name="cookies"
        value="accepted"
        aria-label="Switch"
        onChange={changeMock}
      />,
    );

    const switchElement = screen.getByRole("switch");

    expect(switchElement).not.toBeChecked();
    await userEvent.click(switchElement);
    expect(switchElement).toBeChecked();
    expect(changeMock).toHaveBeenCalledTimes(1);
    expect(changeMock).toHaveBeenCalledWith(
      expect.anything(),
      true,
      "accepted",
    );
  });

  it("renders the labels when disabled", () => {
    render(
      <>
        <HvSwitch disabled aria-label="Engine 1" />
        <HvSwitch defaultChecked disabled aria-label="Engine 2" />
      </>,
    );
    const switches = screen.getAllByRole("switch");
    const [switch1, switch2] = switches;
    expect(switch1).not.toBeChecked();
    expect(switch2).toBeChecked();
  });

  it("doesn't change state when disabled", async () => {
    render(<HvSwitch disabled aria-label="Engine 1" />);

    const switchComponent = screen.getByRole("switch");

    expect(switchComponent).not.toBeChecked();
    await userEvent.click(switchComponent, {
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
    expect(switchComponent).not.toBeChecked();
  });
});
