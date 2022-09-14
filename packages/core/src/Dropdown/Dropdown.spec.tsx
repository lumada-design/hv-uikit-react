import { render } from "@testing-library/react";

import Dropdown from "./Dropdown";

const options = [{ label: "Some Label", value: "someValue" }];

describe("Dropdown", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <Dropdown label="Some Label" value="someValue" options={options} />
    );
    expect(baseElement).toBeTruthy();
  });
});
