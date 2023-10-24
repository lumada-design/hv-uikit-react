import { Suspense } from "react";
import { css } from "@emotion/css";
import {
  HvGrid,
  HvGridProps,
  HvLoading,
  HvPanel,
  theme,
} from "@hitachivantara/uikit-react-core";

import { LoadingContainer } from "../utils";

/** A `HvGrid` item + styled `HvPanel` container with a loading `Suspense` boundary */
export const GridPanel = ({
  children,
  width,
  height = 300,
  isLoading,
  ...others
}: HvGridProps & { isLoading?: boolean }) => (
  <HvGrid item {...others}>
    <LoadingContainer loading={isLoading}>
      <HvPanel
        role="region"
        style={{ width, height }}
        className={css({
          overflow: "visible",
          position: "relative",
          border: `1px solid ${theme.colors.atmo4}`,
          borderRadius: `0 0 ${theme.radii.round} ${theme.radii.round}`,
        })}
      >
        <Suspense
          fallback={
            <HvLoading className={css({ position: "absolute", inset: 0 })} />
          }
        >
          {children}
        </Suspense>
      </HvPanel>
    </LoadingContainer>
  </HvGrid>
);
