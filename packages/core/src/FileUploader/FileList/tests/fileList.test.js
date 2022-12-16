/* eslint-env jest */

import React from "react";
import { render, screen } from "@testing-library/react";

import { HvProvider } from "../../..";
import FileList from "..";

const files = [
  {
    id: "1",
    errorMessage: "File type not allowed for upload",
    status: "fail",
    lastModified: 1575566155192,
    name: "Screenshot 2019-12-05 at 17.15.43.png",
    size: 14106,
    type: "image/png",
    webkitRelativePath: "",
  },
  {
    id: "2",
    errorMessage: "File type not allowed for upload",
    status: "fail",
    lastModified: 1575547399043,
    name: "Screenshot 2019-12-05 at 12.03.13.png",
    size: 875,
    type: "image/png",
    webkitRelativePath: "",
  },
];

const setup = (list) =>
  render(
    <HvProvider cssBaseline="none">
      <FileList
        id="list"
        list={list}
        removeFileButtonLabel="removeFileButtonLabel"
        onFileRemoved={() => {}}
      />
    </HvProvider>
  );

describe("FileList", () => {
  it("renders correctly", () => {
    setup(files);
    expect(screen.getByRole("list")).toMatchSnapshot();
  });

  it("renders the list with items", () => {
    setup(files);
    expect(screen.getByRole("list")).toBeVisible();
    expect(screen.queryAllByRole("listitem").length).toBe(2);
  });
});
