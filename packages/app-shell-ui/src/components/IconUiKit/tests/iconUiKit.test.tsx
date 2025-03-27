import { Suspense } from "react";
import { render } from "@testing-library/react";

import IconUiKit from "../IconUiKit";

describe("<IconUiKit /> renders properly", () => {
  it("should have an `IconUiKit` component", () => {
    const { container } = render(
      <Suspense fallback={<div>loading</div>}>
        <IconUiKit name="Open" />
      </Suspense>,
    );

    expect(container.querySelector("[data-name=Open] svg")).toBeInTheDocument();
  });
});
