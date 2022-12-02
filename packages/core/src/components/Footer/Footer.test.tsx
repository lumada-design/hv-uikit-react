import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("should render correctly", () => {
    const { container } = render(<Footer />);
    expect(container).toBeDefined();
  });

  it("should render the custom props correctly", () => {
    const mockName = <div>mockName</div>;
    const mockCopyright = <div>mockCopyright</div>;
    const mockLinks = <div>mockLinks</div>;

    const { getByText } = render(
      <Footer name={mockName} copyright={mockCopyright} links={mockLinks} />
    );
    expect(getByText("mockName")).toBeInTheDocument();
    expect(getByText("mockCopyright")).toBeInTheDocument();
    expect(getByText("mockLinks")).toBeInTheDocument();
  });
});
