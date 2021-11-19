/* eslint-env jest */

import React from "react";

import { render, waitFor, screen, fireEvent } from "testing-utils";
import userEvent from "@testing-library/user-event";
import { Main, Disabled } from "../stories/Accordion.stories";

describe("Accordion", () => {
  describe("sample snapshot testing", () => {
    it("Main", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });
    it("Disabled", () => {
      const { container } = render(<Disabled />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("general structure", () => {
    it("renders the component as expected", () => {
      const testAttributes = (component) => {
        expect(component).toBeInTheDocument();
        expect(component).toHaveAttribute("aria-expanded", "false");
        expect(component).toHaveAttribute("aria-disabled", "false");
      };
      render(<Main />);
      const analyticsItem = screen.getByRole("button", { name: /Analytics/i });
      testAttributes(analyticsItem);
      const systemItem = screen.getByRole("button", { name: /System/i });
      testAttributes(systemItem);
      const dataItem = screen.getByRole("button", { name: /Data/i });
      testAttributes(dataItem);
    });
  });

  describe("interactions", () => {
    it("opens and closes the content", async () => {
      render(<Main />);
      const analyticsItem = screen.getByRole("button", { name: /Analytics/i });
      const analyticsContent = screen.getByText("Views");
      expect(analyticsItem).toBeInTheDocument();
      expect(analyticsItem).toHaveAttribute("aria-expanded", "false");
      expect(analyticsItem).toHaveAttribute("aria-disabled", "false");
      userEvent.tab();
      expect(analyticsContent).not.toHaveFocus();
      userEvent.click(analyticsItem); // open
      await waitFor(() => {
        expect(analyticsItem).toBeInTheDocument();
      });
      expect(analyticsItem).toHaveAttribute("aria-expanded", "true");
      userEvent.tab();
      expect(analyticsContent).toHaveFocus();
      userEvent.click(analyticsItem); // close
      await waitFor(() => {
        expect(analyticsItem).toBeInTheDocument();
      });
      expect(analyticsItem).toHaveAttribute("aria-expanded", "false");
      userEvent.tab();
      expect(analyticsContent).not.toHaveFocus();
    });
    it("opens and closes the content using the keyboard", async () => {
      render(<Main />);
      const analyticsItem = screen.getByRole("button", { name: /Analytics/i });
      const analyticsContent = screen.getByText("Views");
      expect(analyticsItem).toBeInTheDocument();
      expect(analyticsItem).toHaveAttribute("aria-expanded", "false");
      expect(analyticsItem).toHaveAttribute("aria-disabled", "false");
      userEvent.tab();
      expect(analyticsContent).not.toHaveFocus();
      fireEvent.keyDown(analyticsItem, { key: "Enter", keyCode: 13 }); // open
      await waitFor(() => {
        expect(analyticsItem).toBeInTheDocument();
      });
      expect(analyticsItem).toHaveAttribute("aria-expanded", "true");
      userEvent.tab();
      expect(analyticsContent).toHaveFocus();
      fireEvent.keyDown(analyticsItem, { key: "Enter", keyCode: 13 });
      await waitFor(() => {
        expect(analyticsItem).toBeInTheDocument();
      });
      expect(analyticsItem).toHaveAttribute("aria-expanded", "false");
      userEvent.tab();
      expect(analyticsContent).not.toHaveFocus();
    });
    it("cannot open a disabled accordion", async () => {
      render(<Disabled />);
      const analyticsItem = screen.getByRole("button", { name: /Analytics/i });
      const analyticsContent = screen.getByText("Views");
      expect(analyticsItem).toBeInTheDocument();
      expect(analyticsItem).toHaveAttribute("aria-expanded", "false");
      expect(analyticsItem).toHaveAttribute("aria-disabled", "true");
      userEvent.tab();
      expect(analyticsContent).not.toHaveFocus();
      userEvent.click(analyticsItem); // try to open
      await waitFor(() => {
        expect(analyticsItem).toBeInTheDocument();
      });
      expect(analyticsItem).toHaveAttribute("aria-expanded", "false");
      expect(analyticsItem).toHaveAttribute("aria-disabled", "true");
      userEvent.tab();
      expect(analyticsContent).not.toHaveFocus();
    });
    it("cannot open a disabled accordion with keyboard", async () => {
      render(<Disabled />);
      const analyticsItem = screen.getByRole("button", { name: /Analytics/i });
      const analyticsContent = screen.getByText("Views");
      expect(analyticsItem).toBeInTheDocument();
      expect(analyticsItem).toHaveAttribute("aria-expanded", "false");
      expect(analyticsItem).toHaveAttribute("aria-disabled", "true");
      userEvent.tab();
      expect(analyticsContent).not.toHaveFocus();
      fireEvent.keyDown(analyticsItem, { key: "Enter", keyCode: 13 }); // try to open
      await waitFor(() => {
        expect(analyticsItem).toBeInTheDocument();
      });
      expect(analyticsItem).toHaveAttribute("aria-expanded", "false");
      expect(analyticsItem).toHaveAttribute("aria-disabled", "true");
      userEvent.tab();
      expect(analyticsContent).not.toHaveFocus();
    });
  });
});
