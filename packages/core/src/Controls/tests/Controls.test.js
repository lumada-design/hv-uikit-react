/* eslint-env jest */

import React from "react";

import { render, screen, fireEvent } from "testing-utils";
import userEvent from "@testing-library/user-event";
import {
  Controls,
  ControlsControlled,
  CustomControls,
  MixedControls,
} from "../stories/Controls.stories";

describe("<HvControls>", () => {
  describe("sample snapshot testing", () => {
    it("Controls", () => {
      const { container } = render(<Controls />);
      expect(container).toMatchSnapshot();
    });
    it("Controls Controlled", () => {
      const { container } = render(<ControlsControlled />);
      expect(container).toMatchSnapshot();
    });
    it("Custom Controls", () => {
      const { container } = render(<CustomControls />);
      expect(container).toMatchSnapshot();
    });
    it("Mixed Controls", () => {
      const { container } = render(<MixedControls />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("general structure", () => {
    it("renders the controls as expected", () => {
      render(<Controls />);
      const dropdown = screen.getByRole("combobox");
      expect(dropdown).toBeInTheDocument();
      const input = screen.getByPlaceholderText("Search");
      expect(input).toBeInTheDocument();
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBe(2);
      const cards = screen.getAllByText(/Severity/);
      expect(cards.length).toBe(10);
    });
    it("renders the controlled controls", () => {
      render(<ControlsControlled />);
      const dropdown = screen.getByRole("combobox");
      expect(dropdown).toBeInTheDocument();
      const input = screen.getByPlaceholderText("Search");
      expect(input).toBeInTheDocument();
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBe(2);
      const cards = screen.getAllByText(/Severity/);
      expect(cards.length).toBe(10);
    });
    it("renders the custom controls", () => {
      render(<CustomControls />);
      const slider = screen.queryByRole("slider");
      expect(slider).toBeInTheDocument();
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBe(5);
      const cards = screen.getAllByText(/Severity/);
      expect(cards.length).toBe(15);
    });
    it("renders the mixed controls", () => {
      render(<MixedControls />);
      const slider = screen.queryByRole("slider");
      expect(slider).toBeInTheDocument();
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBe(5);
      const input = screen.getByPlaceholderText("Search");
      expect(input).toBeInTheDocument();
      const cards = screen.getAllByText(/Severity/);
      expect(cards.length).toBe(15);
    });
  });

  describe("interactions", () => {
    describe("controls", () => {
      it("able to switch views with the buttons", async () => {
        render(<Controls />);
        let cards = screen.getAllByText(/Severity/);
        expect(cards.length).toBe(10);
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(2);
        fireEvent.click(buttons[1]);
        const listItems = await screen.findAllByText(/Event/);
        expect(listItems.length).toBe(10);
        cards = screen.queryAllByText(/Severity/);
        expect(cards.length).toBe(0);
      });
      it("able to sort with the dropdown", async () => {
        render(<Controls />);
        const dropdown = screen.getByRole("combobox");
        expect(dropdown).toBeInTheDocument();
        let cards = screen.getAllByText(/Event/);
        expect(cards[0].innerHTML).toBe("Event 1");
        userEvent.click(dropdown);
        const sortingOption = await screen.findByText("Name Descending");
        userEvent.click(sortingOption);
        cards = await screen.findAllByText(/Event/);
        expect(cards[0].innerHTML).toBe("Event 10");
      });
      it("able to filter with the input", async () => {
        render(<Controls />);
        let cards = screen.getAllByText(/Severity/);
        expect(cards.length).toBe(10);
        const Major = "Major";
        const input = screen.getByPlaceholderText("Search");
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value: Major } });
        cards = await screen.findAllByText(/Severity/);
        expect(cards.length).toBe(3);
      });
    });
    describe("controls Controlled", () => {
      it("able to switch views with the buttons", async () => {
        render(<ControlsControlled />);
        let cards = screen.getAllByText(/Severity/);
        expect(cards.length).toBe(10);
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(2);
        fireEvent.click(buttons[1]);
        const listItems = await screen.findAllByText(/Event/);
        expect(listItems.length).toBe(10);
        cards = screen.queryAllByText(/Severity/);
        expect(cards.length).toBe(0);
      });
      it("able to sort with the dropdown", async () => {
        render(<ControlsControlled />);
        const dropdown = screen.getByRole("combobox");
        expect(dropdown).toBeInTheDocument();
        let cards = screen.getAllByText(/Event/);
        expect(cards[0].innerHTML).toBe("Event 1");
        userEvent.click(dropdown);
        const sortingOption = await screen.findByText("Name Descending");
        userEvent.click(sortingOption);
        cards = await screen.findAllByText(/Event/);
        expect(cards[0].innerHTML).toBe("Event 10");
      });
      it("able to filter with the input", async () => {
        render(<ControlsControlled />);
        let cards = screen.getAllByText(/Severity/);
        expect(cards.length).toBe(10);
        const input = screen.getByPlaceholderText("Search");
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value: "Major" } });
        cards = await screen.findAllByText(/Severity/);
        expect(cards.length).toBe(3);
      });
    });
    describe("custom controls", () => {
      it("able to filter with the multibutton", async () => {
        render(<CustomControls />);
        let cards = screen.getAllByText(/Severity/);
        expect(cards.length).toBe(15);
        const button = screen.getByText("Major");
        userEvent.click(button);
        cards = await screen.findAllByText(/Severity/);
        expect(cards.length).toBe(4);
      });
      it("able to filter with the slider", async () => {
        render(<CustomControls />);
        const sixtyOneMark = screen.getByText("43");
        let cards = screen.getAllByText(/Severity/);
        expect(cards.length).toBe(15);
        userEvent.click(sixtyOneMark);
        cards = await screen.findAllByText(/Severity/);
        expect(cards.length).toBe(6);
      });
    });
    describe("mixed controls", () => {
      it("able to filter with the multibutton", async () => {
        render(<MixedControls />);
        let cards = screen.getAllByText(/Severity/);
        expect(cards.length).toBe(15);
        const button = screen.getByText("Major");
        userEvent.click(button);
        cards = await screen.findAllByText(/Severity/);
        expect(cards.length).toBe(4);
      });
      it("able to filter with the slider", async () => {
        render(<MixedControls />);
        const sixtyOneMark = screen.getByText("43");
        let cards = screen.getAllByText(/Severity/);
        expect(cards.length).toBe(15);
        userEvent.click(sixtyOneMark);
        cards = await screen.findAllByText(/Severity/);
        expect(cards.length).toBe(6);
      });
      it("able to filter with the input", async () => {
        render(<MixedControls />);
        let cards = screen.getAllByText(/Severity/);
        expect(cards.length).toBe(15);
        const input = screen.getByPlaceholderText("Search");
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value: "Major" } });
        cards = await screen.findAllByText(/Severity/);
        expect(cards.length).toBe(4);
      });
    });
  });
});
