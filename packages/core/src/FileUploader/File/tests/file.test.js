/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import File from "..";
import HvProvider from "../../../Provider";

let wrapper;

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

const onClickCallback = jest.fn();

describe("[v3] File withStyles - Invalid File", () => {
  wrapper = mount(
    <HvProvider>
      <File
        data={dataFail}
        onFilesAdded={() => {}}
        onFileRemoved={() => {}}
        removeFileButtonLabel="removeFileButtonLabel"
      />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(File)).toMatchSnapshot();
  });

  it("should render the File", () => {
    const file = wrapper.find("File");
    expect(file.length).toBe(1);
  });
});

describe("[v3] File withStyles - Valid File", () => {
  wrapper = mount(
    <HvProvider>
      <File
        data={dataSuccess}
        unit="mb"
        onFilesAdded={() => {}}
        onFileRemoved={onClickCallback}
        removeFileButtonLabel="removeFileButtonLabel"
      />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(File)).toMatchSnapshot();
  });

  it("should render the File", () => {
    const file = wrapper.find("File");
    expect(file.length).toBe(1);
  });

  it("should call the delete file callback", () => {
    const fileButton = wrapper.find("button");

    fileButton.simulate("click");
    expect(onClickCallback).toHaveBeenCalled();
  });
});
