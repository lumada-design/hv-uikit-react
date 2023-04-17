import { HvGrid, HvAvatar } from "@hitachivantara/uikit-react-core";
import { theme } from "@hitachivantara/uikit-styles";
import { Kpi1 } from "../Kpi1/index.js";
import { Kpi2 } from "../Kpi2/index.js";

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

export const KPIs = () => {
  return (
    <HvGrid container style={{ paddingTop: theme.space.lg }}>
      <HvGrid item xs={12} md={3} lg={2} style={{ paddingTop: theme.space.xl }}>
        <HvGrid container justifyContent="center">
          <HvAvatar id="status5" size="xl" status="atmo4">
            LS
          </HvAvatar>
        </HvGrid>
      </HvGrid>
      <HvGrid item xs={12} md={9} lg={10}>
        <HvGrid container direction="row">
          {kpisData.map((el) => (
            <HvGrid key={el.id} item xs={12} sm={4}>
              <Kpi1 title={el.title} count={el.count} diff={el.diff} />
            </HvGrid>
          ))}
          {data.map((el) => (
            <HvGrid key={el.id} item xs={12} sm={4}>
              <Kpi2 title={el.title} value={el.value} />
            </HvGrid>
          ))}
        </HvGrid>
      </HvGrid>
    </HvGrid>
  );
};
