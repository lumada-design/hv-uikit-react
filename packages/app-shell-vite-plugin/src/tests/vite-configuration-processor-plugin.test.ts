import { replaceReferencesToSelf } from "../vite-configuration-processor-plugin";

describe("replaceReferencesToSelf", () => {
  it("should replace references to self in bundle definitions", () => {
    const bundles = [
      {
        bundle: "@self/pages/Page1.js",
        views: [
          {
            bundle: "@self/pages/Page2.js",
          },
          {
            bundle: "@other-app/pages/Page3.js",
          },
        ],
      },
      {
        bundle: "@other-app/pages/Page4.js",
      },
    ];

    const selfAppName = "@hv-tests/some-app";

    const expectedBundles = [
      {
        bundle: "@hv-tests/some-app/pages/Page1.js",
        views: [
          {
            bundle: "@hv-tests/some-app/pages/Page2.js",
          },
          {
            bundle: "@other-app/pages/Page3.js",
          },
        ],
      },
      {
        bundle: "@other-app/pages/Page4.js",
      },
    ];

    const result = replaceReferencesToSelf(bundles, selfAppName);

    expect(result).toEqual(expectedBundles);
  });

  it("should not modify bundle definitions without references to self", () => {
    const bundles = [
      {
        bundle: "@other-app/pages/Page1.js",
      },
      {
        bundle: "@other-app/pages/Page2.js",
        views: [
          {
            bundle: "@other-app/pages/Page3.js",
          },
        ],
      },
    ];

    const selfAppName = "@hv-tests/some-app";

    const expectedBundles = [
      {
        bundle: "@other-app/pages/Page1.js",
      },
      {
        bundle: "@other-app/pages/Page2.js",
        views: [
          {
            bundle: "@other-app/pages/Page3.js",
          },
        ],
      },
    ];

    const result = replaceReferencesToSelf(bundles, selfAppName);

    expect(result).toEqual(expectedBundles);
  });
});
