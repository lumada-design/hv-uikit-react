/* eslint-env jest */

import React from "react";
import userEvent from "@testing-library/user-event";
import { render, fireEvent } from "testing-utils";
import { HvProvider, HvTagsInput } from "../..";
import { Main } from "../stories/TagsInput.stories";

describe("TagsInput", () => {
  it("should render correctly", () => {
    const { container } = render(<Main />);
    expect(container).toBeDefined();
  });
});

describe("TagsInput Component", () => {
  const mockClasses = {
    tagInputContainerRoot: "tagInputContainerRoot",
  };

  Element.prototype.scrollTo = () => {};

  it("should render the label correctly", () => {
    const { getByText } = render(
      <HvProvider>
        <HvTagsInput id="tags-list" label="Custom label" classes={mockClasses} />
      </HvProvider>
    );
    expect(getByText("Custom label")).toBeInTheDocument();
  });

  it("should render the text area with tags when controlled and input value is an array of strings", () => {
    const { getByText, getAllByRole } = render(
      <HvProvider>
        <HvTagsInput
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
        <HvTagsInput
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

  it("should trigger the delete callback on click", async () => {
    const onChangeSpy = jest.fn();
    const onDeleteSpy = jest.fn();
    const { getByText, getAllByRole, findAllByRole } = render(
      <HvProvider>
        <HvTagsInput
          id="tags-list"
          label="Custom label"
          classes={mockClasses}
          value={[{ label: "tag1" }, { label: "tag2" }]}
          onChange={onChangeSpy}
          onDelete={onDeleteSpy}
        />
      </HvProvider>
    );

    expect(getByText("tag1")).toBeInTheDocument();
    expect(getByText("tag2")).toBeInTheDocument();

    const clickableButtons = getAllByRole("button");
    expect(clickableButtons.length).toBe(2);
    userEvent.click(clickableButtons[1]);
    let remainingButton = await findAllByRole("button");
    expect(onChangeSpy).toHaveBeenCalledWith(expect.any(Object), [{ label: "tag1" }]);
    expect(onDeleteSpy).toHaveBeenCalledWith(expect.any(Object), { label: "tag2" }, 1);
    // the value is controlled so it should not change only inform
    expect(remainingButton.length).toBe(2);

    userEvent.click(clickableButtons[0]);
    remainingButton = await findAllByRole("button");
    expect(onChangeSpy).toHaveBeenCalledWith(expect.any(Object), [{ label: "tag2" }]);
    expect(onDeleteSpy).toHaveBeenCalledWith(expect.any(Object), { label: "tag1" }, 0);
    // the value is controlled so it should not change only inform
    expect(remainingButton.length).toBe(2);
  });

  it("should trigger the add callback", async () => {
    const onChangeSpy = jest.fn();
    const onAddSpy = jest.fn();
    const { getByText, getAllByRole, findAllByRole, getByRole } = render(
      <HvProvider>
        <HvTagsInput
          id="tags-list"
          label="Custom label"
          classes={mockClasses}
          value={[{ label: "tag1" }, { label: "tag2" }]}
          onChange={onChangeSpy}
          onAdd={onAddSpy}
        />
      </HvProvider>
    );

    expect(getByText("tag1")).toBeInTheDocument();
    expect(getByText("tag2")).toBeInTheDocument();

    const clickableButtons = getAllByRole("button");
    const tagsInput = getByRole("textbox");
    fireEvent.change(tagsInput, { target: { value: "tag3" } });
    expect(tagsInput).toHaveValue("tag3");
    expect(clickableButtons.length).toBe(2);
    fireEvent.keyDown(tagsInput, { key: "Enter", keyCode: 13 });
    const remainingButton = await findAllByRole("button");
    expect(onChangeSpy).toHaveBeenCalledWith(expect.any(Object), [
      { label: "tag1" },
      { label: "tag2" },
      { label: "tag3", type: "semantic" },
    ]);
    expect(onAddSpy).toHaveBeenCalledWith(
      expect.any(Object),
      { label: "tag3", type: "semantic" },
      2
    );
    // the value is controlled so it should not change only inform
    expect(remainingButton.length).toBe(2);
  });

  it("should have a disabled tag if the `disabled` property is set to true", () => {
    const { queryAllByRole } = render(
      <HvProvider>
        <HvTagsInput
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
        <HvTagsInput
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
