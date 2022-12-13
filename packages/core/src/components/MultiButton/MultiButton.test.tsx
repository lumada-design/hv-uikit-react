import { LocationPin, Map } from "@hitachivantara/uikit-icons";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "..";
import { MultiButton } from "./MultiButton";

describe("MultiButton", () => {
  it("should be defined", () => {
    const { container } = render(<MultiButton />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<MultiButton />);
    expect(container).toMatchSnapshot();
  });

  it("should render the buttons", () => {
    const { queryAllByRole } = render(
      <MultiButton>
        <Button key="1" startIcon={<Map />}>
          Button1
        </Button>
        <Button key="2" startIcon={<LocationPin />}>
          Button2
        </Button>
      </MultiButton>
    );
    const buttons = queryAllByRole("button");
    expect(buttons.length).toBe(2);
  });
});
