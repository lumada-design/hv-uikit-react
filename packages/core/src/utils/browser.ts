import { detect } from "detect-browser";

const isBrowser = (browsers) => {
  const browser = detect();
  return (
    browser &&
    (Array.isArray(browsers)
      ? browsers.indexOf(browser.name) > 0
      : browsers === browser.name)
  );
};

export { isBrowser as default };
