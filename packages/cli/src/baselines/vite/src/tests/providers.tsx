import { FC, ReactNode, Suspense } from "react";
import { HvProvider } from "@hitachivantara/uikit-react-core";
import { SUSPENSE_LABEL } from "./mocks";

/** Base Test Provider */
export const TestProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={SUSPENSE_LABEL}>
      <HvProvider>{children}</HvProvider>
    </Suspense>
  );
};
