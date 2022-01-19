import React from "react";
import HvBreadCrumb from "../BreadCrumb";

export default {
  title: "Components/Breadcrumb",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvBreadCrumb } from "@hitachivantara/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.4.0",
  },
  component: HvBreadCrumb,
};

export const Main = () => {
  const data = [
    { label: "Label 1", path: "route1" },
    { label: "Label 2", path: "route2" },
    { label: "Label 3", path: "route3" },
    { label: "Label 4", path: "route4" },
    { label: "Label 5", path: "route5" },
    { label: "Label 6", path: "route6" },
    { label: "Label 7", path: "route7" },
    { label: "Label 8", path: "route8" },
    { label: "Label 9", path: "route9" },
  ];

  return <HvBreadCrumb listRoute={data} id="breadcrumb1" aria-label="Breadcrumb" />;
};

export const LimitedToFivePaths = () => {
  const data = [
    { label: "Label 1", path: "route1" },
    { label: "Label 2", path: "route2" },
    { label: "Label 3", path: "route3" },
    { label: "Label 4", path: "route4" },
    { label: "Label 5", path: "route5" },
    { label: "Label 6", path: "route6" },
    { label: "Label 7", path: "route7" },
  ];

  return <HvBreadCrumb listRoute={data} maxVisible={5} id="breadcrumb2" aria-label="Breadcrumb" />;
};

LimitedToFivePaths.parameters = {
  docs: {
    description: { story: "Breadcrumb sample with 5 out of 7 paths visible." },
  },
};

export const LimitedToTwoPaths = () => {
  const data = [
    { label: "Label 1", path: "route1" },
    { label: "Label 2", path: "route2" },
    { label: "Label 3", path: "route3" },
    { label: "Label 4", path: "route4" },
    { label: "Label 5", path: "route5" },
    { label: "Label 6", path: "route6" },
    { label: "Label 7", path: "route7" },
    { label: "Label 8", path: "route8" },
  ];

  return <HvBreadCrumb listRoute={data} maxVisible={2} id="breadcrumb3" aria-label="Breadcrumb" />;
};

LimitedToTwoPaths.parameters = {
  docs: {
    description: { story: "Breadcrumb sample with 2 out of 8 paths visible, the minimum possible" },
  },
};

export const WithURL = () => (
  <HvBreadCrumb
    url="https://hitachivantara.sharepoint.com/sites/DesignSystem/Pattern%20Library/Home.aspx"
    id="breadcrumb4"
    aria-label="Breadcrumb"
  />
);

WithURL.parameters = {
  docs: {
    description: { story: "Breadcrumb sample that generates the paths using an URL." },
  },
};

export const WithURLLimited = () => {
  return (
    <HvBreadCrumb
      url="https://hitachivantara.sharepoint.com/sites/DesignSystem/Pattern%20Library/Home.aspx"
      id="breadcrumb5"
      maxVisible={2}
      aria-label="Breadcrumb"
    />
  );
};

WithURLLimited.parameters = {
  docs: {
    description: { story: "Breadcrumb sample that generates the limited paths using an URL." },
  },
};

export const WithClickEvents = () => {
  const data = [
    { label: "Label 1", path: "route1" },
    { label: "Label 2", path: "route2" },
    { label: "Label 3", path: "route3" },
    { label: "Label 4", path: "route4" },
    { label: "Label 5", path: "route5" },
    { label: "Label 6", path: "route6" },
    { label: "Label 7", path: "route7" },
    { label: "Label 8", path: "route8" },
    { label: "Label 9", path: "route9" },
  ];

  return (
    <HvBreadCrumb
      listRoute={data}
      id="breadcrumb6"
      aria-label="Breadcrumb"
      onClick={(event, elem) => console.log(elem.path)}
    />
  );
};

WithClickEvents.parameters = {
  docs: {
    description: { story: "Breadcrumb sample that has a onClick defined." },
  },
};
