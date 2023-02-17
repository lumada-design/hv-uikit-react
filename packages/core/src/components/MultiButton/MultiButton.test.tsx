import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { LocationPin, Map } from "@hitachivantara/uikit-react-icons";
import { HvButton } from "components";
import { HvMultiButton } from "./MultiButton";

describe("MultiButton", () => {
  it("should be defined", () => {
    const { container } = render(<HvMultiButton />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvMultiButton />);
    expect(container).toMatchSnapshot();
  });

  it("should render the buttons", () => {
    const { queryAllByRole } = render(
      <HvMultiButton>
        <HvButton key="1" startIcon={<Map />}>
          Button1
        </HvButton>
        <HvButton key="2" startIcon={<LocationPin />}>
          Button2
        </HvButton>
      </HvMultiButton>
    );
    const buttons = queryAllByRole("button");
    expect(buttons.length).toBe(2);
  });
});
