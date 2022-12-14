/* eslint-env jest */

import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";

import { HvProvider } from "../..";
import FileUploader from "..";

const fileList = [
  {
    id: "1",
    name: "Screenshot 2019-12-05 at 17.15.43.png",
    size: 14100000,
    type: "image/png",
  },
  {
    id: "2",
    name: "Screenshot 2019-12-05 at 12.03.13.png",
    size: 875000,
    type: "image/png",
  },
];

const setupComponent = (props = {}) =>
  render(
    <HvProvider cssBaseline="none">
      <FileUploader onFilesAdded={() => {}} onFileRemoved={() => {}} {...props} />
    </HvProvider>
  );

describe("FileUploader", () => {
  const compProps = { fileList, acceptedFiles: ["jpeg"], maxFileSize: 12 };

  it("renders correctly", () => {
    const { container } = setupComponent(compProps);
    expect(container).toMatchSnapshot();
  });

  it("renders the file list", () => {
    setupComponent(compProps);
    expect(screen.getByRole("list")).toBeVisible();
    expect(screen.queryAllByRole("listitem").length).toBe(2);
  });

  it("renders the dropzone", () => {
    setupComponent(compProps);
    const dropZone = screen.getByRole("button", { name: /Label/ });
    expect(dropZone).toBeVisible();
  });

  it("calls file upload callback", () => {
    const onClickCallback = jest.fn();
    setupComponent({ ...compProps, onFilesAdded: onClickCallback });
    const dropZone = screen.getByRole("button", { name: /Label/ });

    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.change(dropZone.querySelector("input"), {});

    expect(onClickCallback).toHaveBeenCalled();
  });
});

describe("FileUploader validations", () => {
  it("displays incorrect file type warning", () => {
    const onClickCallback = jest.fn();

    setupComponent({
      fileList: [
        {
          id: "3",
          status: "fail",
          errorMessage: "File type not allowed for upload",
          name: "somefile.jpeg",
          size: 141,
          type: "image/jpeg",
        },
      ],
      onFilesAdded: onClickCallback,
      onFileRemoved: onClickCallback,
      acceptedFiles: ["png"],
      maxFileSize: 1,
    });
    const files = screen.queryAllByRole("listitem");
    expect(within(files[0]).getByText(/File type not allowed for upload/)).toBeVisible();
  });

  it("displays incorrect file size warning", () => {
    const onClickCallback = jest.fn();

    setupComponent({
      fileList: [
        {
          id: "4",
          status: "fail",
          errorMessage: "The file exceeds the maximum upload size",
          name: "somefile.jpeg",
          size: 141,
          type: "image/jpeg",
        },
      ],
      onFilesAdded: onClickCallback,
      onFileRemoved: onClickCallback,
      acceptedFiles: ["png"],
      maxFileSize: 5 * 1000,
    });

    const files = screen.queryAllByRole("listitem");
    expect(within(files[0]).getByText(/The file exceeds the maximum upload size/)).toBeVisible();
  });
});
