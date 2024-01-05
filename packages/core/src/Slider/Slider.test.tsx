import { useState } from "react";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import { HvSlider } from "./Slider";

const Main = () => <HvSlider label="Failure Rate" defaultValues={[10]} />;

const RangeSliderControlled = () => {
  const [values, setValues] = useState<number[]>([0, 2]);

  const onChangeHandler = (knobs: number[]) => {
    setValues(knobs);
  };

  return (
    <HvSlider
      label="Failure Rate"
      values={values}
      onChange={onChangeHandler}
      maxPointValue={10}
      minPointValue={-10}
      markStep={10}
      markDigits={1}
    />
  );
};

describe("Slider", () => {
  describe("general structure", () => {
    it("renders the single slider as expected", () => {
      const { getByRole, getByText } = render(<Main />);

      const knob = getByRole("slider");
      expect(knob).toBeInTheDocument();

      const input = getByRole("textbox");
      expect(input).toBeInTheDocument();

      const text = getByText("Failure Rate");
      expect(text).toBeInTheDocument();
    });

    it("renders the range slider as expected", () => {
      const { getAllByRole, getByText } = render(
        <HvSlider label="Failure Rate" defaultValues={[10, 40]} />
      );

      const knobs = getAllByRole("slider");
      expect(knobs.length).toBe(2);

      const inputs = getAllByRole("textbox");
      expect(inputs.length).toBe(2);

      const text = getByText("Failure Rate");
      expect(text).toBeInTheDocument();
    });

    it("renders the single slider with an error", () => {
      const { queryByRole, getByRole, getByText } = render(
        <HvSlider
          label="Failure Rate"
          status="invalid"
          statusMessage="Invalid"
        />
      );

      const knob = queryByRole("slider");
      expect(knob).not.toBeInTheDocument();

      const input = getByRole("textbox");
      expect(input).toBeInTheDocument();

      const text = getByText("Failure Rate");
      expect(text).toBeInTheDocument();

      const warningText = getByText("Invalid");
      expect(warningText).toBeInTheDocument();
    });

    it("renders the range slider with an error", () => {
      const { getAllByRole, getByText } = render(
        <HvSlider
          label="Failure Rate"
          status="invalid"
          statusMessage="Invalid "
          defaultValues={[undefined, 53]}
        />
      );

      const knobs = getAllByRole("slider");
      expect(knobs.length).toBe(1);

      const inputs = getAllByRole("textbox");
      expect(inputs.length).toBe(2);

      const text = getByText("Failure Rate");
      expect(text).toBeInTheDocument();

      const warningText = getByText("Invalid");
      expect(warningText).toBeInTheDocument();
    });

    it("renders the slider without an input", () => {
      const { getByRole, queryByRole, getByText } = render(
        <HvSlider label="Failure Rate" defaultValues={[10]} hideInput />
      );

      const knob = getByRole("slider");
      expect(knob).toBeInTheDocument();

      const input = queryByRole("textbox");
      expect(input).not.toBeInTheDocument();

      const text = getByText("Failure Rate");
      expect(text).toBeInTheDocument();
    });

    it("renders the slider with no label and no input", () => {
      const { getByRole, queryByRole } = render(
        <HvSlider
          knobProps={[{ "aria-label": "no-label-knob" }]}
          hideInput
          defaultValues={[10]}
        />
      );

      const knob = getByRole("slider");
      expect(knob).toBeInTheDocument();

      const input = queryByRole("textbox");
      expect(input).not.toBeInTheDocument();

      const text = queryByRole("Failure Rate");
      expect(text).not.toBeInTheDocument();
    });

    it("renders the slider with the correct marks", () => {
      const { getByText } = render(
        <HvSlider
          knobProps={[{ "aria-label": "no-label-knob" }]}
          hideInput
          minPointValue={0}
          maxPointValue={100}
          divisionQuantity={100}
          markStep={25}
        />
      );

      const zeroMark = getByText("0");
      const twentyFiveMark = getByText("25");
      const fiftyMark = getByText("50");
      const seventyFiveMark = getByText("75");
      const oneHundredMark = getByText("100");

      expect(zeroMark).toBeInTheDocument();
      expect(twentyFiveMark).toBeInTheDocument();
      expect(fiftyMark).toBeInTheDocument();
      expect(seventyFiveMark).toBeInTheDocument();
      expect(oneHundredMark).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    describe("single", () => {
      it("able to change its value when uncontrolled", async () => {
        const fifty = "50";
        const eighty = "80";
        const fiftyStyle = "left: 50%;";
        const eightyStyle = "left: 80%;";

        const { getByRole, findByRole, getByText } = render(<Main />);

        const input = getByRole("textbox");
        expect(input).toBeInTheDocument();

        let knob = getByRole("slider");
        expect(knob).toBeInTheDocument();

        fireEvent.change(input, { target: { value: fifty } });
        fireEvent.blur(input);

        knob = await findByRole("slider");
        // The version of the slider is not updating the value now so we are testing with the style
        expect(knob).toHaveStyle(fiftyStyle);
        expect(input).toHaveValue(fifty);

        const eightyMark = getByText(eighty);
        await userEvent.click(eightyMark);

        knob = await findByRole("slider");
        expect(knob).toHaveStyle(eightyStyle);
        expect(input).toHaveValue(eighty);
      });

      it("does not change value when disable", async () => {
        const fifty = "50";
        const eighty = "80";
        const ten = "10";
        const tenStyle = "left: 10%;";

        const { getByRole, findByRole, getByText } = render(
          <HvSlider label="Failure Rate" defaultValues={[10]} disabled />
        );

        const input = getByRole("textbox");
        expect(input).toBeInTheDocument();

        let knob = getByRole("slider");
        expect(knob).toBeInTheDocument();

        fireEvent.change(input, { target: { value: fifty } });
        fireEvent.blur(input);

        knob = await findByRole("slider");
        expect(knob).toHaveStyle(tenStyle);
        expect(input).toHaveValue(ten);

        const eightyMark = getByText(eighty);
        userEvent.click(eightyMark);

        knob = await findByRole("slider");
        expect(knob).toHaveStyle(tenStyle);
        expect(input).toHaveValue(ten);
      });

      it("the knobs appear after interaction when blank", async () => {
        const empty = "";
        const eighty = "80";
        const ten = "10";
        const tenStyle = "left: 10%;";
        const eightyStyle = "left: 80%;";
        const requiredMessage = "The value is required";
        let warningText: HTMLElement | null = null;

        const {
          getByRole,
          queryByRole,
          findByText,
          findByRole,
          getByText,
          queryByText,
        } = render(<HvSlider label="Failure Rate" required />);

        const input = getByRole("textbox");
        expect(input).toBeInTheDocument();

        let knob = queryByRole("slider");
        expect(knob).not.toBeInTheDocument();

        fireEvent.blur(input);

        warningText = await findByText(requiredMessage);
        expect(warningText).toBeInTheDocument();
        expect(input).toHaveValue(empty);

        // Click on 80
        const eightyMark = getByText(eighty);
        userEvent.click(eightyMark);

        knob = await findByRole("slider");
        expect(knob).toHaveStyle(eightyStyle);
        expect(input).toHaveValue(eighty);

        warningText = queryByText(requiredMessage);
        expect(warningText).not.toBeInTheDocument();

        // empty again
        fireEvent.change(input, { target: { value: empty } });
        fireEvent.blur(input);

        warningText = await findByText(requiredMessage);
        expect(warningText).toBeInTheDocument();

        knob = queryByRole("slider");
        expect(knob).not.toBeInTheDocument();

        // Fill by input
        fireEvent.change(input, { target: { value: ten } });
        fireEvent.blur(input);

        knob = await findByRole("slider");
        expect(knob).toHaveStyle(tenStyle);
        expect(input).toHaveValue(ten);

        warningText = queryByText(requiredMessage);
        expect(warningText).not.toBeInTheDocument();
      });
    });

    describe("range", () => {
      it("able to change its value when uncontrolled", async () => {
        const fifty = "50";
        const fiftyOne = "51";
        const fiftyStyle = "left: 50%;";
        const fiftyOneStyle = "left: 51%;";

        const { findAllByRole, getAllByRole } = render(
          <HvSlider label="Failure Rate" defaultValues={[10, 40]} />
        );

        const inputs = getAllByRole("textbox");
        expect(inputs.length).toBe(2);

        let knobs = getAllByRole("slider");
        expect(knobs.length).toBe(2);

        fireEvent.change(inputs[0], { target: { value: fifty } });
        fireEvent.blur(inputs[0]);

        knobs = await findAllByRole("slider");
        expect(knobs[0]).toHaveStyle(fiftyStyle);
        expect(knobs[1]).toHaveStyle(fiftyOneStyle);
        expect(inputs[0]).toHaveValue(fifty);
        expect(inputs[1]).toHaveValue(fiftyOne);
      });

      it("able to change its value when controlled", async () => {
        const fifty = "0.0";
        const fiftyOne = "0.2";
        const fiftyStyle = "left: 50%;";
        const fiftyOneStyle = "left: 51%;";

        const { getAllByRole, findAllByRole } = render(
          <RangeSliderControlled />
        );

        const inputs = getAllByRole("textbox");
        expect(inputs.length).toBe(2);

        let knobs = getAllByRole("slider");
        expect(knobs.length).toBe(2);

        fireEvent.change(inputs[0], { target: { value: fifty } });
        fireEvent.blur(inputs[0]);
        fireEvent.change(inputs[1], { target: { value: fiftyOne } });
        fireEvent.blur(inputs[1]);

        knobs = await findAllByRole("slider");
        expect(knobs[0]).toHaveStyle(fiftyStyle);
        expect(knobs[1]).toHaveStyle(fiftyOneStyle);
        expect(inputs[0]).toHaveValue(fifty);
        expect(inputs[1]).toHaveValue(fiftyOne);
      });

      it("does not change value when disable", async () => {
        const forty = "40";
        const ten = "10";
        const fifty = "50";
        const tenStyle = "left: 10%;";
        const fortyStyle = "left: 40%;";

        const { getAllByRole, findAllByRole } = render(
          <HvSlider label="Failure Rate" defaultValues={[10, 40]} disabled />
        );

        const inputs = getAllByRole("textbox");
        expect(inputs.length).toBe(2);

        let knobs = getAllByRole("slider");
        expect(knobs.length).toBe(2);

        fireEvent.change(inputs[0], { target: { value: fifty } });
        fireEvent.blur(inputs[0]);

        knobs = await findAllByRole("slider");
        expect(knobs[0]).toHaveStyle(tenStyle);
        expect(knobs[1]).toHaveStyle(fortyStyle);
        expect(inputs[0]).toHaveValue(ten);
        expect(inputs[1]).toHaveValue(forty);
      });
    });
  });
});
