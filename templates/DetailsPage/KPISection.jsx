import {
  HvGrid,
  HvCard,
  HvAvatar,
  HvCardHeader,
  HvCardContent,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import React from "react";
import { withStyles } from "@mui/styles";
import Kpi from "./Kpi";
import styles from "./styles";

const data = [
  {
    id: 1,
    title: "Review Log",
    value: "2019/6/4",
  },
  {
    id: 2,
    title: "Update Build",
    value: "2020/12/1",
  },
  {
    id: 3,
    title: "Clean Data Logs",
    value: "2018/5/3",
  },
  {
    id: 4,
    title: "Deploy Cloud Run",
    value: "Blone",
  },
  {
    id: 5,
    title: "Update Build",
    value: "2020/12/1	",
  },
  {
    id: 6,
    title: "Build",
    value: "46uYmU",
  },
];

const kpisData = [
  { id: 1, title: "Sucess Requests", count: 4, diff: 2.02 },
  { id: 2, title: "Error Requests", count: 2, diff: -1.63 },
  { id: 3, title: "Open Requests", count: 12, diff: 1.84 },
];

const KPISection = ({ classes }) => {
  return (
    <HvGrid container>
      <HvGrid item xs={12} md={3} lg={2}>
        <HvGrid item container justifyContent="center">
          <HvAvatar id="status5" size="XL" status="atmo4">
            LS
          </HvAvatar>
        </HvGrid>
      </HvGrid>
      <HvGrid item xs={12} md={9} lg={10}>
        <HvGrid container direction="row">
          {kpisData.map((el) => (
            <HvGrid key={el.id} item xs={12} sm={6} md={4} lg={2}>
              <Kpi title={el.title} count={el.count} diff={el.diff} />
            </HvGrid>
          ))}
          <HvGrid container item xs={12} />
          {data.map((el) => (
            <HvGrid key={el.id} item xs={6} md={4} lg={2}>
              <HvCard>
                <HvCardHeader
                  title={el.title}
                  classes={{
                    root: classes.titleRoot,
                    title: classes.headerTitle,
                  }}
                />
                <HvCardContent>
                  <HvTypography variant="normalText">{el.value}</HvTypography>
                </HvCardContent>
              </HvCard>
            </HvGrid>
          ))}
        </HvGrid>
      </HvGrid>
    </HvGrid>
  );
};

export default withStyles(styles)(KPISection);
