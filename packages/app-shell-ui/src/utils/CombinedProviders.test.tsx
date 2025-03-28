import { ReactNode } from "react";
import { render, waitFor } from "@testing-library/react";

import CombinedProviders from "./CombinedProviders";

describe("CombinedProviders", () => {
  it("should combine all passed providers, from first to last, wrapping the passed children", async () => {
    const DummyActionComponent1 = ({ children }: { children: ReactNode }) => (
      <div aria-label="dummyProviderComponent1">{children}</div>
    );
    const DummyActionComponent2 = ({ children }: { children: ReactNode }) => (
      <div aria-label="dummyProviderComponent2">{children}</div>
    );
    const DummyActionComponent3 = ({ children }: { children: ReactNode }) => (
      <div aria-label="dummyProviderComponent3">{children}</div>
    );

    const { getByLabelText } = render(
      <CombinedProviders
        providers={[
          DummyActionComponent1,
          DummyActionComponent2,
          DummyActionComponent3,
        ]}
      >
        <div aria-label="dummy" />
      </CombinedProviders>,
    );

    await waitFor(() => {
      const dummyProvider1Element = getByLabelText("dummyProviderComponent1");
      const dummyProvider2Element = getByLabelText("dummyProviderComponent2");
      const dummyProvider3Element = getByLabelText("dummyProviderComponent3");

      expect(dummyProvider1Element).toBeInTheDocument();
      expect(dummyProvider2Element).toBeInTheDocument();
      expect(dummyProvider3Element).toBeInTheDocument();
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
    });
  });
});
