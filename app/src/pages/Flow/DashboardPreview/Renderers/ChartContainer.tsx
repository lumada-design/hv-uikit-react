import { css } from "@emotion/css";
import {
  HvLoading,
  HvSection,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

interface ChartContainerProps {
  children: React.ReactNode;
  loading: boolean;
  title?: string;
}

export const ChartContainer = ({
  title,
  loading,
  children,
}: ChartContainerProps) => (
  <HvSection
    title={!loading && <HvTypography variant="title4">{title}</HvTypography>}
    className={
      loading
        ? css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          })
        : undefined
    }
  >
    {loading ? <HvLoading small /> : children}
  </HvSection>
);
