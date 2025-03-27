import includesString from "../textUtil";

describe("containsString", () => {
  it("If the value contains the other string return true", () => {
    expect(includesString("https://dummmyHost.com", ":")).toBeTruthy();
  });

  it("If the value doesn't contain the other string return false", () => {
    expect(includesString("dummmyHost.com", ":")).toBeFalsy();
  });
});
