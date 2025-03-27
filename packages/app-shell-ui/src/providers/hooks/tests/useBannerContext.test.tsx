import { renderHook } from "@testing-library/react";
import { vi } from "vitest";

import { BannerContext, BannerContextValue } from "../../BannerProvider";
import useBannerContext from "../useBannerContext";

describe("useBannerContext", () => {
  it("should return the BannerContext", () => {
    const banner: BannerContextValue = {
      show: vi.fn(),
      dismiss: vi.fn(),
    };
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BannerContext.Provider value={banner}>{children}</BannerContext.Provider>
    );
    const { result } = renderHook(() => useBannerContext(), { wrapper });

    expect(result.current).toEqual(banner);
  });
});
