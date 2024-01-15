import React, { useState } from "react";
import { LocationPin, Map } from "@hitachivantara/uikit-react-icons";
import { HvButton, HvMultiButton } from "../..";

export default {
  title: "Components/Multi Button",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvMultiButton } from "@hitachivantara/uikit-react-core";',
  },
  component: HvMultiButton,
};

export const Main = () => (
  <div style={{ display: "flex" }}>
    <HvMultiButton
      type="mixed"
      style={{ margin: "10px", width: "210px" }}
      buttons={[
        { id: "mixed_map", value: "Map", icon: <Map />, selected: true },
        { id: "mixed_satellite", value: "Satellite", icon: <LocationPin /> },
      ]}
    />
    <HvMultiButton
      type="icon"
      style={{ margin: "10px", width: "64px" }}
      buttons={[
        { id: "icon_map", icon: <Map />, selected: true, "aria-label": "Map" },
        { id: "icon_satellite", icon: <LocationPin />, "aria-label": "Satellite" },
      ]}
    />
  </div>
);

export const OnlyLabels = () => (
  <HvMultiButton
    type="text"
    style={{ width: "210px" }}
    buttons={[
      { id: "map", value: "Map", selected: true },
      { id: "satellite", value: "Satellite" },
    ]}
  />
);

export const OnlyIcons = () => (
  <HvMultiButton
    multi
    type="icon"
    style={{ width: "64px" }}
    buttons={[
      { id: "map", value: "Map", icon: <Map />, selected: true },
      { id: "location", value: "Location", icon: <LocationPin /> },
    ]}
  />
);

export const MultipleSelection = () => (
  <HvMultiButton
    multi
    type="text"
    style={{ width: "224px" }}
    buttons={[
      { id: "monday", value: "M", selected: true },
      { id: "tuesday", value: "T" },
      { id: "wednesday", value: "W", selected: true },
      { id: "thursday", value: "T", selected: true },
      { id: "friday", value: "F" },
      { id: "saturday", value: "S", selected: true },
      { id: "sunday", value: "S" },
    ]}
  />
);

export const VerticalOrientation = () => (
  <div style={{ display: "flex" }}>
    <HvMultiButton
      multi
      vertical
      type="icon"
      style={{ margin: "10px", width: "32px" }}
      buttons={[
        { id: "map", value: "Map", icon: <Map />, selected: true },
        { id: "location", value: "Location", icon: <LocationPin /> },
        { id: "map1", value: "Map", icon: <Map /> },
        { id: "location1", value: "Location", icon: <LocationPin /> },
        { id: "map2", value: "Map", icon: <Map /> },
        { id: "location2", value: "Location", icon: <LocationPin /> },
      ]}
    />
    <HvMultiButton
      multi
      vertical
      type="mixed"
      style={{ margin: "10px", width: "120px" }}
      buttons={[
        { id: "map10", icon: <Map />, value: "Map", selected: true },
        { id: "location10", icon: <LocationPin />, value: "Location" },
        { id: "map11", icon: <Map />, value: "Map 1" },
        { id: "location11", icon: <LocationPin />, value: "Location 1" },
        { id: "map12", icon: <Map />, value: "Map 2" },
        { id: "location12", icon: <LocationPin />, value: "Location 2" },
      ]}
    />
  </div>
);

VerticalOrientation.story = {
  parameters: {
    docs: {
      storyDescription: "MultiButton combinations with vertical orientation and multiple selection",
    },
  },
};

export const EnforcedSelection = () => (
  <div style={{ width: "500px" }}>
    <HvMultiButton
      multi
      type="mixed"
      buttons={[
        { id: "map", value: "Map", icon: <Map />, selected: true, enforced: true },
        { id: "satellite", value: "Satellite", icon: <LocationPin /> },
        { id: "map1", value: "Chart", icon: <Map />, selected: true },
        { id: "satellite1", value: "Place", icon: <LocationPin /> },
      ]}
    />
  </div>
);

EnforcedSelection.story = {
  parameters: {
    docs: {
      storyDescription:
        'MultiButton element set as enforced cannot be toggled - In this case "Map" cannot be toggled on/off',
    },
  },
};

export const MinimumSelection = () => (
  <div style={{ width: "800px" }}>
    <HvMultiButton
      multi
      type="mixed"
      minSelection={2}
      buttons={[
        { id: "map", value: "Map", icon: <Map /> },
        { id: "satellite", value: "Satellite", icon: <LocationPin />, selected: true },
        { id: "map1", value: "Chart", icon: <Map />, selected: true },
        { id: "satellite1", value: "Location 1", icon: <LocationPin /> },
        { id: "satellite2", value: "Location 2", icon: <LocationPin /> },
        { id: "satellite3", value: "Location 3", icon: <LocationPin /> },
      ]}
    />
  </div>
);

MinimumSelection.story = {
  parameters: {
    docs: {
      storyDescription:
        "Specify a number of minimum elements that must be active - in this case a minimum of 2",
    },
  },
};

export const MaximumSelection = () => (
  <div style={{ width: "800px" }}>
    <HvMultiButton
      multi
      type="mixed"
      maxSelection={2}
      buttons={[
        { id: "map", value: "Map", icon: <Map /> },
        { id: "satellite", value: "Satellite", icon: <LocationPin /> },
        { id: "map1", value: "Chart", icon: <Map /> },
        { id: "satellite1", value: "Location 1", icon: <LocationPin /> },
        { id: "satellite2", value: "Location 2", icon: <LocationPin /> },
        { id: "satellite3", value: "Location 3", icon: <LocationPin /> },
      ]}
    />
  </div>
);

MaximumSelection.story = {
  parameters: {
    docs: {
      storyDescription:
        "Specify a number of maximum elements that can be selected - in this case a maximum of 2",
    },
  },
};

export const DynamicContent = () => {
  const btnStyle = {
    width: "120px",
    height: "32px",
    margin: "0 10px 30px 0",
  };

  const buttons1 = [
    { id: "map", value: "Map", icon: <Map />, selected: true, enforced: true },
    { id: "satellite", value: "Satellite", icon: <LocationPin /> },
    { id: "map1", value: "Chart", icon: <Map />, selected: true },
    { id: "satellite1", value: "Place", icon: <LocationPin /> },
  ];

  const buttons2 = [
    { id: "f1", value: "F1" },
    { id: "f2", value: "F2", icon: <LocationPin /> },
  ];

  function MultiButtonDynamic() {
    const [buttons, setButtons] = useState(buttons1);

    return (
      <>
        <HvButton style={btnStyle} onClick={() => setButtons(buttons1)}>
          Initial Props
        </HvButton>
        <HvButton style={btnStyle} onClick={() => setButtons(buttons2)}>
          New Props
        </HvButton>
        <div style={{ width: "400px" }}>
          <HvMultiButton multi type="mixed" buttons={buttons} />
        </div>
      </>
    );
  }

  return <MultiButtonDynamic />;
};

DynamicContent.story = {
  parameters: {
    docs: {
      storyDescription: "Changes MultiButton properties, triggered by an external agent",
    },
  },
};
