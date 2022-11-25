import React from "react";
import HvBreadCrumb from "../BreadCrumb";

export default {
  title: "Navigation/Breadcrumb",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvBreadCrumb } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.6.0",
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

export const WithLongLabels = () => {
  const data = [
    { label: "Label 1 with some long text", path: "route1" },
    { label: "Label 2 with some long text", path: "route2" },
    { label: "Label 3 with some long text", path: "route3" },
    { label: "Label 4 with some long text", path: "route4" },
    { label: "Label 5 with some long text", path: "route5" },
  ];

  return <HvBreadCrumb listRoute={data} id="breadcrumb7" aria-label="Breadcrumb" />;
};

WithLongLabels.parameters = {
  docs: {
    description: { story: "Breadcrumb with long labels." },
  },
};

export const WithOtherCharacters = () => {
  const data = [
    { label: "Label_1@[]", path: "route1" },
    { label: "Label_2-#$", path: "route2" },
    { label: "Label_3-/", path: "route3" },
    { label: "Label_4-*", path: "route4" },
    { label: "Label_5+ç", path: "route5" },
  ];

  return <HvBreadCrumb listRoute={data} id="breadcrumb8" aria-label="Breadcrumb" />;
};

WithOtherCharacters.parameters = {
  docs: {
    description: { story: "Breadcrumb with other type of characters." },
  },
};
