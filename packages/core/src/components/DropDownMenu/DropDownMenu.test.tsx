import { render } from "@testing-library/react";
import { HvProvider } from "@core/providers";
import { describe, expect, it } from "vitest";
import { HvDropDownMenu } from "@core/components";

describe("DropDownMenu", () => {
  it("should be defined", () => {
    const { container } = render(
      <HvProvider>
        <HvDropDownMenu dataList={[]} />
      </HvProvider>
    );
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(
      <HvProvider>
        <HvDropDownMenu dataList={[]} />
      </HvProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
