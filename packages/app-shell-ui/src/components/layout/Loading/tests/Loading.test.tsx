import { render } from "@testing-library/react";
import { HvProvider } from "@hitachivantara/uikit-react-core";

import Loading from "../Loading";

describe("`Loading` component", () => {
  it("should have a `HvLoading` component with label", () => {
    const { getByText } = render(
      <HvProvider>
        <Loading loadingLabel="dummy" />
      </HvProvider>,
    );

    expect(getByText("dummy")).toBeInTheDocument();
  });
});
