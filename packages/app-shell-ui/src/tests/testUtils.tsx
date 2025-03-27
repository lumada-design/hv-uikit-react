import { ReactNode } from "react";
import { act, render } from "@testing-library/react";
import { HvAppShellConfig } from "@hitachivantara/app-shell-shared";

import TestProvider from "./TestProvider";

/**
 * Utility function to render the test components wrapped in the TestProvider.
 * It also mocks the useAppShellConfig hook with the passed mockedConfigResponse parameter
 *
 * @param children
 * @param mockedConfigResponse
 * @param bundles
 */
const renderTestProvider = (
  children: ReactNode,
  mockedConfigResponse: Partial<HvAppShellConfig> = {},
  bundles: Record<string, object> = {},
) => {
  return act(() =>
    render(
      <TestProvider config={mockedConfigResponse} bundles={bundles}>
        {children}
      </TestProvider>,
    ),
  );
};

export default renderTestProvider;
