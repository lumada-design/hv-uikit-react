import React from "react";
import { render } from "@testing-library/react";
import { beforeAll, beforeEach, vi } from "vitest";
import { HvProvider } from "@hitachivantara/uikit-react-core";

import "@testing-library/jest-dom";

const customRender = (ui: React.ReactElement<any>, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => <HvProvider>{children}</HvProvider>,
    ...options,
  });

beforeEach(async (context: any) => {
  // extend context
  context.render = customRender;
});

// Adds missing JSDOM implementations
beforeAll(() => {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  class IntersectionObserver {
    observe() {}
    disconnect() {}
    unobserve() {}
  }

  // Tests running in Node environment don't have access to the window global object
  if (typeof window !== "undefined") {
    window.ResizeObserver = ResizeObserver;

    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: IntersectionObserver,
    });

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  }
});
