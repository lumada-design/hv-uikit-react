/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { toHaveNoViolations } from "jest-axe";
import axe from "../../../config/axe-config";

import HvProvider from "../../Provider";
import FileUploader from "..";

expect.extend(toHaveNoViolations);

let wrapper;

const DEFAULT_LABELS = {
  progressConjunction: "of",
  dropzone: "Label",
  sizeWarning: "Max. file size:",
  acceptedFiles: "Accepted files:",
  drag: "Drag and drop or",
  selectFiles: "Select files",
  dropFiles: "Drop files here",
  fileSizeError: "The file exceeds the maximum upload size",
  fileTypeError: "File type not allowed for upload",
  removeFileButtonLabel: "Remove File"
};

const fileList = [
  {
    id: "screen1",
    name: "Screenshot 2019-12-05 at 17.15.43.png",
    size: 141,
    type: "image/png"
  },
  {
    id: "screen2",
    name: "Screenshot 2019-12-05 at 12.03.13.png",
    size: 875,
    type: "image/png"
  }
];

const onClickCallback = jest.fn();

const setupComponent = (props = {}) =>
    mount(
        <HvProvider>
          <FileUploader id="fup1" {...props} />
        </HvProvider>
    );

const compProps = {
  fileList,
  onFilesAdded: onClickCallback,
  onFileRemoved: onClickCallback,
  labels: DEFAULT_LABELS,
  acceptedFiles: [],
  maxFileSize: 1,
  onDragEnter: onClickCallback,
  onDragLeave: onClickCallback,
  onDropCapture: onClickCallback
};

describe("FileUploaderA11Y", () => {
  it("default state", async () => {
    wrapper = setupComponent(compProps);

    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
