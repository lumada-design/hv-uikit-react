/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

/* eslint-env jest */

// import { mount } from "enzyme";
import React from "react";
import { mount, shallow } from "enzyme";

import HvProvider from "../../Provider";
import CardWithStyles from "../index";
import Card from "../Main";

const configuration = {
  title: "title",
  subtitle: "subtitle",
  content: "content",
  actions: "actions",
  icon: "icon"
};

describe("Card withStyles", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = shallow(
      <HvProvider>
        <CardWithStyles
          Icon={configuration.icon}
          HeaderTitle={configuration.title}
          Subheader={configuration.subtitle}
          InnerCardContent={configuration.content}
          Actions={configuration.actions}
          cardColor="error"
          isSelectable
          checkboxValue="value"
        />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Card component", () => {
    const CardComponent = wrapper.find(Card);
    expect(CardComponent.length).toBe(1);
  });

  it("should be able to render with every property defined", () => {
    wrapper = mount(
      <HvProvider>
        <CardWithStyles
          Icon={configuration.icon}
          HeaderTitle={configuration.title}
          Subheader={configuration.subtitle}
          InnerCardContent={configuration.content}
          Actions={configuration.actions}
          mediaPath="path"
          cardColor="error"
          isSelectable
          checkboxValue="value"
        />
      </HvProvider>
    );
    const CardComponent = wrapper.find(Card);
    expect(CardComponent.length).toBe(1);
  });
});
