/* eslint-env jest */

import React from "react";
import { mount, shallow } from "enzyme";

import { HvProvider, HvTextArea } from "../..";
import { Main } from "../stories/TextArea.stories";

describe("TextArea", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider cssBaseline={false}>
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
      <HvProvider cssBaseline={false}>
        <HvTextArea rows={4} />
      </HvProvider>
    );
  });

  it("should render correctly if opened", () => {
    expect(wrapper.find(HvTextArea)).toMatchSnapshot();
  });

  it("should render the count label correctly", () => {
    const wrapperMount = mount(
      <HvProvider cssBaseline={false}>
        <HvTextArea rows={4} defaultValue="test" middleCountLabel="of" maxCharQuantity={10} />
      </HvProvider>
    );
    const labelCount = wrapperMount.find("HvTextArea").find("label").at(0).text();
    expect(labelCount).toBe("4");
  });

  it("should render the count label correctly and show the warning", () => {
    const wrapperMount = mount(
      <HvProvider cssBaseline={false}>
        <HvTextArea rows={4} defaultValue="tests" middleCountLabel="of" maxCharQuantity={3} />
      </HvProvider>
    );

    const labelCount = wrapperMount.find("HvTextArea").find("label").at(0).text();
    expect(labelCount).toBe("5");
  });

  it("should use the ref passed by the caller", () => {
    const ref = React.createRef(null);
    expect(ref.current).toBe(null);

    mount(
      <HvProvider cssBaseline={false}>
        <HvTextArea inputRef={ref} />
      </HvProvider>
    );

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});
