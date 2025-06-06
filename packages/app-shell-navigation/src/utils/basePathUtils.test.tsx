import getBasePath from "./basePathUtils";

describe("getBasePath Utils", () => {
  it("empty config returns /", () => {
    expect(getBasePath({})).toBe("/");
  });

  it("should return baseUrl for the baseUrl property", () => {
    expect(getBasePath({ baseUrl: "/dummy-base-url/" })).toBe(
      "/dummy-base-url/",
    );
  });
});
