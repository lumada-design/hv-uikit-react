import { act, render, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { HvStepNavigation } from "./StepNavigation";
import { HvStepProps } from "./DefaultNavigation";

type StepType = Pick<
  HvStepProps,
  "state" | "title" | "onClick" | "className" | "disabled"
> & {
  separatorClassName?: string;
  titleClassName?: string;
};

const steps: StepType[] = [
  { title: "Completed", state: "Completed" },
  { title: "Failed", state: "Failed" },
  { title: "Pending", state: "Pending" },
  { title: "Current", state: "Current" },
  { title: "Enabled", state: "Enabled" },
  { title: "Disabled", state: "Disabled" },
];

describe("StepNavigation", () => {
  it("should contain all the steps", () => {
    const { getByLabelText } = render(<HvStepNavigation steps={steps} />);

    expect(getByLabelText("step-Completed")).toBeInTheDocument();
    expect(getByLabelText("step-Failed")).toBeInTheDocument();
    expect(getByLabelText("step-Pending")).toBeInTheDocument();
    expect(getByLabelText("step-Current")).toBeInTheDocument();
    expect(getByLabelText("step-Enabled")).toBeInTheDocument();
    expect(getByLabelText("step-Disabled")).toBeInTheDocument();
  });

  it("should show a tooltip on hover", () => {
    const { getByLabelText, findByRole, queryByRole } = render(
      <HvStepNavigation type="Simple" showTitles={false} steps={steps} />
    );
    act(async () => {
      userEvent.hover(getByLabelText("step-container-Pending"));
      const tooltip = await findByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
      userEvent.unhover(getByLabelText("step-container-Pending"));
      await waitForElementToBeRemoved(() => queryByRole("tooltip"));
      expect(tooltip).not.toBeInTheDocument();
    });
  });
});
