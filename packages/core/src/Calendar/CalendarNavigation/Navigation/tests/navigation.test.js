import React from "react";
import { mount } from "enzyme";
import { DropLeftXS, DropRightXS } from "@hitachivantara/uikit-react-icons";
import HvProvider from "../../../../Provider";

import Navigation from "..";

describe("<Navigation />", () => {
  let wrapper;
  let navigationComponent;

  const onNavigatePreviousMock = jest.fn();
  const onNavigateNextMock = jest.fn();
  const onTextClickMock = jest.fn();

  const navigationTextMock = "Navigation text";

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider disableCssBaseline>
        <Navigation
          id="id1"
          onNavigatePrevious={onNavigatePreviousMock}
          onNavigateNext={onNavigateNextMock}
          onTextClick={onTextClickMock}
          navigationText={navigationTextMock}
        />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(Navigation)).toMatchSnapshot();
  });

  it("onNavigatePrevious is triggered", () => {
    navigationComponent = wrapper.find(Navigation);

    navigationComponent
      .find(DropLeftXS)
      .at(0)
      .simulate("click", {
        preventDefault() {},
      });

    expect(onNavigatePreviousMock).toBeCalled();
  });

  it("onNavigateNext is triggered", () => {
    navigationComponent = wrapper.find(Navigation);

    navigationComponent
      .find(DropRightXS)
      .at(0)
      .simulate("click", {
        preventDefault() {},
      });

    expect(onNavigateNextMock).toBeCalled();
  });

  it("onTextClick is triggered", () => {
    navigationComponent = wrapper.find(Navigation);

    navigationComponent
      .find("div")
      .at(2)
      .simulate("click", {
        preventDefault() {},
      });

    expect(onTextClickMock).toBeCalled();
  });
});
