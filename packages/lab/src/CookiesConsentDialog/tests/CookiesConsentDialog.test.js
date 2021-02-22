/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { Main } from "../stories/CookiesConsentDialog.stories";
import { HvProvider, HvCookiesConsentDialog } from "../..";

describe("CookiesConsentDialog", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvCookiesConsentDialog)).toMatchSnapshot();
  });

  it("should render the CookiesConsentDialog", () => {
    const component = wrapper.find(HvCookiesConsentDialog);
    expect(component.length).toBe(1);
  });
});
