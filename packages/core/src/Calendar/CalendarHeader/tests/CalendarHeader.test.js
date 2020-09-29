import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../../Provider";
import CalendarHeader from "..";

describe("v3 <CalendarHeader />", () => {
  let wrapper;
  const inputDate = new Date(2020, 0, 1, 0);
  const locale = "en-US";

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <CalendarHeader id="default" value={inputDate} locale={locale} />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(CalendarHeader)).toMatchSnapshot();
  });
});
