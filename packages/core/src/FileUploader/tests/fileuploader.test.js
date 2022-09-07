/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import FileUploader from "..";
import DropZone from "../DropZone";
import HvProvider from "../../Provider";
import File from "../File";
import FileList from "../FileList";

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

const onClickCallback = jest.fn();

const setupComponent = (props = {}) =>
  mount(
    <HvProvider cssBaseline={false}>
      <FileUploader {...props} />
    </HvProvider>
  );

describe("FileUploader withStyles", () => {
  let wrapper;

  const compProps = {
    fileList,
    onFilesAdded: onClickCallback,
    onFileRemoved: onClickCallback,
    acceptedFiles: ["jpeg"],
    maxFileSize: 12,
  };

  beforeEach(() => {
    wrapper = setupComponent(compProps);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(FileUploader)).toMatchSnapshot();
  });

  it("should render the FileUploader", () => {
    const fileuploader = wrapper.find(FileUploader);
    expect(fileuploader.length).toBe(1);
  });

  it("should render the FileList", () => {
    const fList = wrapper.find(FileList);
    const files = wrapper.find(File);

    expect(fList.length).toBe(1);
    expect(files.length).toBe(2);
  });

  it("should render the Dropzone", () => {
    const fileuploader = wrapper.find(DropZone);
    expect(fileuploader.length).toBe(1);
  });

  it("should call file upload callback", () => {
    const dropzone = wrapper.find(DropZone);

    dropzone.find("input").simulate("change");
    expect(onClickCallback).toHaveBeenCalled();
  });
});

describe("FileUploader validations", () => {
  let uploadWrapper;

  it("correctly display incorrect file type warning", () => {
    const faultyCompProps = {
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
    };

    uploadWrapper = setupComponent(faultyCompProps);
    expect(uploadWrapper.find("File").find("p").at(1).text()).toEqual(
      "File type not allowed for upload"
    );
  });

  it("correctly display incorrect file size warning", () => {
    const faultyCompProps = {
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
    };

    uploadWrapper = setupComponent(faultyCompProps);
    expect(uploadWrapper.find("File").find("p").at(1).text()).toEqual(
      "The file exceeds the maximum upload size"
    );
  });
});
