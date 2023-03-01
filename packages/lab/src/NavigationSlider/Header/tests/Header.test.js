import React from "react";
import { create } from "react-test-renderer";

import { HvButton, HvTypography, HvProvider } from "@hitachivantara/uikit-react-core";

import Header from "..";

describe("<Header /> with empty values", () => {
  let renderer;

  beforeAll(() => {
    renderer = create(
      <HvProvider>
        <Header />
      </HvProvider>
    );
  });

  it("should match the snapshot", () => {
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it("should be defined", () => {
    expect(renderer).toBeDefined();
  });
});

describe("<Header /> with title and back button", () => {
  let renderer;
  const mockOnBackButtonClick = jest.fn(() => {});

  beforeAll(() => {
    renderer = create(
      <HvProvider>
        <Header title="DummyTitle" showBackButton onBackButtonClick={mockOnBackButtonClick} />
      </HvProvider>
    );
  });

  it("should display the provided title", async () => {
    const typographyElement = await renderer.root.findByType(HvTypography);
    const titleElement = await typographyElement.findByType("p");

    expect(titleElement.children[0]).toBe("DummyTitle");
  });

  it("should render a back button and clicking on it triggers the callback", async () => {
    const backButton = await renderer.root.findByType(HvButton);
    expect(backButton.instance).toBeDefined();

    backButton.props.onClick();

    expect(mockOnBackButtonClick).toBeCalled();
  });
});
