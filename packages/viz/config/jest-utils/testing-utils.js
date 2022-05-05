/* eslint-disable import/no-extraneous-dependencies */
/* eslint-env jest */

import React from "react";

import { render } from "@testing-library/react";

import { HvProvider } from "@hitachivantara/uikit-react-core";

// eslint-disable-next-line react/prop-types
const AllTheProviders = ({ children }) => <HvProvider>{children}</HvProvider>;

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
