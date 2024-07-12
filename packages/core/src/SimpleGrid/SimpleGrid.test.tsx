import { render } from "@testing-library/react";

import { HvSimpleGrid } from "./SimpleGrid";

describe("SimpleGrid", () => {
  it("correct render children", () => {
    const { getByTestId } = render(
      <HvSimpleGrid data-testid="ancestor">
        <p data-testid="descendant">Hello world</p>
      </HvSimpleGrid>,
    );
    const ancestor = getByTestId("ancestor");
    const descendant = getByTestId("descendant");
    expect(ancestor).toContainElement(descendant);
  });
});
