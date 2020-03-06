/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { toHaveNoViolations } from "jest-axe";
import axe from "../../../../config/axe-config";

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
  progressConjunctionLabel: "of",
  removeFileButtonLabel: "Remove File"
};

describe("FileA11Y", () => {
  it("default state", async () => {
    wrapper = mount(
      <HvProvider>
        <FileWithStyles
          data={dataSuccess}
          onFilesAdded={() => {}}
          onFileRemoved={() => {}}
          {...DEFAULT_LABELS}
        />
      </HvProvider>
    );

    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
