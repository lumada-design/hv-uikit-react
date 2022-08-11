import React from "react";
import { render, screen } from "testing-utils";
import { HvWizardTitle } from "../..";

describe("WizardTitle", () => {
  const mockTitle = "Mock Wizard Title";
  const mockSummaryLabel = "Mock Summary Btn";

  it("should render and present title and step navigation component without summary button", () => {
    render(
      <HvWizardTitle
        title={mockTitle}
        labels={{ summary: mockSummaryLabel }}
        tab={0}
        changeTab={jest.fn()}
      />
    );

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.queryByText(mockSummaryLabel)).not.toBeInTheDocument();
  });

  it("should render and present title and step navigation component with summary button", () => {
    render(
      <HvWizardTitle
        title={mockTitle}
        hasSummary
        labels={{ summary: mockSummaryLabel }}
        tab={0}
        changeTab={jest.fn()}
      />
    );

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText(mockSummaryLabel)).toBeInTheDocument();
  });
});
