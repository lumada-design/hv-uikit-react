import React from "react";
import { Add, Upload, Delete, Preview } from "@hitachivantara/uikit-react-icons";
import {
  HvActionBar,
  HvActionsGeneric,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvCardMedia,
  HvCardView,
  HvCheckBox,
  HvTypography,
} from "../../..";
import compressor from "../../../Card/stories/resources/compressor.png";
import leaf from "../../../Card/stories/resources/leaf.png";

/* eslint-disable react/prop-types */

export default {
  title: "Components/Asset Inventory/Card View",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvCardView } from "@hitachivantara/uikit-react-core"',
  },
  component: HvCardView,
  decorators: [
    (Story) => (
      <div style={{ margin: 10 }}>
        <Story />
      </div>
    ),
  ],
};

export const Main = () => {
  const renderer = (value, viewConfiguration) => (
    <HvCard
      id={value.id}
      bgcolor="atmo1"
      selectable={viewConfiguration.isSelectable}
      statusColor={value.semantic}
    >
      <HvCardHeader title={value.headerTitle} subheader={value.subtitle} />
      <HvCardMedia
        component="img"
        alt={value.subtitle}
        image={value.mediaPath}
        height={value.mediaHeight}
        title={value.subtitle}
        style={{ marginBottom: 10 }}
      />
      <HvCardContent>
        <HvTypography variant="highlightText">ID</HvTypography>
        <HvTypography noWrap>2101cad3-7cd4-1000-bdp95-d8c497176e7c</HvTypography>
      </HvCardContent>
      <HvCardContent>
        <HvTypography variant="highlightText">Last connected</HvTypography>
        <HvTypography noWrap>Jun 30, 2015 12:27:53 PM</HvTypography>
      </HvCardContent>
      <HvActionBar aria-label="Leaf">
        {viewConfiguration.isSelectable && (
          <HvCheckBox
            onChange={viewConfiguration.onSelection}
            value={value.checkboxValue}
            inputProps={{ "aria-label": `Select Asset ${value.id + 1}` }}
          />
        )}
        <div style={{ flex: 1 }} />
        <HvActionsGeneric
          actions={viewConfiguration.actions}
          maxVisibleActions={viewConfiguration.maxVisibleActions}
          actionsCallback={viewConfiguration.actionsCallback}
        />
      </HvActionBar>
    </HvCard>
  );

  // ------------------- Data ---------------------

  const values = (num = 10) => {
    const variations = [
      { semantic: "sema2", mediaPath: compressor, subtitle: "Compressor" },
      { semantic: "sema3", mediaPath: leaf, subtitle: "Leaf" },
    ];

    return [...Array(num).keys()].map((id) => ({
      id: `id_${id}`,
      headerTitle: `Asset Avatar ${id + 1}`,
      mediaHeight: 160,
      selected: false,
      ...variations[id % variations.length],
    }));
  };

  // --------------- Configuration ----------------
  const myActions = [
    { id: "post", label: "Add", icon: <Add />, disabled: false },
    { id: "get", label: "Preview", icon: <Preview color="atmo5" />, disabled: true },
    { id: "put", label: "Upload", icon: <Upload color="atmo5" />, disabled: true },
    { id: "delete", label: "Delete", icon: <Delete />, disabled: false },
  ];

  const viewConfiguration = {
    onSelection: (event) => console.log(event.target.value),
    breakpoints: { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 },
    isSelectable: true,
    actions: myActions,
    maxVisibleActions: 1,
    actionsCallback: (e, id, action) =>
      alert(`You have pressed card ${id} with action ${action.label}`),
  };

  return (
    <HvCardView
      id="id1"
      viewConfiguration={viewConfiguration}
      values={values()}
      renderer={renderer}
    />
  );
};
