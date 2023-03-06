import { HvCard, HvTypography } from "@hitachivantara/uikit-react-core";
import { Top, Bottom } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";

import classes from "./styles";

export const Kpi1 = ({ title, count, diff }) => {
  return (
    <HvCard bgcolor="transparent" style={{ outline: "none" }}>
      <div style={{ padding: theme.space.sm }}>
        <HvTypography variant="label">{title}</HvTypography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <HvTypography variant="title2">{count}</HvTypography>
          {diff > 0 && (
            <>
              <Top color={theme.colors.sema1} className={classes.indicator} />
              <HvTypography variant="caption1">{`${diff.toFixed(2)}
               more`}</HvTypography>
            </>
          )}
          {diff < 0 && (
            <>
              <Bottom
                color={theme.colors.sema3}
                className={classes.indicator}
              />
              <HvTypography variant="caption1">{`${Math.abs(diff).toFixed(2)}
               less.`}</HvTypography>
            </>
          )}
        </div>
      </div>
    </HvCard>
  );
};
