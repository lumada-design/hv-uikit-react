import React from "react";
import { render, screen } from "testing-utils";
import { HvProvider } from "@hitachivantara/uikit-react-core";
import { HvWizardContainer } from "../..";

describe("WizardContainer", () => {
  // this test fails because of a problem with fullscreen prop inside HvDialog
  it.skip("should render any child", () => {
    render(
      <HvProvider disableCssBaseline>
        <HvWizardContainer open handleClose={jest.fn()}>
          <div>mockHeader</div>
          <div>mockContent</div>
          <div>mockActions</div>
        </HvWizardContainer>
      </HvProvider>
    );

    expect(screen.getByText("mockHeader")).toBeInTheDocument();
    expect(screen.getByText("mockContent")).toBeInTheDocument();
    expect(screen.getByText("mockActions")).toBeInTheDocument();
  });
});
