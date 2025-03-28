import renderTestProvider from "../../../tests/testUtils";
import NotFound from "../NotFound";

describe("`NotFound` page", () => {
  it("Should include textual and accessibility info", async () => {
    const { getAllByRole, getByRole } = await renderTestProvider(<NotFound />);

    const headings = getAllByRole("heading");
    expect(headings[0].textContent).toBe("404");
    expect(headings[1].textContent).toBe(
      "Oops! Seems like the page is lost in space.",
    );
    expect(
      getByRole("img", {
        name: "404 Page not found",
      }),
    ).toBeDefined();
  });
});
