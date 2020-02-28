import { detect } from "detect-browser";

const isBrowser = browsers => {
  const browser = detect();
  return (
    browser &&
    (Array.isArray(browsers)
      ? browsers.includes(browser.name)
      : browsers === browser.name)
  );
};

export { isBrowser as default };
