/* eslint-env jest */

import React from "react";
import { mount, shallow } from "enzyme";

import { HvProvider, HvTextArea } from "../..";
import { Main } from "../stories/TextArea.stories";

describe("v3 TextArea", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <Main />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvTextArea)).toMatchSnapshot();
  });
});

describe("TextArea Component", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <HvTextArea rows={4} />
      </HvProvider>
    );
  });

  it("should render correctly if opened", () => {
    expect(wrapper.find(HvTextArea)).toMatchSnapshot();
  });

  it("should render the count label correctly", () => {
    const wrapperMount = mount(
      <HvProvider>
        <HvTextArea
          rows={4}
          initialValue="test"
          labels={{
            startCount: "Inserted",
            middleCount: "of",
            endCount: "available"
          }}
          maxCharQuantity={10}
        />
      </HvProvider>
    );
    const labelCount = wrapperMount
      .find("HvTextArea")
      .find("label")
      .at(0)
      .text();
    expect(labelCount).toBe("4");
  });

  it("should render the count label correctly and show the warning", () => {
    const wrapperMount = mount(
      <HvProvider>
        <HvTextArea
          rows={4}
          initialValue="tests"
          labels={{
            startCount: "Inserted",
            middleCount: "of",
            endCount: "available",
            maxCharQuantityWarningText: "too many characters"
          }}
          maxCharQuantity={3}
        />
      </HvProvider>
    );
    const labelCount = wrapperMount
      .find("HvTextArea")
      .find("label")
      .at(0)
      .text();
    const labelWarningText = wrapperMount
      .find("HvTextArea")
      .find("span")
      .at(0)
      .text();
    expect(labelCount).toBe("5");
    expect(labelWarningText).toBe("too many characters");
  });
});
