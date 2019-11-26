/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import Pagination from "../Pagination";
import PaginationWithStyles from "../index";
import HvProvider from "../../Provider";
import HvInput from "../../Input/Input";

describe("Default Pagination", () => {
  const wrapper = mount(
    <HvProvider>
      <PaginationWithStyles pages={1} />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Pagination component", () => {
    const paginationComponent = wrapper.find(Pagination);
    expect(paginationComponent.length).toBe(1);
  });

  it("should render the pagination jump", () => {
    const input = wrapper.find(HvInput);
    expect(input.length).toBe(1);
  });

  it("should render the pageSize select", () => {
    const input = wrapper.find("select");
    expect(input.length).toBe(1);
  });
});

describe("Pagination without pageJump Input", () => {
  const wrapper = mount(
    <HvProvider>
      <PaginationWithStyles showPageJump={false} />
    </HvProvider>
  );

  it("should NOT render the input", () => {
    const input = wrapper.find(HvInput);
    expect(input.length).toBe(0);
  });
});

describe("Pagination without pageSize select", () => {
  const wrapper = mount(
    <HvProvider>
      <PaginationWithStyles showPageSizeOptions={false} />
    </HvProvider>
  );

  it("should NOT render the select", () => {
    const input = wrapper.find("select");
    expect(input.length).toBe(0);
  });
});

describe("Custom Pagination", () => {
  const wrapper = mount(
    <HvProvider>
      <PaginationWithStyles
        pages={4}
        page={2}
        showPageSizeOptions
        pageSizeOptions={[5, 10]}
        pageSize={5}
        showPageJump={false}
        canPrevious
        canNext
      />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
