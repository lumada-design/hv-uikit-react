import React, { useState } from "react";
import { LocationPin, Map } from "@hv/uikit-react-icons/dist";
import { HvButton, HvMultiButton } from "../..";

export default {
  title: "Patterns/Multi Button",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvMultiButton } from '@hv/uikit-react-core/dist'"
  },
  component: HvMultiButton
};

export const Main = () => {
  const [selection, setSelection] = useState([0]);

  const handleChange = (event, idx) => {
    setSelection([idx]);
  };

  return (
    <div style={{ display: "flex" }}>
      <HvMultiButton
        selection={selection}
        onChange={handleChange}
        style={{ margin: "10px", width: "210px" }}
      >
        <HvButton id="mixed_map" startIcon={<Map />}>
          Map
        </HvButton>
        <HvButton id="mixed_satellite" startIcon={<LocationPin />}>
          Satellite
        </HvButton>
      </HvMultiButton>
      <HvMultiButton style={{ margin: "10px", width: "64px" }}>
        <HvButton id="icon_map" category="icon" aria-label="Map">
          <Map />
        </HvButton>
        <HvButton id="icon_satellite" category="icon" aria-label="Satellite">
          <LocationPin />
        </HvButton>
      </HvMultiButton>
    </div>
  );
};

export const OnlyLabels = () => {
  const [selection, setSelection] = useState([0]);

  const handleChange = (event, idx) => {
    setSelection([idx]);
  };

  return (
    <HvMultiButton selection={selection} onChange={handleChange} style={{ width: "210px" }}>
      <HvButton id="map">Map</HvButton>
      <HvButton id="satellite">Satellite</HvButton>
    </HvMultiButton>
  );
};

export const OnlyIcons = () => {
  const [selection, setSelection] = useState([0]);

  const handleChange = (event, idx) => {
    const newSelection = selection.includes(idx)
      ? selection.filter(v => v !== idx)
      : [...selection, idx];
    setSelection(newSelection);
  };

  return (
    <HvMultiButton selection={selection} onChange={handleChange} style={{ width: "64px" }}>
      <HvButton id="map" category="icon" aria-label="Map">
        <Map />
      </HvButton>
      <HvButton id="location" category="icon" aria-label="Location">
        <LocationPin />
      </HvButton>
    </HvMultiButton>
  );
};

export const MultipleSelection = () => {
  const [selection, setSelection] = useState([0, 2, 3, 5]);

  const handleChange = (event, idx) => {
    const newSelection = selection.includes(idx)
      ? selection.filter(v => v !== idx)
      : [...selection, idx];
    setSelection(newSelection);
  };

  return (
    <HvMultiButton selection={selection} onChange={handleChange} style={{ width: "224px" }}>
      <HvButton id="monday">M</HvButton>
      <HvButton id="tuesday">T</HvButton>
      <HvButton id="wednesday">W</HvButton>
      <HvButton id="thursday">T</HvButton>
      <HvButton id="friday">F</HvButton>
      <HvButton id="saturday">S</HvButton>
      <HvButton id="sunday">S</HvButton>
    </HvMultiButton>
  );
};

