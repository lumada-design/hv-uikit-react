/* eslint-env jest */

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { HvProvider } from "../../..";
import File from "..";

const dataFail = {
  name: "somefile.png",
  size: 875,
  errorMessage: "File type not allowed for upload",
  progress: 25,
  status: "fail",
  fileStatus: "fail",
};

const dataSuccess = {
  name: "somefile.png",
  size: 875,
  errorMessage: "File type not allowed for upload",
  progress: 25,
  status: "success",
  fileStatus: "success",
};

const setup = ({ ...fileProps }) =>
  render(
    <HvProvider cssBaseline="none">
      <File
        onFilesAdded={() => {}}
        onFileRemoved={() => {}}
        removeFileButtonLabel="removeFileButtonLabel"
        {...fileProps}
      />
    </HvProvider>
  );

describe("File invalid", () => {
  it("renders correctly", () => {
    setup({ data: dataFail });

    const file = screen.getByRole("listitem");
    expect(file).toBeVisible();
    expect(file).toMatchSnapshot();
  });
});

describe("File valid", () => {
  it("renders correctly", () => {
    setup({ data: dataSuccess, unit: "mb" });

    const file = screen.getByRole("listitem");
    expect(file).toBeVisible();
    expect(file).toMatchSnapshot();
  });

  it("calls the delete file callback", () => {
    const onClickCallback = jest.fn();
    setup({ data: dataSuccess, unit: "mb", onFileRemoved: onClickCallback });

    const fileButton = screen.getByRole("button");

    fireEvent.click(fileButton);
    expect(onClickCallback).toHaveBeenCalled();
  });
});
