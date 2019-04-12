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

import React from "react";
import HvListView from "@hv/uikit-react-lab/dist/ListView";
import leaf from "../../core/card/resources/leaf.png";
import Typography from "@material-ui/core/Typography";

const data = {
  firstTitle: "ID",
  firstContent: "2101cad3-7cd4-1000-bdp95-d8c497176e7c",
  secondTitle: "Last connected",
  secondContent: "Aug 30, 2017 12:27:53 PM"
};
const SingleContent = () => (
  <div style={{ display: "flex" }}>
    <div style={{ paddingRight: "20px" }}>
      <Typography variant={"subtitle1"}>{data.firstTitle}</Typography>
      <Typography>{data.firstContent}</Typography>
    </div>
    <div>
      <Typography variant={"subtitle1"}>{data.secondTitle}</Typography>
      <Typography>{data.secondContent}</Typography>
    </div>
  </div>
);

export default (
  <HvListView
    semantic="sema4"
    title="Leaves appear wilted and scorched"
    subtitle="12 Jan 2018, 11:23 AM | L20"
    mediaPath={leaf}
    mediaTitle="Media title"
    mediaHeight={60}
    mediaWidth={120}
    isSelectable
    innerItemContent={<SingleContent />}
  />
);
