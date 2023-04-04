import { render } from "@testing-library/react";
import { HvTypography } from "~/components";
import { describe, expect, it } from "vitest";
import { HvCard, HvCardContent, HvCardHeader, HvCardMedia } from "./";

describe("Card", () => {
  it("should be defined", () => {
    const { container } = render(<HvCard />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvCard />);
    expect(container).toMatchSnapshot();
  });

  it("should render header", () => {
    const { container, getByText } = render(
      <HvCard>
        <HvCardHeader title="mockTitle" subheader="mockSubtitle" />
      </HvCard>
    );
    expect(getByText("mockTitle")).toBeInTheDocument();
    expect(getByText("mockSubtitle")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should render image", () => {
    const mockImg = "";
    const { container, getByRole } = render(
      <HvCard>
        <HvCardMedia component="img" alt="mockImg" image={mockImg} />
      </HvCard>
    );
    expect(getByRole("img", { name: /mockImg/ })).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should render content", () => {
    const { container, getByText } = render(
      <HvCard>
        <HvCardContent>
          <HvTypography variant="label">mockCardContent</HvTypography>
        </HvCardContent>
      </HvCard>
    );
    expect(getByText("mockCardContent")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should render all the compoents", () => {
    const mockImg = "";
    const { container, getByText, getByRole } = render(
      <HvCard>
        <HvCardHeader title="mockTitle" subheader="mockSubtitle" />
        <HvCardMedia component="img" alt="mockImg" image={mockImg} />
        <HvCardContent>
          <HvTypography variant="label">mockCardContent</HvTypography>
        </HvCardContent>
      </HvCard>
    );
    expect(getByText("mockTitle")).toBeInTheDocument();
    expect(getByText("mockSubtitle")).toBeInTheDocument();
    expect(getByRole("img", { name: /mockImg/ })).toBeInTheDocument();
    expect(getByText("mockCardContent")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
