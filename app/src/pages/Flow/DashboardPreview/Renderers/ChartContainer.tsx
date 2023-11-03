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
    classes={{
      content: css({
        height: "100%",
      }),
    }}
  >
    {loading ? <HvLoading small /> : children}
  </HvSection>
);
