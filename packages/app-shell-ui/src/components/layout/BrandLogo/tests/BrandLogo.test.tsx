import { render } from "@testing-library/react";
import { HvProvider } from "@hitachivantara/uikit-react-core";

import renderTestProvider from "../../../../tests/testUtils";
import BrandLogo from "../BrandLogo";

describe("`BrandLogo` component", () => {
  it("should render the default if no logo is provided", () => {
    const { getByLabelText } = render(
      <HvProvider>
        <BrandLogo />
      </HvProvider>,
    );

    expect(getByLabelText("Hitachi logo")).toBeInTheDocument();
  });

  it("should render the default when empty logo prop", () => {
    const { getByLabelText } = render(
      <HvProvider>
        <BrandLogo logo={{}} />
      </HvProvider>,
    );

    expect(getByLabelText("Hitachi logo")).toBeInTheDocument();
  });

  it("shouldn't render any logo when logo prop is null", () => {
    const { queryByLabelText } = render(
      <HvProvider>
        <BrandLogo logo={null} />
      </HvProvider>,
    );

    expect(queryByLabelText("Pentaho logo")).toBeNull();
    expect(queryByLabelText("Lumada logo")).toBeNull();
    expect(queryByLabelText("Hitachi logo")).toBeNull();
  });

  it("should render the Lumada logo when provided", () => {
    const { getByLabelText } = render(
      <HvProvider>
        <BrandLogo logo={{ name: "LUMADA" }} />
      </HvProvider>,
    );

    expect(getByLabelText("Lumada logo")).toBeInTheDocument();
  });

  it("should render the Hitachi logo when provided", () => {
    const { getByLabelText } = render(
      <HvProvider>
        <BrandLogo logo={{ name: "HITACHI" }} />
      </HvProvider>,
    );

    expect(getByLabelText("Hitachi logo")).toBeInTheDocument();
  });

  it("should render the Pentaho logo when provided", () => {
    const { getByLabelText } = render(
      <HvProvider>
        <BrandLogo logo={{ name: "PENTAHO+" }} />
      </HvProvider>,
    );

    expect(getByLabelText("Pentaho logo")).toBeInTheDocument();
  });

  it("should have description with value (string without translation)", () => {
    const { getByLabelText } = render(
      <HvProvider>
        <BrandLogo
          logo={{
            name: "HITACHI",
            description: "Test logo description",
          }}
        />
      </HvProvider>,
    );

    expect(getByLabelText("Test logo description")).toBeInTheDocument();
  });

  it("should have description with translated value (string with translation)", async () => {
    const { getByLabelText } = await renderTestProvider(
      <BrandLogo
        logo={{
          name: "LUMADA",
          description: "logoDesc",
        }}
      />,
      undefined,
      {
        en: {
          logoDesc: "Translated logo description",
        },
      },
    );

    expect(getByLabelText("Translated logo description")).toBeInTheDocument();
  });

  it("should have logo default description (explicit null or prop not present)", () => {
    const { getByLabelText } = render(
      <HvProvider>
        <BrandLogo logo={{ name: "PENTAHO+" }} />
      </HvProvider>,
    );

    expect(getByLabelText("Pentaho logo")).toBeInTheDocument();
  });
});
