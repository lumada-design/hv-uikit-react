import { HvTypography } from "components";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvTooltip } from "./Tooltip";

const smallTitle = <HvTypography>Grid View</HvTypography>;

const createTitle = (data) => (
  <div>
    <HvTypography variant="label">{data.title || ""}</HvTypography>
    {data.elements.map((element) => (
      <div key={element.name}>
        <HvTypography variant="label">{element.name}</HvTypography>
        <div />
        <HvTypography>{element.value}</HvTypography>
      </div>
    ))}
  </div>
);

const Anchor = (
  <button id="testChild" type="submit">
    Hello World
  </button>
);

describe("Tooltip", () => {
  it("should be defined", () => {
    const { container } = render(
      <HvTooltip title={smallTitle} open>
        {Anchor}
      </HvTooltip>
    );
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(
      <HvTooltip title={smallTitle} open>
        {Anchor}
      </HvTooltip>
    );
    expect(container).toMatchSnapshot();
  });

  describe("SingleLine Tooltip", () => {
    it("it should render the single line Tooltip", () => {
      const { getByRole } = render(
        <HvTooltip title={smallTitle} open>
          {Anchor}
        </HvTooltip>
      );

      const tooltip = getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
    });

    it("it should not render the single line Tooltip", () => {
      const { getByRole } = render(
        <HvTooltip title={smallTitle}>{Anchor}</HvTooltip>
      );

      expect(() => getByRole("tooltip")).toThrow();
    });

    it("it should render the single line Tooltip when hover", async () => {
      const { getByRole } = render(
        <HvTooltip title={smallTitle}>{Anchor}</HvTooltip>
      );

      expect(() => getByRole("tooltip")).toThrow();
      const anchor = getByRole("button", { name: "Hello World" });
      expect(anchor).toBeInTheDocument();

      fireEvent.mouseOver(anchor);

      await waitFor(() => {
        const tooltip = getByRole("tooltip");
        expect(tooltip).toBeInTheDocument();
        expect(tooltip.childElementCount).toBe(1);
      });
    });
  });

  const data = {
    elements: [
      { name: "Status", value: "Open" },
      { name: "Date", value: "12/08/2018" },
      { name: "Assignee", value: "Management" },
      { name: "Approval", value: "Not yet requested" },
    ],
  };

  const title = createTitle(data);

  describe("MultiLine Tooltip", () => {
    it("it should render the multi line Tooltip", () => {
      const { getByRole, getByText } = render(
        <HvTooltip title={title} open useSingle={false}>
          {Anchor}
        </HvTooltip>
      );

      const tooltip = getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
      expect(getByText("Status")).toBeInTheDocument();
      expect(getByText("Open")).toBeInTheDocument();

      expect(getByText("Approval")).toBeInTheDocument();
      expect(getByText("Not yet requested")).toBeInTheDocument();
    });

    it("it should not render the multi line Tooltip", () => {
      const { getByRole } = render(
        <HvTooltip title={title} useSingle={false}>
          {Anchor}
        </HvTooltip>
      );

      expect(() => getByRole("tooltip")).toThrow();
    });

    it("it should render the multi line Tooltip when hover", async () => {
      const { getByRole } = render(
        <HvTooltip title={title} useSingle={false}>
          {Anchor}
        </HvTooltip>
      );

      expect(() => getByRole("tooltip")).toThrow();
      const anchor = getByRole("button", { name: "Hello World" });
      expect(anchor).toBeInTheDocument();

      fireEvent.mouseOver(anchor);

      await waitFor(() => {
        const tooltip = getByRole("tooltip");
        expect(tooltip).toBeInTheDocument();
      });
    });
  });
});
