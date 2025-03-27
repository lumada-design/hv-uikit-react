import { renderHook } from "@testing-library/react";

import useNavigationContextDefaultMock from "../../../tests/defaultMocks";
import { NavigationContext } from "../../NavigationProvider";
import useNavigationContext from "../useNavigationContext";

describe("useNavigationContext", () => {
  it("should return the NavigationContext", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <NavigationContext.Provider value={useNavigationContextDefaultMock}>
        {children}
      </NavigationContext.Provider>
    );
    const { result } = renderHook(() => useNavigationContext(), { wrapper });

    expect(result.current).toEqual(useNavigationContextDefaultMock);
  });
});
