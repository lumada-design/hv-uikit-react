/* eslint-disable class-methods-use-this */
import "@testing-library/jest-dom/vitest";

/**
 * Adds missing JSDOM implementations
 * We needed to add this mock due to an error that started happening after some npm package update. The error was:
 * `TypeError: window.ResizeObserver is not a constructor`
 *
 * Note: We tried to use the `ResizeObserver` polyfill but it didn't work.
 * Note2: We were unable to identify the actual package that caused the issue.
 *
 * Later on we also started having the error:
 * `Error: Could not parse CSS stylesheet`
 * This error started happening inside the HvOverflowTooltip component, which uses react-resize-detector, when upgrading uikit-core to a version above 3.62.1.
 */
beforeAll(() => {
  class ResizeObserver {
    observe() {}

    unobserve() {}

    disconnect() {}
  }

  window.ResizeObserver = ResizeObserver;
});
