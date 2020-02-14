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

import HvProvider from "../../Provider";
import DropZoneWithStyles from "..";

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

describe("DropzoneA11Y", () => {
  it("default state", async () => {
    wrapper = setupComponent(compProps);

    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
