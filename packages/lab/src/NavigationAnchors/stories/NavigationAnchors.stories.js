/* eslint-disable no-alert */
import * as React from "react";

import HvNavigationAnchors from "../index";

export default {
  title: "Lab/Navigation Anchors",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvNavigationAnchors } from "@hitachivantara/uikit-react-lab"',
  },
  component: HvNavigationAnchors,
};

export const Main = () => (
  <HvNavigationAnchors
    href
    options={[
      { label: "Option1 with a large label that needs a tooltip", value: "Value1" },
      { label: "Option2", value: "Value2" },
      { label: "Option3", value: "Value3" },
    ]}
  />
);

export const WithScroll = () => {
  const options = [
    { label: "Option1", value: "Id1" },
    { label: "Option2", value: "Id2" },
    { label: "Option3", value: "Id3" },
    { label: "Option4", value: "Id4" },
  ];

  return (
    <div style={{ display: "flex" }}>
      <HvNavigationAnchors href options={options} scrollElementId="pageContentId" />
      <div
        id="pageContentId"
        style={{
          width: "800px",
          height: "600px",
          overflow: "auto",
        }}
      >
        <div
          id="Id1"
          style={{
            height: "400px",
            backgroundColor: "#D1D2D3",
            marginBottom: "20px",
          }}
        />
        <div
          id="Id2"
          style={{
            height: "150px",
            backgroundColor: "#D1D2D3",
            marginBottom: "20px",
          }}
        />
        <div
          id="Id3"
          style={{
            height: "500px",
            backgroundColor: "#D1D2D3",
            marginBottom: "20px",
          }}
        />
        <div
          id="Id4"
          style={{
            height: "300px",
            backgroundColor: "#D1D2D3",
            marginBottom: "20px",
          }}
        />
      </div>
    </div>
  );
};

WithScroll.parameters = {
  docs: {
    description: {
      story: "Basic navigation anchors to provide a clickable area to show scrolling capabilities",
    },
  },
};
