/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { axe, toHaveNoViolations } from "jest-axe";
import HvProvider from "../../Provider";
import Modal from "..";

expect.extend(toHaveNoViolations);

describe("ModalA11Y", () => {
  let wrapper;
  const onCloseMock = jest.fn();
  const open = true;

  it("default state", async () => {
    wrapper = mount(
      <HvProvider>
        <Modal open={open} onClose={onCloseMock}>
          Modal Content
        </Modal>
      </HvProvider>
    );

    // const disable for role="none presentation"
    const results = await axe(wrapper.html(), {
      rules: { "aria-roles": { enabled: false } }
    });
    expect(results).toHaveNoViolations();
  });
});
