const fetch = require("node-fetch");

const baseUrl = process.env.STORYBOOK_URL || "http://localhost:9001";
const storiesUrl = baseUrl + "/stories.json";
const iframeUrl = baseUrl + "/iframe.html";

const filterStories = (s, filter) => {
  const includedPaths = ["Components/", "Tests/Dropdown Menu"];
  return (
    (filter == null || s.id.includes(filter)) &&
    s.title &&
    includedPaths.some((p) => s.title.startsWith(p))
  );
};

const removeDisabled = (s) =>
  s.parameters == null || s.parameters.pa11y == null || s.parameters.pa11y.disable !== true;

const defaultIgnores = [
  "region",
  // Disabling contrast tests due to inconsistent false positives
  // https://github.com/pa11y/pa11y/issues/422
  "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
  "color-contrast",
];

const overrides = {
  "Widgets/Asset Inventory/List View": {
    "*": {
      // <div aria-label="selectable"></div> is a noop
      // it won't be read by a screen reader as the element
      // neither is a landmark nor an interactive element
      // not worth fixing as all those fake column headers are
      // not accessible anyway
      disable: true,
    },
  },
  "Components/Inputs/Code Editor": {
    "*": {
      disable: true,
    },
  },
  "Widgets/Filter Group": {
    "*": {
      disable: true,
    },
  },
  "Components/Display/Table": {
    "*": {
      // the HvTable that has several accessibility issues like
      // the aria-rowindex attribute being improperly used
      // the sort button having no aria-label
      // the secondary actions button having no aria-label and an duplicate id
      // the expand button having a static aria-label
      // and so on...
      disable: true,
    },
  },
  "Components/Feedback/Loading": {
    "With Children": {
      // Sample uses the HvTable, that has several accessibility issues
      disable: true,
    },
  },
  "Components/Inputs/File Uploader": {
    "*": {
      ignore: [
        // interactive controls must not be nested, but currently
        // dropZoneContainer with role button has an input as a child
        "nested-interactive",
      ],
    },
  },
  "Components/Inputs/Search Box": {
    "Search As You Type": {
      ignore: [
        // scrollable region should be focusable so the user can scroll with the keyboard
        // however that's not the focus of this sample
        "scrollable-region-focusable",
      ],
    },
  },
  "Components/Inputs/Dropdown Menu": {
    "With Icons And Actions": {
      actions: [
        // open menu before testing
        "click element #dropdownmenu-with-icons-and-actions-icon-button",
        "wait for element #dropdownmenu-with-icons-and-actions-list to be visible",
      ],
    },
  },
  "Tests/Dropdown Menu": {
    "A 11 Y Open": {
      actions: [
        // open menu before testing
        "click element #dropdownmenu-open-icon-button",
        "wait for element #dropdownmenu-open-list to be visible",
      ],
    },
  },
  "Components/Display/Avatar": {
    Buttons: {
      ignore: [
        // interactive controls must not be nested but the avatar might have a button as child
        "nested-interactive",
      ],
    },
  },
  "Widgets/App Switcher": {
    "*": {
      ignore: [
        // interactive controls must not be nested but the app switcher panel might have a button as child
        "nested-interactive",
      ],
    },
  },
};

module.exports = (async () => {
  const response = await fetch(storiesUrl);
  const data = await response.json();

  const filter = process.env.STORY?.toLocaleLowerCase();

  const stories = Object.values(data.stories)
    .filter((s) => filterStories(s, filter))
    .map(({ parameters = {}, name, title, ...others }) => {
      const pa11yComponentConfig = overrides[title]?.["*"];
      const pa11yStoryConfig = overrides[title]?.[name];
      let pa11y = undefined;
      if (pa11yComponentConfig != null || pa11yStoryConfig != null) {
        pa11y = {
          ...(pa11yComponentConfig ?? {}),
          ...(pa11yStoryConfig ?? {}),
          ignore: [
            ...defaultIgnores,
            ...(pa11yComponentConfig?.ignore ?? []),
            ...(pa11yStoryConfig?.ignore ?? []),
          ],
        };
      }

      return {
        ...others,
        name,
        title,
        parameters: { ...parameters, pa11y },
      };
    })
    .filter(removeDisabled)
    .map((s) => ({
      url: iframeUrl + "?id=" + s.id,
      ...s.parameters.pa11y,
    }));

  if (stories == null) {
    process.exit(1);
  }

  return {
    defaults: {
      timeout: 15000,
      ignore: defaultIgnores,
      runners: ["htmlcs", "axe"],
      standard: "WCAG2AA",
      rootElement: "div[id=root]",
      reporter: "json",
      chromeLaunchConfig: {
        ignoreHTTPSErrors: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    },
    urls: stories,
  };
})();
