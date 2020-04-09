import { months, trace3, trace2, trace1 } from "../data/lineChartData";

const t1 = {
  x: months,
  y: trace1,
  name: "Target"
};

const t2 = {
  x: months,
  y: trace2,
  name: "Cash"
};

const t3 = {
  x: months,
  y: trace3,
  name: "Monthly Sales"
};

const data = [t1, t2, t3];

export default data;
