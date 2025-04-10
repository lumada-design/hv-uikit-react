import renderTestProvider from "../../../../../../tests/testUtils";
import HelpButton from "./HelpButton";

describe("`HelpButton` component", () => {
  it("should render a link component with the correct href and aria-labels attributes", async () => {
    const { getByRole } = await renderTestProvider(
      <HelpButton url="https://example.com" description="Help documentation" />,
    );

    const linkElement = getByRole("link");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "https://example.com");
    expect(linkElement).toHaveAccessibleName("Help documentation");
  });

  it("should render a link with a default description when the description is not provided", async () => {
    const { getByRole } = await renderTestProvider(
      <HelpButton url="https://example.com" />,
    );

    const linkElement = getByRole("link");

    expect(linkElement).toHaveAccessibleName("Documentation link");
  });

  it("should render a link with the href property set with the translation key when no colon is present in the url property", async () => {
    const { getByRole } = await renderTestProvider(
      <HelpButton url="urlValue" />,
    );

    const linkElement = getByRole("link");

    expect(linkElement).toHaveAttribute("href", "urlValue");
  });
});
