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

import { axe, toHaveNoViolations } from "jest-axe";

import HvProvider from "../../../Provider";
import DropZoneWithStyles from "..";

expect.extend(toHaveNoViolations);

let wrapper;

const DEFAULT_LABELS = {
  progressConjunction: "of",
  dropzoneLabel: "My Label",
  sizeWarningLabel: "Max. file size:",
  dragText: "Drag and drop or ",
  selectFilesText: "Select files",
  dropFilesText: "Drop files here",
  fileSizeError: "The file exceeds the maximum upload size",
  fileTypeError: "File type not allowed for upload"
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
  fileUnit: "mb",
  onDragEnter: onClickCallback,
  onDragLeave: onClickCallback,
  onDropCapture: onClickCallback
};

describe("DropzoneA11Y", () => {
  it("default state", async () => {
    wrapper = setupComponent(compProps);
    const results = await axe(wrapper.getDOMNode());

    expect(results).toHaveNoViolations();
  });

  it("with disabled and single", async () => {
    wrapper = setupComponent({
      ...compProps,
      disabled: true,
      multiple: false
    });
    const results = await axe(wrapper.getDOMNode());

    expect(results).toHaveNoViolations();
  })
});
