/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../Provider";
import DropZoneWithStyles from "..";

let wrapper;

const DEFAULT_LABELS = {
  progressConjunction: "of",
  dropzoneLabel: "My Label",
  sizeWarningLabel: "Max. file size:",
  dragText: "Drag and drop or ",
  selectFilesText: "Select files",
  dropFilesText: "Drop files here",
  fileSizeError: "The file exceeds the maximum upload size",
  fileTypeError: "File type not allowed for upload",
  removeFileButtonLabel: "Remove File"
};

const fileList = [
  {
    name: "Screenshot 2019-12-05 at 17.15.43.png",
    size: 141,
    type: "image/png"
  },
  {
    name: "Screenshot 2019-12-05 at 12.03.13.png",
    size: 875,
    type: "image/png"
  }
];

const onClickCallback = jest.fn();

const setupComponent = (props = {}) =>
  mount(
    <HvProvider>
      <DropZoneWithStyles {...props} />
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

describe("Dropzone withStyles", () => {
  beforeEach(() => {
    wrapper = setupComponent(compProps);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correctly when disabled", () => {
    wrapper = setupComponent({
      ...compProps,
      disabled: true,
      multiple: false
    });
    expect(wrapper).toMatchSnapshot();
  });
});
/*
describe("Dropzone file handling", () => {
  const testHelper = (filesToAccept, targetFiles) => {
    let evalValue;

    const handleSampleFile = files => {
      evalValue = files;
    };

    const customCompProps = {
      onFilesAdded: handleSampleFile,
      onFileRemoved: onClickCallback,
      labels: DEFAULT_LABELS,
      acceptedFiles: filesToAccept,
      maxFileSize: 1,
      fileUnit: fileSizeUnit,
      onDragEnter: onClickCallback,
      onDragLeave: onClickCallback,
      onDropCapture: onClickCallback
    };

    wrapper = setupComponent(customCompProps);

    wrapper
      .find("input")
      .props()
      .onChange(targetFiles);

    return evalValue;
  };

  it("should handle incorrect file size", () => {
    const targetFiles = {
      target: {
        files: [
          {
            name: "somebigfile.png",
            size: 141000,
            type: "image/png"
          }
        ]
      }
    };

    const testResults = testHelper(["png"], targetFiles);

    expect(testResults[0].errorMessage).toEqual(
      "The file exceeds the maximum upload size"
    );
    expect(testResults[0].status).toEqual("fail");
  });

  it("should handle incorrect file type", () => {
    const targetFiles = {
      target: {
        files: [
          {
            name: "somebigfile.jpeg",
            size: 141000,
            type: "image/jpeg"
          }
        ]
      }
    };

    const testResults = testHelper(["png"], targetFiles);

    expect(testResults[0].errorMessage).toEqual(
      "File type not allowed for upload"
    );
    expect(testResults[0].status).toEqual("fail");
  });
});
*/