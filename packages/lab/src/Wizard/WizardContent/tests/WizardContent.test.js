import React from "react";
import { render, screen } from "testing-utils";
import { HvWizardContent } from "../..";

describe("WizardContent", () => {
  const firstComponentText = "First Component";
  const secondComponentText = "Second Component";
  it("should render the component with the first child, and rerender the second one correctly", () => {
    const { rerender } = render(
      <HvWizardContent tab={0}>
        <div>{firstComponentText}</div>
        <div>{secondComponentText}</div>
      </HvWizardContent>
    );

    expect(screen.getByText(firstComponentText)).toBeInTheDocument();
    expect(screen.queryByText(secondComponentText)).not.toBeInTheDocument();

    rerender(
      <HvWizardContent tab={1}>
        <div>{firstComponentText}</div>
        <div>{secondComponentText}</div>
      </HvWizardContent>
    );

    expect(screen.queryByText(firstComponentText)).not.toBeInTheDocument();
    expect(screen.getByText(secondComponentText)).toBeInTheDocument();
  });
});
