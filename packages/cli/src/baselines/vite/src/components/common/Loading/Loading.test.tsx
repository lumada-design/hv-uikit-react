import { render, screen } from "@testing-library/react";
import { TestProvider as wrapper } from "tests/providers";
import { Loading } from ".";

describe("<Loading />", () => {
  it("renders the label", () => {
    const MOCK_LABEL = "MOCK_LABEL";
    render(<Loading label={MOCK_LABEL} />), { wrapper };

    expect(screen.getByText(MOCK_LABEL)).toBeInTheDocument();
  });

  it("renders the aria loading", () => {
    render(<Loading />), { wrapper };

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
