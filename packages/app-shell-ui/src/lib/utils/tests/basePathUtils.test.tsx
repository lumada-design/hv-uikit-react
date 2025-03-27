import getBasePath from "../basePathUtils";

describe("getBasePath Utils", () => {
  it("empty config returns /", () => {
    expect(getBasePath({})).toBe("/");
  });

  it("should return baseUrl regardless of the apps", () => {
    expect(
      getBasePath({
        baseUrl: "/theTrueBaseUrl/",
        apps: {
          "dummy-app-1": "/dummy-base-url/",
          dummyApp2: "http://dummy-app-2-base-url/",
        },
      }),
    ).toBe("/theTrueBaseUrl/");
  });
});
