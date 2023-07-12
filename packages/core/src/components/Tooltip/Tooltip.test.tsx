import { HvTypography } from "@core/components";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
  describe("SingleLine Tooltip", () => {
    it("it should render the single line Tooltip", () => {
      render(
        <HvTooltip title={smallTitle} open>
          {Anchor}
        </HvTooltip>
      );

      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
    });

    it("it should not render the single line Tooltip", () => {
      render(<HvTooltip title={smallTitle}>{Anchor}</HvTooltip>);

      expect(() => screen.getByRole("tooltip")).toThrow();
    });

    it("it should render the single line Tooltip when hover", async () => {
      render(<HvTooltip title={smallTitle}>{Anchor}</HvTooltip>);

      expect(() => screen.getByRole("tooltip")).toThrow();
      const anchor = screen.getByRole("button", { name: "Hello World" });
      expect(anchor).toBeInTheDocument();

      fireEvent.mouseOver(anchor);

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
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
      render(
        <HvTooltip title={title} open useSingle={false}>
          {Anchor}
        </HvTooltip>
      );

      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
      expect(screen.getByText("Open")).toBeInTheDocument();

      expect(screen.getByText("Approval")).toBeInTheDocument();
      expect(screen.getByText("Not yet requested")).toBeInTheDocument();
    });

    it("it should not render the multi line Tooltip", () => {
      render(
        <HvTooltip title={title} useSingle={false}>
          {Anchor}
        </HvTooltip>
      );

      expect(() => screen.getByRole("tooltip")).toThrow();
    });

    it("it should render the multi line Tooltip when hover", async () => {
      render(
        <HvTooltip title={title} useSingle={false}>
          {Anchor}
        </HvTooltip>
      );

      expect(() => screen.getByRole("tooltip")).toThrow();
      const anchor = screen.getByRole("button", { name: "Hello World" });
      expect(anchor).toBeInTheDocument();

      fireEvent.mouseOver(anchor);

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toBeInTheDocument();
      });
    });
  });
});
