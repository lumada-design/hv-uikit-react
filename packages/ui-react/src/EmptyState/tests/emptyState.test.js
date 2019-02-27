/**
 * Copyright (c) 2019 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

/* eslint-env jest */

import React from "react";
import { shallow } from "enzyme";
import EmptyState from "../EmptyState";

const mockClasses = {};
const mockTitle = "mockTitle";
const mockMessage = "mockMessage";
const mockIcon = <div>{"mockIcon"}</div>;

describe("<EmptyState />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <EmptyState
        classes={mockClasses}
        title={mockTitle}
        message={mockMessage}
        icon={mockIcon}
      />
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
