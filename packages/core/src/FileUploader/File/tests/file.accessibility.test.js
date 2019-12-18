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
import FileWithStyles from "..";

expect.extend(toHaveNoViolations);

let wrapper;

const dataSuccess = {
  name: "somefile.png",
  size: 875,
  errorMessage: "File type not allowed for upload",
  progress: 25,
  status: "success",
  fileStatus: "success"
};

const DEFAULT_LABELS = {
  progressConjunction: "of",
  dropzoneLabel: "My Label",
  sizeWarningLabel: "Max. file size:",
  dragText: "Drag and drop or ",
  selectFilesText: "Select files",
  dropFilesText: "Drop files here",
  fileSizeError: "The file exceeds the maximum upload size",
  fileTypeError: "File type not allowed for upload",
  removeFileButtonLabel:"Remove File"
};

describe("FileA11Y", () => {
  it("default state", async () => {
    wrapper = mount(
      <HvProvider>
        <FileWithStyles
          data={dataSuccess}
          onFilesAdded={() => {}}
          onFileRemoved={() => {}}
          labels={DEFAULT_LABELS}
          unit="mb"
        />
      </HvProvider>
    );

    const results = await axe(wrapper.getDOMNode()[1]);

    expect(results).toHaveNoViolations();
  });
});
