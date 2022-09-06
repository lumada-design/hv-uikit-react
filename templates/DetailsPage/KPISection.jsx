import {
  HvGrid,
  HvSimpleGrid,
  HvCard,
  HvAvatar,
  HvCardHeader,
  HvCardContent,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import React from "react";
import { withStyles } from "@material-ui/core";
import Kpi from "./Kpi";
import styles from "./styles";

const data = [
  {
    title: "Birth Year",
    value: "19BBY",
  },
  {
    title: "Home World",
    value: "Tatooine",
  },
  {
    title: "Eye Color",
    value: "Blue",
  },
  {
    title: "Hair Color",
    value: "Blone",
  },
  {
    title: "Skin Color",
    value: "Fair",
  },
  {
    title: "Gender",
    value: "Male",
  },
];

const kpisData = [
  { title: "Movie Participation", count: 4, diff: 2.02 },
  { title: "Starship Owned", count: 2, diff: 1.63 },
  { title: "Vehicle Owned", count: 2, diff: 1.84 },
];

const KPISection = ({ classes }) => {
  return (
    <>
      <HvGrid item container xs={12} md={3} lg={2} justify="center" style={{ margin: "30px 0px" }}>
        <HvGrid item>
          <HvAvatar id="status5" size="XL" status="atmo4">
            LS
          </HvAvatar>
        </HvGrid>
      </HvGrid>
      <HvGrid item xs={12} md={9} lg={10} style={{ marginTop: "20px" }}>
        <HvSimpleGrid
          spacing="sm"
          breakpoints={[
            { minWidth: 1180, cols: 6, spacing: "md" },
            { minWidth: 800, cols: 3, spacing: "sm" },
            { minWidth: 500, cols: 2, spacing: "sm" },
            { minWidth: 400, cols: 1, spacing: "sm" },
          ]}
        >
          {kpisData.map((el) => (
            <Kpi title={el.title} count={el.count} diff={el.diff} />
          ))}
        </HvSimpleGrid>
        <HvSimpleGrid
          breakpoints={[
            { minWidth: 1180, cols: 6, spacing: "md" },
            { minWidth: 800, cols: 3, spacing: "sm" },
            { minWidth: 500, cols: 2, spacing: "sm" },
            { minWidth: 400, cols: 1, spacing: "sm" },
          ]}
          style={{ paddingTop: "30px" }}
        >
          {data.map((el) => (
            <HvCard>
              <HvCardHeader
                title={el.title}
                classes={{
                  root: classes.titleRoot,
                  title: classes.titleText,
                }}
              />
              <HvCardContent>
                <HvTypography variant="normalText">{el.value}</HvTypography>
              </HvCardContent>
            </HvCard>
          ))}
        </HvSimpleGrid>
      </HvGrid>
    </>
  );
};

export default withStyles(styles)(KPISection);
