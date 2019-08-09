import React from "react";
import HvNavigationAnchors from "@hv/uikit-react-lab/dist/NavigationAnchors";

const options = [
  {
    label: "Option1",
    value: "Id1"
  },
  {
    label: "Option2",
    value: "Id2"
  },
  {
    label: "Option3",
    value: "Id3"
  },
  {
    label: "Option4",
    value: "Id4"
  }
];

export default (
  <div style={{ display: "flex" }}>
    <HvNavigationAnchors
      style={{ position: "auto", background: "red" }}
      href
      options={options}
      floating={false}
      scrollElementId="pageContentId"
    />
    <div
      id="pageContentId"
      style={{
        width: "800px",
        height: "600px",
        overflow: "auto"
      }}
    >
      <div
        id="Id1"
        style={{
          height: "400px",
          backgroundColor: "#D1D2D3",
          marginBottom: "20px"
        }}
      />
      <div
        id="Id2"
        style={{
          height: "150px",
          backgroundColor: "#D1D2D3",
          marginBottom: "20px"
        }}
      />
      <div
        id="Id3"
        style={{
          height: "500px",
          backgroundColor: "#D1D2D3",
          marginBottom: "20px"
        }}
      />
      <div
        id="Id4"
        style={{
          height: "300px",
          backgroundColor: "#D1D2D3",
          marginBottom: "20px"
        }}
      />
    </div>
  </div>
);
