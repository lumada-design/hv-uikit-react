/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../Provider";
import DropZone from "..";

let wrapper;

const DEFAULT_LABELS = {
  dropzone: "Label",
  progressConjunction: "of",
  sizeWarning: "Max. file size:",
  acceptedFiles: "Accepted files:",
  drag: "Drag and drop or",
  selectFiles: "Select files",
  dropFiles: "Drop files here",
  fileSizeError: "The file exceeds the maximum upload size",
  fileTypeError: "File type not allowed for upload",
  removeFileButtonLabel: "Remove File",
};

const fileList = [
  {
    name: "Screenshot 2019-12-05 at 17.15.43.png",
    size: 141,
    type: "image/png",
  },
  {
    name: "Screenshot 2019-12-05 at 12.03.13.png",
    size: 875,
    type: "image/png",
  },
];

const onClickCallback = jest.fn();

const setupComponent = (props = {}) =>
  mount(
    <HvProvider disableCssBaseline>
      <DropZone id="dropzone1" {...props} />
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
  onDropCapture: onClickCallback,
};

describe("Dropzone withStyles", () => {
  beforeEach(() => {
    wrapper = setupComponent(compProps);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(DropZone)).toMatchSnapshot();
  });

  it("should render correctly when disabled", () => {
    wrapper = setupComponent({
      ...compProps,
      disabled: true,
      multiple: false,
    });
    expect(wrapper.find(DropZone)).toMatchSnapshot();
  });
});
