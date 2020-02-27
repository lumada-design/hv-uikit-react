/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import FileListWithStyles from "..";
import FileList from "../FileList";
import HvProvider from "../../../Provider";

let wrapper;

const files = [
  {
    id: "1",
    errorMessage: "File type not allowed for upload",
    status: "fail",
    lastModified: 1575566155192,
    name: "Screenshot 2019-12-05 at 17.15.43.png",
    size: 14106,
    type: "image/png",
    webkitRelativePath: ""
  },
  {
    id: "2",
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
        <FileListWithStyles
          list={files}
          progressConjunctionLabel="progressConjunctionLabel"
          removeFileButtonLabel="removeFileButtonLabel"
        />
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
