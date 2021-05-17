/* eslint-disable no-alert */
import * as React from "react";

import HvNavigationAnchors from "../index";

export default {
  title: "Tests/Navigation Anchors",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

export const DocumentScroll = () => {
  const options = [
    { label: "Option1", value: "Id1" },
    { label: "Option2", value: "Id2" },
    { label: "Option3", value: "Id3" },
    { label: "Option4", value: "Id4" },
  ];

  return (
    <>
      <HvNavigationAnchors style={{ position: "fixed" }} href options={options} offset={15} />
      <div id="pageContentId" style={{ marginLeft: 250 }}>
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
    </>
  );
};
