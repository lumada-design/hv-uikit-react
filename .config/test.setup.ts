import "@testing-library/jest-dom";
import { cleanup, render } from "@testing-library/react";
import { beforeEach, afterEach } from "vitest";

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });

beforeEach(async (context) => {
  // extend context
  context.render = customRender;
});

afterEach(() => {
  cleanup();
});
