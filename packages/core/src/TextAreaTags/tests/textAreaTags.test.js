/* eslint-env jest */

import React from "react";
import { render } from "testing-utils";
import { HvProvider, HvTextAreaTags } from "../..";
import { Main } from "../stories/TextAreaTags.stories";

describe("TextAreaTags", () => {
  it("should render correctly", () => {
    const { container } = render(<Main />);
    expect(container).toBeDefined();
  });
});

describe("TextArea Component", () => {
  const mockClasses = {
    tagInputContainerRoot: "tagInputContainerRoot",
  };

  it("should render the label correctly", () => {
    const { getByText } = render(
      <HvProvider>
        <HvTextAreaTags id="tags-list" label="Custom label" classes={mockClasses} />
      </HvProvider>
    );
    expect(getByText("Custom label")).toBeInTheDocument();
  });

  it("should render the text area with tags when controlled and input value is an array of strings", () => {
    const { getByText, getAllByRole } = render(
      <HvProvider>
        <HvTextAreaTags
          id="tags-list"
          label="Custom label"
          classes={mockClasses}
          value={["tag1", "tag2"]}
        />
      </HvProvider>
    );

    expect(getByText("tag1")).toBeInTheDocument();
    expect(getByText("tag2")).toBeInTheDocument();

    const clickableButtons = getAllByRole("button");
    expect(clickableButtons.length).toBe(2);
  });

  it("should render the text area with tags when controlled and input value is an array of tags", () => {
    const { getByText, getAllByRole } = render(
      <HvProvider>
        <HvTextAreaTags
          id="tags-list"
          label="Custom label"
          classes={mockClasses}
          value={[{ label: "tag1" }, { label: "tag2", type: "categorical", color: "#ff0000" }]}
        />
      </HvProvider>
    );

    expect(getByText("tag1")).toBeInTheDocument();
    expect(getByText("tag2")).toBeInTheDocument();

    const clickableButtons = getAllByRole("button");
    // categorical tags don't have close buttons - not trying to test the Tag's internal behavior here,
    // just that this component will render the tags correctly.
    expect(clickableButtons.length).toBe(1);
  });

  it("should have a disabled tag if the `disabled` property is set to true", () => {
    const { queryAllByRole } = render(
      <HvProvider>
        <HvTextAreaTags
          id="tags-list"
          label="Custom label"
          classes={mockClasses}
          disabled
          value={[{ label: "tag1" }, { label: "tag2", type: "categorical" }]}
        />
      </HvProvider>
    );

    const clickableButtons = queryAllByRole("button");
    expect(clickableButtons.length).toBe(0);
  });

  it("should not display close buttons on readOnly tags", () => {
    const { queryAllByRole } = render(
      <HvProvider>
        <HvTextAreaTags
          id="tags-list"
          label="Custom label"
          classes={mockClasses}
          readOnly
          value={[{ label: "tag1" }, { label: "tag2", type: "categorical" }]}
        />
      </HvProvider>
    );

    const clickableButtons = queryAllByRole("button");
    expect(clickableButtons.length).toBe(0);
  });
});
