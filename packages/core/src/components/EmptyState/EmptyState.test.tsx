import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  const MockIcon = <div>mockIcon</div>;
  const MockTitle = <div>mockTitle</div>;
  const MockMessage = <div>mockMessage</div>;
  const MockAction = <div>mockAction</div>;

  it("should render correctly", () => {
    const { container } = render(
      <EmptyState
        title={MockTitle}
        message={MockMessage}
        action={MockAction}
        icon={MockIcon}
      />
    );
    expect(container).toBeDefined();
  });

  it("should contain all the elements", () => {
    const { getByText } = render(
      <EmptyState
        title={MockTitle}
        message={MockMessage}
        action={MockAction}
        icon={MockIcon}
      />
    );
    expect(getByText("mockTitle")).toBeInTheDocument();
    expect(getByText("mockMessage")).toBeInTheDocument();
    expect(getByText("mockAction")).toBeInTheDocument();
    expect(getByText("mockIcon")).toBeInTheDocument();
  });

  it("should contain all the elements as strings except for the icon", () => {
    const { getByText } = render(
      <EmptyState
        title="mockTitle"
        message="mockMessage"
        action="mockAction"
        icon={MockIcon}
      />
    );
    expect(getByText("mockTitle")).toBeInTheDocument();
    expect(getByText("mockMessage")).toBeInTheDocument();
    expect(getByText("mockAction")).toBeInTheDocument();
  });

  it("should not render title or action if none is passed (minimal empty state)", () => {
    const { getByText, queryByText } = render(
      <EmptyState message={MockMessage} icon={MockIcon} />
    );
    expect(getByText("mockMessage")).toBeInTheDocument();
    expect(getByText("mockIcon")).toBeInTheDocument();
    expect(queryByText("mockAction")).not.toBeInTheDocument();
    expect(queryByText("mockTitle")).not.toBeInTheDocument();
  });
});
