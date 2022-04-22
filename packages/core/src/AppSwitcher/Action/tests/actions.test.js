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

import React from "react";
import { Tool } from "@hitachivantara/uikit-react-icons";

import { render } from "testing-utils";

import ActionWrapper from "../index";

describe("<Action /> with description", () => {
  const mockApplications = {
    id: "app-1",
    name: "Mock App 1",
    iconUrl: "http://mockapp1/icon",
    description: "Mock App 1 Description",
    url: "http://mockapp1/",
    target: "_top",
  };

  it("should render correctly", () => {
    const { container } = render(<ActionWrapper key="mockKey" application={mockApplications} />);
    expect(container).toMatchSnapshot();
  });

  it("should render a link element", () => {
    const { getByRole } = render(<ActionWrapper key="mockKey" application={mockApplications} />);
    const link = getByRole("link");
    expect(link).toBeInTheDocument();
  });

  it("should render an img element", () => {
    const { getAllByRole } = render(<ActionWrapper key="mockKey" application={mockApplications} />);
    const images = getAllByRole("img");
    expect(images[0]).toBeInTheDocument();
    expect(images[0].src).toBe(mockApplications.iconUrl);
  });

  it("should render a Info icon component", () => {
    const { getByLabelText } = render(
      <ActionWrapper key="mockKey" application={mockApplications} />
    );
    const icon = getByLabelText(mockApplications.description);
    expect(icon).toBeInTheDocument();
  });
});

describe("<Action /> without description", () => {
  const mockApplications = {
    id: "app-1",
    name: "Mock App 1",
    iconUrl: "http://mockapp1/icon",
    url: "http://mockapp1/",
    target: "_top",
  };

  it("should render correctly", () => {
    const { container } = render(<ActionWrapper key="mockKey" application={mockApplications} />);
    expect(container).toMatchSnapshot();
  });

  it("should render a link element", () => {
    const { getByRole } = render(<ActionWrapper key="mockKey" application={mockApplications} />);
    const link = getByRole("link");
    expect(link).toBeInTheDocument();
  });

  it("should render an img element and not the Info icon component", () => {
    const { getAllByRole } = render(<ActionWrapper key="mockKey" application={mockApplications} />);
    const images = getAllByRole("img");
    expect(images.length).toBe(1);
    expect(images[0]).toBeInTheDocument();
    expect(images[0].src).toBe(mockApplications.iconUrl);
  });
});

describe("<Action /> with an element icon", () => {
  const mockApplications = {
    id: "app-1",
    name: "Mock App 1",
    iconElement: <Tool data-testid="tool-icon" />,
    url: "http://mockapp1/",
    target: "_top",
  };

  it("should render correctly", () => {
    const { container } = render(<ActionWrapper key="mockKey" application={mockApplications} />);
    expect(container).toMatchSnapshot();
  });

  it("should render a link element", () => {
    const { getByRole } = render(<ActionWrapper key="mockKey" application={mockApplications} />);
    const link = getByRole("link");
    expect(link).toBeInTheDocument();
  });

  it("should not render an img element but render an icon", () => {
    const { queryByRole } = render(<ActionWrapper key="mockKey" application={mockApplications} />);
    const images = queryByRole("img");
    expect(images).not.toBeInTheDocument();
  });

  it("should render a Tool icon component", () => {
    const { getByTestId } = render(<ActionWrapper key="mockKey" application={mockApplications} />);
    const icon = getByTestId("tool-icon");
    expect(icon).toBeInTheDocument();
  });
});
