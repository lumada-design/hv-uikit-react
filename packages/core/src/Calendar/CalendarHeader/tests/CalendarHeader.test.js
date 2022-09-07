import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../../Provider";
import { makeUTCDate } from "../../utils";
import CalendarHeader from "..";

describe("<CalendarHeader />", () => {
  let wrapper;
  // use UTC 12:00 date to minimize issues for snapshots created in different timezones
  const inputDate = makeUTCDate(2020, 0, 1, 12);
  const locale = "en-US";

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider cssBaseline={false}>
        <CalendarHeader id="default" value={inputDate} locale={locale} />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(CalendarHeader)).toMatchSnapshot();
  });
});
