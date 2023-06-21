import { render, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Controls,
  ControlsControlled,
  CustomControls,
  MixedControls,
} from "./Controls.stories";

describe("<HvControls>", () => {
  describe("general structure", () => {
    it("renders the controls as expected", () => {
      const { getByRole, getByPlaceholderText, getAllByRole, getAllByText } =
        render(<Controls />);
      const dropdown = getByRole("combobox");
      expect(dropdown).toBeInTheDocument();
      const input = getByPlaceholderText("Search");
      expect(input).toBeInTheDocument();
      const buttons = getAllByRole("button");
      expect(buttons.length).toBe(2);
      const cards = getAllByText(/Severity/);
      expect(cards.length).toBe(10);
    });
    it("renders the controlled controls", () => {
      const { getByRole, getByPlaceholderText, getAllByRole, getAllByText } =
        render(<ControlsControlled />);
      const dropdown = getByRole("combobox");
      expect(dropdown).toBeInTheDocument();
      const input = getByPlaceholderText("Search");
      expect(input).toBeInTheDocument();
      const buttons = getAllByRole("button");
      expect(buttons.length).toBe(2);
      const cards = getAllByText(/Severity/);
      expect(cards.length).toBe(10);
    });
    it("renders the custom controls", () => {
      const { getAllByRole, getAllByText } = render(<CustomControls />);
      // const slider = queryByRole("slider");
      // expect(slider).toBeInTheDocument();
      const buttons = getAllByRole("button");
      expect(buttons.length).toBe(5);
      const cards = getAllByText(/Severity/);
      expect(cards.length).toBe(15);
    });
    it("renders the mixed controls", () => {
      const { getAllByRole, getAllByText, getByPlaceholderText } = render(
        <MixedControls />
      );
      // const slider = queryByRole("slider");
      // expect(slider).toBeInTheDocument();
      const buttons = getAllByRole("button");
      expect(buttons.length).toBe(5);
      const input = getByPlaceholderText("Search");
      expect(input).toBeInTheDocument();
      const cards = getAllByText(/Severity/);
      expect(cards.length).toBe(15);
    });
  });

  describe("interactions", () => {
    describe("controls", () => {
      it("able to switch views with the buttons", async () => {
        const { getAllByText, getAllByRole, findAllByText, queryAllByText } =
          render(<Controls />);
        let cards = getAllByText(/Severity/);
        expect(cards.length).toBe(10);
        const buttons = getAllByRole("button");
        expect(buttons.length).toBe(2);
        fireEvent.click(buttons[1]);
        const listItems = await findAllByText(/Event/);
        expect(listItems.length).toBe(10);
        cards = queryAllByText(/Severity/);
        expect(cards.length).toBe(0);
      });
      it("able to sort with the dropdown", async () => {
        const { getAllByText, getByRole, findAllByText, findByText } = render(
          <Controls />
        );
        const dropdown = getByRole("combobox");
        expect(dropdown).toBeInTheDocument();
        let cards = getAllByText(/Event/);
        expect(cards[0].innerHTML).toBe("Event 1");
        fireEvent.click(dropdown);
        const sortingOption = await findByText("Name Descending");
        fireEvent.click(sortingOption);
        cards = await findAllByText(/Event/);
        expect(cards[0].innerHTML).toBe("Event 10");
      });
      it("able to filter with the input", async () => {
        const { getAllByText, getByPlaceholderText, findAllByText } = render(
          <Controls />
        );
        let cards = getAllByText(/Severity/);
        expect(cards.length).toBe(10);
        const Major = "Major";
        const input = getByPlaceholderText("Search");
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value: Major } });
        cards = await findAllByText(/Severity/);
        expect(cards.length).toBe(3);
      });
    });
    describe("controls Controlled", () => {
      it("able to switch views with the buttons", async () => {
        const { getAllByText, queryAllByText, getAllByRole, findAllByText } =
          render(<ControlsControlled />);
        let cards = getAllByText(/Severity/);
        expect(cards.length).toBe(10);
        const buttons = getAllByRole("button");
        expect(buttons.length).toBe(2);
        fireEvent.click(buttons[1]);
        const listItems = await findAllByText(/Event/);
        expect(listItems.length).toBe(10);
        cards = queryAllByText(/Severity/);
        expect(cards.length).toBe(0);
      });
      it("able to sort with the dropdown", async () => {
        const { getAllByText, getByRole, findByText, findAllByText } = render(
          <ControlsControlled />
        );
        const dropdown = getByRole("combobox");
        expect(dropdown).toBeInTheDocument();
        let cards = getAllByText(/Event/);
        expect(cards[0].innerHTML).toBe("Event 1");
        fireEvent.click(dropdown);
        const sortingOption = await findByText("Name Descending");
        fireEvent.click(sortingOption);
        cards = await findAllByText(/Event/);
        expect(cards[0].innerHTML).toBe("Event 10");
      });
      it("able to filter with the input", async () => {
        const { getAllByText, getByPlaceholderText, findAllByText } = render(
          <ControlsControlled />
        );
        let cards = getAllByText(/Severity/);
        expect(cards.length).toBe(10);
        const input = getByPlaceholderText("Search");
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value: "Major" } });
        cards = await findAllByText(/Severity/);
        expect(cards.length).toBe(3);
      });
    });
    describe("custom controls", () => {
      it("able to filter with the multibutton", async () => {
        const { getAllByText, getByText, findAllByText } = render(
          <CustomControls />
        );
        let cards = getAllByText(/Severity/);
        expect(cards.length).toBe(15);
        const button = getByText("Major");
        fireEvent.click(button);
        cards = await findAllByText(/Severity/);
        expect(cards.length).toBe(4);
      });
      // it("able to filter with the slider", async () => {
      //   const { getAllByText, getByText, findAllByText } = render(
      //     <CustomControls />
      //   );
      //   const sixtyOneMark = getByText("43");
      //   let cards = getAllByText(/Severity/);
      //   expect(cards.length).toBe(15);
      //   fireEvent.click(sixtyOneMark);
      //   cards = await findAllByText(/Severity/);
      //   expect(cards.length).toBe(6);
      // });
    });
    describe("mixed controls", () => {
      it("able to filter with the multibutton", async () => {
        const { getAllByText, getByText, findAllByText } = render(
          <MixedControls />
        );
        let cards = getAllByText(/Severity/);
        expect(cards.length).toBe(15);
        const button = getByText("Major");
        fireEvent.click(button);
        cards = await findAllByText(/Severity/);
        expect(cards.length).toBe(4);
      });
      // it("able to filter with the slider", async () => {
      //   const { getAllByText, getByText, findAllByText } = render(
      //     <MixedControls />
      //   );
      //   const sixtyOneMark = getByText("43");
      //   let cards = getAllByText(/Severity/);
      //   expect(cards.length).toBe(15);
      //   fireEvent.click(sixtyOneMark);
      //   cards = await findAllByText(/Severity/);
      //   expect(cards.length).toBe(6);
      // });
      it("able to filter with the input", async () => {
        const { getAllByText, getByPlaceholderText, findAllByText } = render(
          <MixedControls />
        );
        let cards = getAllByText(/Severity/);
        expect(cards.length).toBe(15);
        const input = getByPlaceholderText("Search");
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value: "Major" } });
        cards = await findAllByText(/Severity/);
        expect(cards.length).toBe(4);
      });
    });
  });
});
