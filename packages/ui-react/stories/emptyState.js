import React from "react";
import { storiesOf } from "@storybook/react";
import { HvEmptyState, HvShowCase, HvShowCaseHeader } from "../src";
import AlertIcon from "@hv-ui/icons/core/L-icons/Level3Alert96";
import BarChartIcon from "@hv-ui/icons/core/L-icons/BarChart96";

const containerStyle = {
  smContainer: {
    width: "400px",
    height: "200px",
    border: "1px solid"
  },
  mdContainer: {
    width: "670px",
    height: "200px",
    border: "1px solid"
  },
  lgContainer: {
    width: "800px",
    height: "200px",
    border: "1px solid"
  }
};

storiesOf("Empty State", module).add(`Empty State`, () => {
  return (
    <>
      <HvShowCaseHeader reviewed date="2019/Feb/25" />

      <HvShowCase title="Medium container">
        <div style={containerStyle.mdContainer}>
          <HvEmptyState
            title={"No data routes."}
            message={
              "After you start adding Data Routes, they will appear in here."
            }
            icon={<AlertIcon />}
          />
        </div>
      </HvShowCase>

      <HvShowCase title="Large container">
        <div style={containerStyle.lgContainer}>
          <HvEmptyState
            title={"No data routes."}
            message={
              "After you start adding Data Routes, they will appear in here."
            }
            icon={<AlertIcon />}
          />
        </div>
      </HvShowCase>

      <HvShowCase title="With large message">
        <div style={containerStyle.lgContainer}>
          <HvEmptyState
            title={"No data routes."}
            message={
              "After you start adding Data Routes, they will appear in here. " + 
              "After you start adding Data Routes, they will appear in here. " + 
              "After you start adding Data Routes, they will appear in here."
            }
            icon={<BarChartIcon />}
          />
        </div>
      </HvShowCase>
    </>
  );
});
