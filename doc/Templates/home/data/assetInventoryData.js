// TODO #1562 deal with dynamic data
const randomGenerator = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;

const riskDownTime = {
  headerTitle: "Downtime track ",
  event: {
    description: "Risk of downtime on Truck 12",
    timestamp: "2 minutes ago",
    schedule: "fix now"
  },
  relatedAssets: "Track A, Zone 15 Brake"
};

const severeBreakdown = {
  headerTitle: "Track severe ",
  event: {
    description: "Track severe breakdown",
    timestamp: "2 hours ago",
    schedule: "fix 3rd shift"
  },
  relatedAssets: "Track B, Load 2 Brake"
};

const dataGenerator = id => {
  const risk = randomGenerator(100, 1);
  const timeHorizon = randomGenerator(8, 1);
  const data = randomGenerator(10, 1) % 2 === 0 ? riskDownTime : severeBreakdown;
  return {
    headerTitle: data.headerTitle + (id + 1),
    id: `id_${id}`,
    event: data.event,
    probability: risk,
    timeHorizon,
    relatedAssets: data.relatedAssets,
    checkboxValue: `id_${id}`
  };
};

/**
 * Data for the views.
 *
 * @returns {[]}
 */
const getData = () => {
  const data = [];
  for (let i = 0; i < 10; i += 1) data.push(dataGenerator(i));
  return data;
};

export default getData;
