/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const randomGenerator = (max, min) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

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
  const data =
    randomGenerator(10, 1) % 2 === 0 ? riskDownTime : severeBreakdown;
  return {
    headerTitle: data.headerTitle + (id + 1),
    id: "id_" + id,
    event: data.event,
    probability: risk,
    timeHorizon: timeHorizon,
    relatedAssets: data.relatedAssets,
    checkboxValue: "id_" + id
  };
};

/**
 * Data for the views.
 *
 * @returns {[]}
 */
const getData = () => {
  let data = [];
  for (let i = 0; i < 10; ++i) data.push(dataGenerator(i));
  return data;
};

export default getData;
