import React from "react";
import PropTypes from "prop-types";
import {
  HvCard,
  HvCardHeader,
  HvCardContent,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Top, Bottom } from "@hitachivantara/uikit-react-icons";
import { useTheme, withStyles } from "@material-ui/core";
import styles from "./styles";

const Kpi = ({ title, count, diff, classes }) => {
  const { hv } = useTheme();

  return (
    <HvCard
      classes={{
        sema0: classes.cardBorder,
      }}
      bgcolor="transparent"
    >
      <HvCardHeader
        title={title}
        classes={{
          root: classes.titleRoot,
          title: classes.titleText,
        }}
      />
      <HvCardContent className={classes.content}>
        <HvTypography variant="mTitle">{count}</HvTypography>
        {diff > 0 && (
          <>
            <Top color={hv.palette.semantic.sema1} className={classes.indicatorIcon} />
            <HvTypography variant="vizText">{`${diff.toFixed(2)}
              more vs avg.`}</HvTypography>
          </>
        )}
        {diff < 0 && (
          <>
            <Bottom color={hv.palette.semantic.sema3} className={classes.indicatorIcon} />
            <HvTypography variant="vizText">{`${Math.abs(diff).toFixed(2)}
              less vs avg.`}</HvTypography>
          </>
        )}
      </HvCardContent>
    </HvCard>
  );
};

Kpi.propTypes = {
  /**
   * The title of the KPI.
   */
  title: PropTypes.string,
  /**
   * The text of the KPI.
   */
  count: PropTypes.number,
  /**
   *
   */
  diff: PropTypes.number,
};

export default withStyles(styles)(Kpi);
