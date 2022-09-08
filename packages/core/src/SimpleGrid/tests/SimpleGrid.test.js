import React from "react";
import { render } from "testing-utils";

import { HvProvider } from "../..";
import SimpleGrid from "../SimpleGrid";

export default {
  title: "Tests/SimpleGrid",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

describe("SimplelGrid", () => {
  it("correct render children", () => {
    const { getByTestId } = render(
      <HvProvider cssBaseline="none">
        <SimpleGrid data-testid="ancestor">
          <p data-testid="descendant">Hello world</p>
        </SimpleGrid>
      </HvProvider>
    );
    const ancestor = getByTestId("ancestor");
    const descendant = getByTestId("descendant");
    expect(ancestor).toContainElement(descendant);
  });
});
