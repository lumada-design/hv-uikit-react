import { css } from "@emotion/css";
import {
  HvGrid,
  HvGridProps,
  HvLoadingContainer,
  HvPanel,
  theme,
} from "@hitachivantara/uikit-react-core";

/** A `HvGrid` item + styled `HvPanel` container with a loading `Suspense` boundary */
export const GridPanel = ({
  children,
  height = 300,
  isLoading,
  ...others
}: HvGridProps & { isLoading?: boolean }) => (
  <HvGrid item {...others}>
    <HvLoadingContainer hidden={!isLoading}>
      <HvPanel
        role="region"
        style={{ height: height as number }}
        className={css({
          overflow: "visible",
          position: "relative",
          border: `1px solid ${theme.colors.atmo4}`,
          borderRadius: `0 0 ${theme.radii.round} ${theme.radii.round}`,
        })}
      >
        {children}
      </HvPanel>
    </HvLoadingContainer>
  </HvGrid>
);
