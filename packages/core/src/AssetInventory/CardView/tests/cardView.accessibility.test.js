/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import Menu from "@hv/uikit-react-icons/dist/Menu";

import { toHaveNoViolations } from "jest-axe";
import axe from "../../../../config/axe-config";

import HvProvider from "../../../Provider";

import CardView from "..";
// import Card from "../../../Card";

expect.extend(toHaveNoViolations);

describe("CardViewA11Y", () => {
  const data = [
    {
      headerTitle: "Asset Avatar 1",
      subheader: "Compressor",
      id: "id_1",
      semantic: "sema2",
      isSelectable: true
    },
    {
      headerTitle: "Asset Avatar 2",
      subheader: "Compressor",
      id: "id_2",
      semantic: "sema2",
      isSelectable: true
    }
  ];

  it("normal state", async () => {
    const wrapper = mount(
      <HvProvider>
        <CardView icon={<Menu />} values={data} />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });
});
