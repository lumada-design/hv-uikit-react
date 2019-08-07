import React from "react";
import HvListView from "@hv/uikit-react-lab/dist/ListView";
import leaf from "../../components/card/resources/leaf.png";
import HvTypography from "@hv/uikit-react-core/dist/Typography";

const data = {
  firstTitle: "ID",
  firstContent: "2101cad3-7cd4-1000-bdp95-d8c497176e7c",
  secondTitle: "Last connected",
  secondContent: "Aug 30, 2017 12:27:53 PM"
};
const SingleContent = () => (
  <div style={{ display: "flex" }}>
    <div style={{ paddingRight: "20px" }}>
      <div>
        <HvTypography variant="highlightText">{data.firstTitle}</HvTypography>
      </div>
      <div>
        <HvTypography>{data.firstContent}</HvTypography>
      </div>
    </div>
    <div>
      <div>
        <HvTypography variant="highlightText">{data.secondTitle}</HvTypography>
      </div>
      <div>
        <HvTypography>{data.secondContent}</HvTypography>
      </div>
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
