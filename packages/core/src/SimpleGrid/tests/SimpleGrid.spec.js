import React from "react";
import { mount } from "enzyme";
import SimpleGrid from "..";

describe("Simple Grid", () => {
  let wrapper;

  it("should be able to render with every property defined", () => {
    wrapper = mount(
      <SimpleGrid>
        <div>
          1
        </div>
      </SimpleGrid>
    );

    expect(wrapper).toMatchSnapshot();
  });
});