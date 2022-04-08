/* eslint-env jest */

import React from "react";

import { render, screen, fireEvent } from "testing-utils";
import userEvent from "@testing-library/user-event";
import {
  Main,
  RangeSlider,
  SingleDisabled,
  RangeSliderDisabled,
  ErrorSingleSlider,
  ErrorRangeSlider,
  NoInput,
  NoLabelNoInput,
  BlankSlider,
  RangeSliderControlled,
} from "../stories/Slider.stories";

describe("<HvSlider>", () => {
  describe("sample snapshot testing", () => {
    it("Main", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });
    it("Range Slider", () => {
      const { container } = render(<RangeSlider />);
      expect(container).toMatchSnapshot();
    });
    it("Disabled", () => {
      const { container } = render(<SingleDisabled />);
      expect(container).toMatchSnapshot();
    });
    it("Range Disabled", () => {
      const { container } = render(<RangeSliderDisabled />);
      expect(container).toMatchSnapshot();
    });
    it("Error", () => {
      const { container } = render(<ErrorSingleSlider />);
      expect(container).toMatchSnapshot();
    });
    it("Range Error", () => {
      const { container } = render(<ErrorRangeSlider />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("general structure", () => {
    it("renders the single slider as expected", () => {
      render(<Main />);
      const knob = screen.getByRole("slider");
      expect(knob).toBeInTheDocument();
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
      const text = screen.getByText("Failure Rate");
      expect(text).toBeInTheDocument();
    });
    it("renders the range slider as expected", () => {
      render(<RangeSlider />);
      const knobs = screen.getAllByRole("slider");
      expect(knobs.length).toBe(2);
      const inputs = screen.getAllByRole("textbox");
      expect(inputs.length).toBe(2);
      const text = screen.getByText("Failure Rate");
      expect(text).toBeInTheDocument();
    });
    it("renders the single slider with an error", () => {
      render(<ErrorSingleSlider />);
      const knob = screen.queryByRole("slider");
      expect(knob).not.toBeInTheDocument();
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
      const text = screen.getByText("Failure Rate");
      expect(text).toBeInTheDocument();
      const warningText = screen.getByText("Invalid because i said so");
      expect(warningText).toBeInTheDocument();
    });
    it("renders the range slider with an error", () => {
      render(<ErrorRangeSlider />);
      const knobs = screen.getAllByRole("slider");
      expect(knobs.length).toBe(1);
      const inputs = screen.getAllByRole("textbox");
      expect(inputs.length).toBe(2);
      const text = screen.getByText("Failure Rate");
      expect(text).toBeInTheDocument();
      const warningText = screen.getByText("Invalid because i said so");
      expect(warningText).toBeInTheDocument();
    });
    it("renders the slider without an input", () => {
      render(<NoInput />);
      const knob = screen.getByRole("slider");
      expect(knob).toBeInTheDocument();
      const input = screen.queryByRole("textbox");
      expect(input).not.toBeInTheDocument();
      const text = screen.getByText("Failure Rate");
      expect(text).toBeInTheDocument();
    });
    it("renders the slider with no label and no input", () => {
      render(<NoLabelNoInput />);
      const knob = screen.getByRole("slider");
      expect(knob).toBeInTheDocument();
      const input = screen.queryByRole("textbox");
      expect(input).not.toBeInTheDocument();
      const text = screen.queryByRole("Failure Rate");
      expect(text).not.toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    describe("single", () => {
      it("able to change its value when uncontrolled", async () => {
        const fifty = "50";
        const eighty = "80";
        const fiftyStyle =
          "border-color: transparent; box-shadow: none; background-color: rgb(65, 65, 65); width: 16px; height: 16px; left: 50%; right: auto; transform: translateX(-50%);";
        const eightyStyle =
          "border-color: transparent; box-shadow: none; background-color: rgb(65, 65, 65); width: 16px; height: 16px; left: 80%; right: auto; transform: translateX(-50%);";
        render(<Main />);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        let knob = screen.getByRole("slider");
        expect(knob).toBeInTheDocument();
        fireEvent.change(input, { target: { value: fifty } });
        fireEvent.blur(input);
        knob = await screen.findByRole("slider");
        // the version of the slider is not updating the value now so we are testing with the style
        // expect(knob).toHaveAttribute("aria-valuenow", fifty);
        expect(knob).toHaveStyle(fiftyStyle);
        expect(input).toHaveValue(fifty);
        const eightyMark = screen.getByText(eighty);
        userEvent.click(eightyMark);
        knob = await screen.findByRole("slider");
        expect(knob).toHaveStyle(eightyStyle);
        expect(input).toHaveValue(eighty);
      });
      it("does not change value when disable", async () => {
        const fifty = "50";
        const eighty = "80";
        const ten = "10";
        const tenStyle =
          "border-color: transparent; box-shadow: none; background-color: rgb(153, 153, 153); width: 16px; height: 16px; left: 10%; right: auto; transform: translateX(-50%);";
        render(<SingleDisabled />);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        let knob = screen.getByRole("slider");
        expect(knob).toBeInTheDocument();
        fireEvent.change(input, { target: { value: fifty } });
        fireEvent.blur(input);
        knob = await screen.findByRole("slider");
        expect(knob).toHaveStyle(tenStyle);
        expect(input).toHaveValue(ten);
        const eightyMark = screen.getByText(eighty);
        userEvent.click(eightyMark);
        knob = await screen.findByRole("slider");
        expect(knob).toHaveStyle(tenStyle);
        expect(input).toHaveValue(ten);
      });
      it("the knobs appear after interaction when blank", async () => {
        const empty = "";
        const eighty = "80";
        const ten = "10";
        const tenStyle =
          "border-color: transparent; box-shadow: none; background-color: rgb(65, 65, 65); width: 16px; height: 16px; left: 10%; right: auto; transform: translateX(-50%);";
        const eightyStyle =
          "border-color: transparent; box-shadow: none; background-color: rgb(65, 65, 65); width: 16px; height: 16px; left: 80%; right: auto; transform: translateX(-50%);";
        const requiredMessage = "The value is required";
        render(<BlankSlider />);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        let knob = screen.queryByRole("slider");
        expect(knob).not.toBeInTheDocument();
        fireEvent.blur(input);
        let warningText = await screen.findByText(requiredMessage);
        expect(warningText).toBeInTheDocument();
        expect(input).toHaveValue(empty);
        // click on 80
        const eightyMark = screen.getByText(eighty);
        userEvent.click(eightyMark);
        knob = await screen.findByRole("slider");
        expect(knob).toHaveStyle(eightyStyle);
        expect(input).toHaveValue(eighty);
        warningText = screen.queryByText(requiredMessage);
        expect(warningText).not.toBeInTheDocument();
        // empty again
        fireEvent.change(input, { target: { value: empty } });
        fireEvent.blur(input);
        warningText = await screen.findByText(requiredMessage);
        expect(warningText).toBeInTheDocument();
        knob = screen.queryByRole("slider");
        expect(knob).not.toBeInTheDocument();
        // fill by input
        fireEvent.change(input, { target: { value: ten } });
        fireEvent.blur(input);
        knob = await screen.findByRole("slider");
        expect(knob).toHaveStyle(tenStyle);
        expect(input).toHaveValue(ten);
        warningText = screen.queryByText(requiredMessage);
        expect(warningText).not.toBeInTheDocument();
      });
    });

    describe("range", () => {
      it("able to change its value when uncontrolled", async () => {
        const fifty = "50";
        const fiftyOne = "51";
        const fiftyStyle =
          "border-color: transparent; box-shadow: none; background-color: rgb(65, 65, 65); width: 16px; height: 16px; left: 50%; right: auto; transform: translateX(-50%);";
        const fiftyOneStyle =
          "border-color: transparent; box-shadow: none; background-color: rgb(65, 65, 65); width: 16px; height: 16px; left: 51%; right: auto; transform: translateX(-50%);";
        render(<RangeSlider />);
        const inputs = screen.getAllByRole("textbox");
        expect(inputs.length).toBe(2);
        let knobs = screen.getAllByRole("slider");
        expect(knobs.length).toBe(2);
        fireEvent.change(inputs[0], { target: { value: fifty } });
        fireEvent.blur(inputs[0]);
        knobs = await screen.findAllByRole("slider");
        expect(knobs[0]).toHaveStyle(fiftyStyle);
        expect(knobs[1]).toHaveStyle(fiftyOneStyle);
        expect(inputs[0]).toHaveValue(fifty);
        expect(inputs[1]).toHaveValue(fiftyOne);

        // RC slider click to point is not consistent between single and multi
        // we are unable to test the point to go feature in test utils
      });
      it("able to change its value when controlled", async () => {
        const fifty = "0.0";
        const fiftyOne = "0.2";
        const fiftyStyle =
          "border-color: transparent; box-shadow: none; background-color: rgb(65, 65, 65); width: 16px; height: 16px; left: 50%; right: auto; transform: translateX(-50%);";
        const fiftyOneStyle =
          "border-color: transparent; box-shadow: none; background-color: rgb(65, 65, 65); width: 16px; height: 16px; left: 51%; right: auto; transform: translateX(-50%);";
        render(<RangeSliderControlled />);
        const inputs = screen.getAllByRole("textbox");
        expect(inputs.length).toBe(2);
        let knobs = screen.getAllByRole("slider");
        expect(knobs.length).toBe(2);
        fireEvent.change(inputs[0], { target: { value: fifty } });
        fireEvent.blur(inputs[0]);
        fireEvent.change(inputs[1], { target: { value: fiftyOne } });
        fireEvent.blur(inputs[1]);
        knobs = await screen.findAllByRole("slider");
        expect(knobs[0]).toHaveStyle(fiftyStyle);
        expect(knobs[1]).toHaveStyle(fiftyOneStyle);
        expect(inputs[0]).toHaveValue(fifty);
        expect(inputs[1]).toHaveValue(fiftyOne);
      });
      it("does not change value when disable", async () => {
        const forty = "40";
        const ten = "10";
        const fifty = "50";
        const tenStyle =
          "border-color: transparent; box-shadow: none; background-color: rgb(153, 153, 153); width: 16px; height: 16px; left: 10%; right: auto; transform: translateX(-50%);";
        const fortyStyle =
          "border-color: transparent; box-shadow: none; background-color: rgb(153, 153, 153); width: 16px; height: 16px; left: 40%; right: auto; transform: translateX(-50%);";
        render(<RangeSliderDisabled />);
        const inputs = screen.getAllByRole("textbox");
        let knobs = screen.getAllByRole("slider");
        expect(knobs.length).toBe(2);
        fireEvent.change(inputs[0], { target: { value: fifty } });
        fireEvent.blur(inputs[0]);
        knobs = await screen.findAllByRole("slider");
        expect(knobs[0]).toHaveStyle(tenStyle);
        expect(knobs[1]).toHaveStyle(fortyStyle);
        expect(inputs[0]).toHaveValue(ten);
        expect(inputs[1]).toHaveValue(forty);
      });
    });
  });
});
