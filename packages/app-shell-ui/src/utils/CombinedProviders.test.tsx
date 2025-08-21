import { ReactNode } from "react";
import { render, waitFor } from "@testing-library/react";

import CombinedProviders from "./CombinedProviders";

describe("CombinedProviders", () => {
  it("combines all passed providers, from first to last, wrapping the passed children and config if any", async () => {
    const DummyActionComponent1 = ({ children }: { children: ReactNode }) => (
      <div aria-label="dummyProviderComponent1">{children}</div>
    );
    const DummyActionComponent2 = ({ children }: { children: ReactNode }) => (
      <div aria-label="dummyProviderComponent2">{children}</div>
    );
    const DummyActionComponent3 = ({ children }: { children: ReactNode }) => (
      <div aria-label="dummyProviderComponent3">{children}</div>
    );
    const DummyProviderWithConfig = ({
      children,
      testProp,
    }: {
      children: ReactNode;
      testProp?: string;
    }) => (
      <div aria-label="dummyProviderWithConfig" data-test-prop={testProp}>
        {children}
      </div>
    );

    const { getByLabelText } = render(
      <CombinedProviders
        providers={[
          { component: DummyActionComponent1 },
          {
            component: DummyProviderWithConfig,
            config: { testProp: "test-value" },
          },
          { component: DummyActionComponent2 },
          { component: DummyActionComponent3 },
        ]}
      >
        <div aria-label="dummy" />
      </CombinedProviders>,
    );

    await waitFor(() => {
      const dummyProvider1Element = getByLabelText("dummyProviderComponent1");
      const dummyProvider2Element = getByLabelText("dummyProviderComponent2");
      const dummyProvider3Element = getByLabelText("dummyProviderComponent3");
      const dummyProviderWithConfigElement = getByLabelText(
        "dummyProviderWithConfig",
      );

      expect(dummyProvider1Element).toBeInTheDocument();
      expect(dummyProvider2Element).toBeInTheDocument();
      expect(dummyProvider3Element).toBeInTheDocument();
      expect(dummyProviderWithConfigElement).toBeInTheDocument();
      expect(getByLabelText("dummy")).toBeInTheDocument();
      expect(dummyProvider1Element!.contains(dummyProvider2Element!)).toBe(
        true,
      );
      expect(dummyProvider2Element!.contains(dummyProvider3Element!)).toBe(
        true,
      );
      expect(dummyProvider1Element!.contains(dummyProvider3Element!)).toBe(
        true,
      );
      expect(
        dummyProviderWithConfigElement.getAttribute("data-test-prop"),
      ).toBe("test-value");
    });
  });
});
