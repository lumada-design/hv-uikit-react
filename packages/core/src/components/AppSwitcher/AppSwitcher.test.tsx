import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { HvAppSwitcher, HvAppSwitcherProps } from "./AppSwitcher";

const consoleSpy = vi.fn();
const originalError = console.error;

describe("<AppSwitcher /> with minimum configuration", () => {
  const mockAppSwitcherProps: HvAppSwitcherProps = {
    isOpen: true,
    title: "Mock title",
    applications: [
      {
        id: "app-1",
        name: "Mock App 1",
        url: "http://mockapp1/",
        target: "_top",
      },
      {
        id: "app-2",
        name: "Mock App 2",
        iconUrl: "http://mockapp2/icon",
        description: "Mock App 2 Description",
        url: "http://mockapp2/",
        target: "_blank",
      },
      {
        id: "app-3",
        name: "Mock App 3",
        iconUrl: "http://mockapp2/icon",
        description: "Mock App 2 Description",
        url: "http://mockapp2/",
      },
    ],
    footer: undefined,
  };

  beforeEach(async () => {
    console.error = consoleSpy;
  });

  afterEach(async () => {
    console.error = originalError;
  });

  it("should render correctly", () => {
    const { container } = render(<HvAppSwitcher {...mockAppSwitcherProps} />);
    expect(container).toMatchSnapshot();
  });

  it("should render 3 action components", () => {
    const { getAllByRole } = render(
      <HvAppSwitcher {...mockAppSwitcherProps} />
    );
    const actions = getAllByRole("listitem");
    expect(actions.length).toBe(3);
  });

  it("should have 2 Info icons rendered", () => {
    const { getAllByLabelText } = render(
      <HvAppSwitcher {...mockAppSwitcherProps} />
    );
    const images = getAllByLabelText("Description", { exact: false });
    expect(images.length).toBe(2);
  });

  it("should use an avatar for actions without icon", () => {
    const { getAllByText } = render(
      <HvAppSwitcher {...mockAppSwitcherProps} />
    );
    const avatars = getAllByText("MA", { exact: true });
    expect(avatars.length).toBe(1);
  });

  it('should have "aria-hidden" for avatars', () => {
    const { getAllByRole } = render(
      <HvAppSwitcher {...mockAppSwitcherProps} />
    );

    const hiddenAvatar = getAllByRole("listitem")[0].querySelector(
      '[aria-hidden="true"]'
    );
    expect(hiddenAvatar).not.toBeNull();
  });
});
