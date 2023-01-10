import { describe, expect, it } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HvAccordion, HvTypography } from "components";

describe("Accordion", () => {
  it("should be defined", () => {
    const { container } = render(<HvAccordion />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvAccordion />);
    expect(container).toMatchSnapshot();
  });

  describe("general structure", () => {
    it("renders the component as expected", () => {
      const testAttributes = (component) => {
        expect(component).toBeInTheDocument();
        expect(component).toHaveAttribute("aria-expanded", "false");
        expect(component).toHaveAttribute("aria-disabled", "false");
      };
      const { getByRole } = render(
        <>
          <HvAccordion id="item1" label={"Analytics"} headingLevel={1}>
            <HvTypography>item 1</HvTypography>
          </HvAccordion>
          <HvAccordion id="item2" label="System" headingLevel={2}>
            <HvTypography>item 2</HvTypography>
          </HvAccordion>
          <HvAccordion id="item3" label="Data" headingLevel={2}>
            <HvTypography>item 2</HvTypography>
          </HvAccordion>
        </>
      );
      const analyticsItem = getByRole("button", { name: /Analytics/i });
      testAttributes(analyticsItem);
      const systemItem = getByRole("button", { name: /System/i });
      testAttributes(systemItem);
      const dataItem = getByRole("button", { name: /Data/i });
      testAttributes(dataItem);
    });
  });

  describe("interactions", () => {
    it("opens and closes the content", async () => {
      const { getByRole, getByText } = render(
        <>
          <HvAccordion id="item1" label={"Analytics"} headingLevel={1}>
            <HvTypography>Views</HvTypography>
          </HvAccordion>
          <HvAccordion id="item2" label="System" headingLevel={2}>
            <HvTypography>item 2</HvTypography>
          </HvAccordion>
          <HvAccordion id="item3" label="Data" headingLevel={2}>
            <HvTypography>item 2</HvTypography>
          </HvAccordion>
        </>
      );
      const analyticsItem = getByRole("button", { name: /Analytics/i });
      const analyticsContent = getByText("Views");
      expect(analyticsItem).toBeInTheDocument();
      expect(analyticsItem).toHaveAttribute("aria-expanded", "false");
      expect(analyticsItem).toHaveAttribute("aria-disabled", "false");
      userEvent.tab();
      expect(analyticsContent).not.toHaveFocus();
      fireEvent.click(analyticsItem); // open
      await waitFor(() => {
        expect(analyticsItem).toBeInTheDocument();
      });
      expect(analyticsItem).toHaveAttribute("aria-expanded", "true");
    });

    it("opens and closes the content using the keyboard", async () => {
      const { getByRole, getByText } = render(
        <>
          <HvAccordion id="item1" label={"Analytics"} headingLevel={1}>
            <HvTypography>Views</HvTypography>
          </HvAccordion>
          <HvAccordion id="item2" label="System" headingLevel={2}>
            <HvTypography>item 2</HvTypography>
          </HvAccordion>
          <HvAccordion id="item3" label="Data" headingLevel={2}>
            <HvTypography>item 2</HvTypography>
          </HvAccordion>
        </>
      );
      const analyticsItem = getByRole("button", { name: /Analytics/i });
      const analyticsContent = getByText("Views");
      expect(analyticsItem).toBeInTheDocument();
      expect(analyticsItem).toHaveAttribute("aria-expanded", "false");
      expect(analyticsItem).toHaveAttribute("aria-disabled", "false");
      expect(analyticsContent).not.toBeVisible();
      fireEvent.keyDown(analyticsItem, { key: "Enter", keyCode: 13 }); // open
      await waitFor(() => {
        expect(analyticsItem).toBeInTheDocument();
        expect(analyticsContent).toBeVisible();
      });
      expect(analyticsItem).toHaveAttribute("aria-expanded", "true");
      userEvent.tab();
      fireEvent.keyDown(analyticsItem, { key: "Enter", keyCode: 13 });
      await waitFor(() => {
        expect(analyticsItem).toBeInTheDocument();
      });
      expect(analyticsItem).toHaveAttribute("aria-expanded", "false");
      userEvent.tab();
    });

    it("cannot open a disabled accordion", async () => {
      const { getByRole, getByText } = render(
        <>
          <HvAccordion id="item1" label={"Analytics"} headingLevel={1} disabled>
            <HvTypography>Views</HvTypography>
          </HvAccordion>
          <HvAccordion id="item2" label="System" headingLevel={2}>
            <HvTypography>item 2</HvTypography>
          </HvAccordion>
          <HvAccordion id="item3" label="Data" headingLevel={2} disabled>
            <HvTypography>item 2</HvTypography>
          </HvAccordion>
        </>
      );
      const analyticsItem = getByRole("button", { name: /Analytics/i });
      const analyticsContent = getByText("Views");
      expect(analyticsItem).toBeInTheDocument();
      expect(analyticsItem).toHaveAttribute("aria-expanded", "false");
      expect(analyticsItem).toHaveAttribute("aria-disabled", "true");
      userEvent.tab();
      expect(analyticsContent).not.toHaveFocus();
      fireEvent.click(analyticsItem); // try to open
      await waitFor(() => {
        expect(analyticsItem).toBeInTheDocument();
        expect(analyticsContent).not.toBeVisible();
      });
      expect(analyticsItem).toHaveAttribute("aria-expanded", "false");
      expect(analyticsItem).toHaveAttribute("aria-disabled", "true");
    });

    it("cannot open a disabled accordion with keyboard", async () => {
      const { getByRole, getByText } = render(
        <>
          <HvAccordion id="item1" label={"Analytics"} headingLevel={1} disabled>
            <HvTypography>Views</HvTypography>
          </HvAccordion>
          <HvAccordion id="item2" label="System" headingLevel={2}>
            <HvTypography>item 2</HvTypography>
          </HvAccordion>
          <HvAccordion id="item3" label="Data" headingLevel={2} disabled>
            <HvTypography>item 2</HvTypography>
          </HvAccordion>
        </>
      );
      const analyticsItem = getByRole("button", { name: /Analytics/i });
      const analyticsContent = getByText("Views");
      expect(analyticsItem).toBeInTheDocument();
      expect(analyticsItem).toHaveAttribute("aria-expanded", "false");
      expect(analyticsItem).toHaveAttribute("aria-disabled", "true");
      userEvent.tab();
      expect(analyticsContent).not.toHaveFocus();
      fireEvent.keyDown(analyticsItem, { key: "Enter", keyCode: 13 }); // try to open
      await waitFor(() => {
        expect(analyticsItem).toBeInTheDocument();
        expect(analyticsContent).not.toBeVisible();
      });
      expect(analyticsItem).toHaveAttribute("aria-expanded", "false");
      expect(analyticsItem).toHaveAttribute("aria-disabled", "true");
    });
  });
});