export const VerticalOrientation = () => {
  const [selection, setSelection] = useState([0]);
  const [selection2, setSelection2] = useState([0]);

  const handleChange = (event, idx) => {
    const newSelection = selection.includes(idx)
      ? selection.filter(v => v !== idx)
      : [...selection, idx];
    setSelection(newSelection);
  };

  const handleChange2 = (event, idx) => {
    setSelection2([idx]);
  };

  return (
    <div style={{ display: "flex" }}>
      <HvMultiButton
        vertical
        selection={selection}
        onChange={handleChange}
        style={{ margin: "10px", width: "32px" }}
      >
        <HvButton id="map" category="icon" aria-label="Map">
          <Map />
        </HvButton>
        <HvButton id="location" category="icon" aria-label="Location">
          <LocationPin />
        </HvButton>
        <HvButton id="map1" category="icon" aria-label="Map">
          <Map />
        </HvButton>
        <HvButton id="location1" category="icon" aria-label="Location">
          <LocationPin />
        </HvButton>
        <HvButton id="map2" category="icon" aria-label="Map">
          <Map />
        </HvButton>
        <HvButton id="location2" category="icon" aria-label="Location">
          <LocationPin />
        </HvButton>
      </HvMultiButton>
      <HvMultiButton
        vertical
        selection={selection2}
        onChange={handleChange2}
        style={{ margin: "10px", width: "120px" }}
      >
        <HvButton id="map10" startIcon={<Map />}>
          Map
        </HvButton>
        <HvButton id="location10" startIcon={<LocationPin />}>
          Location
        </HvButton>
        <HvButton id="map11" startIcon={<Map />}>
          Map 1
        </HvButton>
        <HvButton id="map11" startIcon={<LocationPin />}>
          Location 1
        </HvButton>
        <HvButton id="map12" startIcon={<Map />}>
          Map 2
        </HvButton>
        <HvButton id="map12" startIcon={<LocationPin />}>
          Location 2
        </HvButton>
      </HvMultiButton>
    </div>
  );
};

VerticalOrientation.story = {
  parameters: {
    docs: {
      storyDescription: "MultiButton combinations with vertical orientation and multiple selection"
    }
  }
};

export const EnforcedSelection = () => {
  const [selection, setSelection] = useState([0]);

  const handleChange = (event, idx) => {
    const newSelection = selection.includes(idx)
      ? selection.filter(v => v !== idx)
      : [...selection, idx];
    setSelection(newSelection);
  };

  return (
    <div style={{ width: "500px" }}>
      <HvMultiButton selection={selection} onChange={handleChange}>
        <HvButton id="map" selected startIcon={<Map />}>
          Map
        </HvButton>
        <HvButton id="satellite" startIcon={<LocationPin />}>
          Satellite
        </HvButton>
        <HvButton id="map1" startIcon={<Map />}>
          Chart
        </HvButton>
        <HvButton id="satellite1" startIcon={<LocationPin />}>
          Place
        </HvButton>
      </HvMultiButton>
    </div>
  );
};

EnforcedSelection.story = {
  parameters: {
    docs: {
      storyDescription:
        'MultiButton element set as enforced cannot be toggled - In this case "Map" cannot be toggled on/off'
    }
  }
};

export const MinimumSelection = () => {
  const [selection, setSelection] = useState([1, 2]);

  const handleChange = (event, idx) => {
    const newSelection = selection.includes(idx)
      ? selection.filter(v => v !== idx)
      : [...selection, idx];

    if (newSelection.length >= 2) setSelection(newSelection);
  };

  return (
    <div style={{ width: "800px" }}>
      <HvMultiButton selection={selection} onChange={handleChange}>
        <HvButton id="map" startIcon={<Map />}>
          Map
        </HvButton>
        <HvButton id="satellite" startIcon={<LocationPin />}>
          Satellite
        </HvButton>
        <HvButton id="map1" startIcon={<Map />}>
          Chart
        </HvButton>
        <HvButton id="satellite1" startIcon={<LocationPin />}>
          Location 1
        </HvButton>
        <HvButton id="satellite2" startIcon={<LocationPin />}>
          Location 2
        </HvButton>
        <HvButton id="satellite3" startIcon={<LocationPin />}>
          Location 3
        </HvButton>
      </HvMultiButton>
    </div>
  );
};

MinimumSelection.story = {
  parameters: {
    docs: {
      storyDescription:
        "Specify a number of minimum elements that must be active - in this case a minimum of 2"
    }
  }
};

