import React from "react";
import { mount } from "enzyme";
import moment from "moment";
import HvProvider from "../../../Provider";
import Header from "..";

describe("<Header />", () => {
  let wrapper;
  const topText = "Mock text for the top text";
  const inputDate = new Date(Date.UTC(2020, 0, 1, 0));
  const locale = "en-US";
  moment.locale(locale);

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <Header
          id="default"
          topText={topText}
          inputDate={inputDate}
          onSelection={() => {}}
          locale={locale}
        />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(Header)).toMatchSnapshot();
  });
});
