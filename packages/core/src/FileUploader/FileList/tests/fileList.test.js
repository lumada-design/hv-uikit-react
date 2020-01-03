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

import FileListWithStyles from "..";
import FileList from "../FileList";
import HvProvider from "../../../Provider";

let wrapper;

const files = [
  {
    errorMessage: "File type not allowed for upload",
    status: "fail",
    lastModified: 1575566155192,
    name: "Screenshot 2019-12-05 at 17.15.43.png",
    size: 14106,
    type: "image/png",
    webkitRelativePath: ""
  },
  {
    errorMessage: "File type not allowed for upload",
    status: "fail",
    lastModified: 1575547399043,
    name: "Screenshot 2019-12-05 at 12.03.13.png",
    size: 875,
    type: "image/png",
    webkitRelativePath: ""
  }
];

describe("FileList withStyles", () => {
  it("should be defined", () => {
    wrapper = mount(
      <HvProvider>
        <FileListWithStyles list={files} />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the FileList", () => {
    const fileList = wrapper.find(FileList);
    expect(fileList.length).toBe(1);
  });
});
