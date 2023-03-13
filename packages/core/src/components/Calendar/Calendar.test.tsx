import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HvCalendar } from "./Calendar";

describe("<Calendar /> with minimum configuration", () => {
  it("should be defined", () => {
    const { container } = render(<HvCalendar />);
    expect(container).toBeDefined();
  });

  it("should render composed navigation components", () => {
    const { container } = render(<HvCalendar />);

    expect(
      container.getElementsByClassName(
        "HvComposedNavigation-navigationContainer"
      )
    ).toHaveLength(1);
  });
});

describe("<Calendar /> with configurations", () => {
  const selectedDate = new Date(1970, 0, 1);

  const handleDateChangeMock = vi.fn();

  it("should be defined", () => {
    const { container } = render(
      <HvCalendar
        id="default"
        value={selectedDate}
        locale="en-US"
        onChange={handleDateChangeMock}
      />
    );

    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(
      <HvCalendar
        id="default"
        value={selectedDate}
        locale="en-US"
        onChange={handleDateChangeMock}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
