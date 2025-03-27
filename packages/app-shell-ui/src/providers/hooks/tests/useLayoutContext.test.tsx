import { renderHook } from "@testing-library/react";
import { vi } from "vitest";

import { LayoutContext, LayoutContextValue } from "../../LayoutProvider";
import useLayoutContext from "../useLayoutContext";

describe("useLayoutContext", () => {
  it("should return the LayoutContext", () => {
    const layout: LayoutContextValue = {
      bannerMaxHeight: 0,
      setBannerMaxHeight: vi.fn(),
      verticalNavigationWidth: 0,
      setVerticalNavigationWidth: vi.fn(),
    };
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LayoutContext.Provider value={layout}>{children}</LayoutContext.Provider>
    );
    const { result } = renderHook(() => useLayoutContext(), { wrapper });

    expect(result.current).toEqual(layout);
  });
});