export const MaximumSelection = () => {
  const [selection, setSelection] = useState([]);

  const handleChange = (event, idx) => {
    const newSelection = selection.includes(idx)
      ? selection.filter(v => v !== idx)
      : [...selection, idx];

    if (newSelection.length <= 2) setSelection(newSelection);
  };

  return (
    <div style={{ width: "800px" }}>
      <HvMultiButton selection={selection} onChange={handleChange}>
        <HvButton id="map" startIcon={<Map />}>
          Map
        </HvButton>
        <HvButton id="satellite" startIcon={<LocationPin />}>
          Satellite
        </HvButton>
        <HvButton id="map1" startIcon={<Map />}>
          Chart
        </HvButton>
        <HvButton id="satellite1" startIcon={<LocationPin />}>
          Location 1
        </HvButton>
        <HvButton id="satellite2" startIcon={<LocationPin />}>
          Location 2
        </HvButton>
        <HvButton id="satellite3" startIcon={<LocationPin />}>
          Location 3
        </HvButton>
      </HvMultiButton>
    </div>
  );
};

MaximumSelection.story = {
  parameters: {
    docs: {
      storyDescription:
        "Specify a number of maximum elements that can be selected - in this case a maximum of 2"
    }
  }
};

export const DynamicContent = () => {
  const buttons1 = (
    <>
      <HvButton id="map" selected startIcon={<Map />}>
        Map
      </HvButton>
      <HvButton id="satellite" startIcon={<LocationPin />}>
        Satellite
      </HvButton>
      <HvButton id="map1" selected startIcon={<Map />}>
        Chart
      </HvButton>
      <HvButton id="satellite1" startIcon={<LocationPin />}>
        Place
      </HvButton>
    </>
  );

  const buttons2 = (
    <>
      <HvButton id="f1">F1</HvButton>
      <HvButton id="f2" startIcon={<LocationPin />}>
        F2
      </HvButton>
    </>
  );

  const [buttons, setButtons] = useState(buttons1);

  return (
    <>
      <HvButton style={{ margin: 10 }} onClick={() => setButtons(buttons1)}>
        Initial Props
      </HvButton>
      <HvButton style={{ margin: 10 }} onClick={() => setButtons(buttons2)}>
        New Props
      </HvButton>
      <div style={{ width: "400px" }}>
        <HvMultiButton>{buttons}</HvMultiButton>
      </div>
    </>
  );
};

DynamicContent.story = {
  parameters: {
    docs: {
      storyDescription: "Changes MultiButton properties, triggered by an external agent"
    }
  }
};

export const Disabled = () => {
  const [selection, setSelection] = useState([0]);

  const handleChange = (event, idx) => {
    const newSelection = selection.includes(idx)
      ? selection.filter(v => v !== idx)
      : [...selection, idx];
    setSelection(newSelection);
  };

  return (
    <HvMultiButton
      selection={selection}
      onChange={handleChange}
      style={{ margin: "10px", width: "320px" }}
    >
      <HvButton selected>Avocado</HvButton>
      <HvButton disabled>Banana</HvButton>
      <HvButton>Carrot</HvButton>
      <HvButton startIcon={<Map />}>Map</HvButton>
    </HvMultiButton>
  );
};

export const FromDataset = () => {
  const dataset = ["Value 1", "Value 2", "Value 3", "Value 4"];
  const [selection, setSelection] = useState(dataset.map(() => false));

  const handleChange = (event, idx) => {
    const newSelection = [...selection];
    newSelection[idx] = !newSelection[idx];
    setSelection(newSelection);
  };

  return (
    <HvMultiButton style={{ margin: "10px", width: "320px" }}>
      {dataset.map((el, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <HvButton key={`mb${i}`} selected={selection[i]} onClick={evt => handleChange(evt, i)}>
          {el}
        </HvButton>
      ))}
    </HvMultiButton>
  );
};

FromDataset.story = {
  parameters: {
    docs: {
      storyDescription: "MultiButton children created through mapping a dataset"
    }
  }
};
