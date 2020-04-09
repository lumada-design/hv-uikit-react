import { quarter, trace5, trace4, trace3, trace2, trace1 } from "../data/barChartData";

const t1 = {
  x: quarter,
  y: trace1,
  name: "Sales Target"
};

const t2 = {
  x: quarter,
  y: trace2,
  name: "Sales per Rep"
};

const t3 = {
  x: quarter,
  y: trace3,
  name: "Monthly Sales"
};

const t4 = {
  x: quarter,
  y: trace4,
  name: "Target"
};

const t5 = {
  x: quarter,
  y: trace5,
  name: "Cash"
};

const data = [t1, t2, t3, t4, t5];

export default data;
