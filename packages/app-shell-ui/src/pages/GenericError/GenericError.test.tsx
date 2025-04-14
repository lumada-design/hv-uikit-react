import renderTestProvider from "../../tests/testUtils";
import GenericError from "./GenericError";

describe("`Generic error", () => {
  it("Should include textual and accessibility info", async () => {
    const { getAllByRole, getByRole } = await renderTestProvider(
      <GenericError />,
    );

    const headings = getAllByRole("heading");
    expect(headings[0].textContent).toBe("500");
    expect(headings[1].textContent).toBe(
      "Shoot! We have a problem! Be back soon.",
    );
    expect(
      getByRole("img", {
        name: "500 Generic error",
      }),
    ).toBeDefined();
  });
});
