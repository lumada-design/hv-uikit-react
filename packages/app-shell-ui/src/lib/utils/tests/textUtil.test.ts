import includesString from "../textUtil";

describe("containsString", () => {
  it("If the value contains the other string return true", () => {
    expect(includesString("https://dummyHost.com", ":")).toBeTruthy();
  });

  it("If the value doesn't contain the other string return false", () => {
    expect(includesString("dummyHost.com", ":")).toBeFalsy();
  });
});
