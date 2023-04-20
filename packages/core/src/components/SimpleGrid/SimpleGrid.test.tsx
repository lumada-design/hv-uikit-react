import { render } from "@testing-library/react";
import { HvProvider } from "@core/providers";
import { HvSimpleGrid } from "./SimpleGrid";

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
      <HvProvider>
        <HvSimpleGrid data-testid="ancestor">
          <p data-testid="descendant">Hello world</p>
        </HvSimpleGrid>
      </HvProvider>
    );
    const ancestor = getByTestId("ancestor");
    const descendant = getByTestId("descendant");
    expect(ancestor).toContainElement(descendant);
  });
});
