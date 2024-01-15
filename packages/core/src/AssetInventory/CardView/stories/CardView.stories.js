import React from "react";
import { withStyles } from "@material-ui/core";
import {
  Add,
  Upload,
  Delete,
  MoreOptionsVertical,
  Preview,
  Tool,
} from "@hitachivantara/uikit-react-icons";
import { HvButton, HvCard, HvCardFooter, HvCardMedia, HvCardView, HvTypography } from "../../..";
import compressor from "../../../Card/stories/resources/compressor.png";
import leaf from "../../../Card/stories/resources/leaf.png";

/* eslint-disable react/prop-types */

export default {
  title: "Components/Asset Inventory/Card View",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvCardView } from "@hitachivantara/uikit-react-core";',
  },
  component: HvCardView,
};

export const Main = () => {
  const values = (num = 10) => {
    const variations = [
      {
        semantic: "sema2",
        subheader: "Compressor",
        mediaPath: compressor,
        mediaTitle: "Compressor",
      },
      { semantic: "sema3", subheader: "Plant", mediaPath: leaf, mediaTitle: "Leaf" },
    ];

    return [...Array(num).keys()].map((id) => ({
      id: `id_${id + 1}`,
      headerTitle: `Asset Avatar ${id + 1}`,
      checkboxProps: { inputProps: { "aria-label": `Select Asset ${id + 1}` } },
      data: {
        firstContent: "2101cad3-7cd4-1000-bdp95-d8c497176e7c",
        secondContent: "Jun 30, 2015 12:27:53 PM",
      },
      mediaHeight: 186,
      selected: false,
      ...variations[id % variations.length],
    }));
  };

  // --------------- Configuration ----------------
  const myActions = [
    { id: "post", label: "Add", iconCallback: () => <Add />, disabled: false },
    { id: "get", label: "Preview", iconCallback: () => <Preview color="atmo7" />, disabled: true },
    { id: "put", label: "Upload", iconCallback: () => <Upload color="atmo7" />, disabled: true },
    { id: "delete", label: "Delete", iconCallback: () => <Delete />, disabled: false },
  ];

  const viewConfiguration = {
    onSelection: (event) => console.log(event.target.checked),
    breakpoints: { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 },
    isSelectable: true,
    actions: myActions,
    actionsCallback: (e, id, action) =>
      alert(`You have pressed card ${id} with action ${action.label}`),
  };

  return (
    <HvCardView id="id1" icon={<Tool />} values={values()} viewConfiguration={viewConfiguration} />
  );
};

export const DefaultRender = () => {
  const styles = (theme) => ({
    content: {
      padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`,
    },
    item: {
      padding: `0 0 ${theme.hv.spacing.sm}px 0`,
    },
    text: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  });

  // ---------------- InnerContent ----------------

  const InnerContent = ({ classes, values }) => (
    <>
      <div>
        <div>
          <HvTypography variant="labelText">ID</HvTypography>
        </div>
        <div>
          <HvTypography variant="normalText" className={classes.text}>
            {values.data.firstContent}
          </HvTypography>
        </div>
      </div>
      <div style={{ marginTop: "15px" }}>
        <div>
          <HvTypography variant="labelText">Last connected</HvTypography>
        </div>
        <div>
          <HvTypography variant="normalText" className={classes.text}>
            {values.data.secondContent}
          </HvTypography>
        </div>
      </div>
    </>
  );

  const innerContentFunc = (values) => <InnerContent classes={styles} values={values} />;

  // -------------------- Data --------------------

  const values = (num = 10) => {
    const variations = [
      {
        semantic: "sema2",
        subheader: "Compressor",
        mediaPath: compressor,
        mediaTitle: "Compressor",
      },
      { semantic: "sema3", subheader: "Plant", mediaPath: leaf, mediaTitle: "Leaf" },
    ];

    return [...Array(num).keys()].map((id) => ({
      id: `id_${id}`,
      headerTitle: `Asset Avatar ${id + 1}`,
      checkboxProps: { inputProps: { "aria-label": `Select Asset ${id + 1}` } },
      data: {
        firstContent: "2101cad3-7cd4-1000-bdp95-d8c497176e7c",
        secondContent: "Jun 30, 2015 12:27:53 PM",
      },
      mediaHeight: 186,
      selected: false,
      ...variations[id % variations.length],
    }));
  };

  // --------------- Configuration ----------------
  const myActions = [
    { id: "post", label: "Add", iconCallback: () => <Add />, disabled: false },
    { id: "get", label: "Preview", iconCallback: () => <Preview color="atmo7" />, disabled: true },
    { id: "put", label: "Upload", iconCallback: () => <Upload color="atmo7" />, disabled: true },
    { id: "delete", label: "Delete", iconCallback: () => <Delete />, disabled: false },
  ];

  const viewConfiguration = {
    onSelection: (event) => console.log(event.target.value),
    breakpoints: { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 },
    isSelectable: true,
    actions: myActions,
    actionsCallback: (e, id, action) =>
      alert(`You have pressed card ${id} with action ${action.label}`),
  };

  return (
    <HvCardView
      id="id1"
      icon={<Tool />}
      values={values()}
      viewConfiguration={viewConfiguration}
      innerCardContent={innerContentFunc}
    />
  );
};

export const CustomRender = () => {
  const styles = (theme) => ({
    root: {
      width: "100%",
      paddingBottom: "0px",
      borderLeft: `1px solid ${theme.palette.grey.plain}`,
      borderRight: `1px solid ${theme.palette.grey.plain}`,
    },
    media: {
      height: "100%",
      width: "100%",
    },
  });

  // ------------------ Render --------------------

  const CustomMedia = withStyles(styles)(HvCardMedia);

  const renderer = (value, viewConfiguration) => (
    <HvCard id={value.id}>
      <CustomMedia mediaPath={value.mediaPath} mediaHeight={160} title={value.mediaTitle} />
      <HvCardFooter
        actions={viewConfiguration.actions}
        maxVisibleActions={viewConfiguration.maxVisibleActions}
        actionsCallback={viewConfiguration.actionsCallback}
        isSelectable={viewConfiguration.isSelectable}
        onChange={viewConfiguration.onSelection}
        checkboxProps={{
          value: value.checkboxValue,
          inputProps: { "aria-label": `Select Asset ${value.id + 1}` },
        }}
      />
    </HvCard>
  );

  // ------------------- Data ---------------------

  const values = (num = 10) => {
    const variations = [
      {
        semantic: "sema2",
        subheader: "Compressor",
        mediaPath: compressor,
        mediaTitle: "Compressor",
      },
      { semantic: "sema3", subheader: "Plant", mediaPath: leaf, mediaTitle: "Leaf" },
    ];

    return [...Array(num).keys()].map((id) => ({
      id: `id_${id}`,
      headerTitle: `Asset Avatar ${id + 1}`,
      mediaHeight: 186,
      selected: false,
      ...variations[id % variations.length],
    }));
  };

  // --------------- Configuration ----------------
  const myActions = [
    { id: "post", label: "Add", iconCallback: () => <Add />, disabled: false },
    { id: "get", label: "Preview", iconCallback: () => <Preview color="atmo7" />, disabled: true },
    { id: "put", label: "Upload", iconCallback: () => <Upload color="atmo7" />, disabled: true },
    { id: "delete", label: "Delete", iconCallback: () => <Delete />, disabled: false },
  ];

  const viewConfiguration = {
    onSelection: (event) => console.log(event.target.value),
    breakpoints: { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 },
    isSelectable: true,
    actions: myActions,
    actionsCallback: (e, id, action) =>
      alert(`You have pressed card ${id} with action ${action.label}`),
  };

  return (
    <HvCardView
      id="id1"
      icon={<Tool />}
      viewConfiguration={viewConfiguration}
      values={values()}
      renderer={renderer}
    />
  );
};

export const CustomRenderAndActions = () => {
  const styles = (theme) => ({
    root: {
      width: "100%",
      paddingBottom: "0px",
      borderLeft: `1px solid ${theme.palette.grey.plain}`,
      borderRight: `1px solid ${theme.palette.grey.plain}`,
    },
    media: {
      height: "100%",
      width: "100%",
    },
  });

  const CustomMedia = withStyles(styles)(HvCardMedia);

  const Actions = ({ classes }) => (
    <>
      <HvButton category="ghost">
        <Upload />
        Update
      </HvButton>
      <HvButton category="ghost" className={classes.smallButton} aria-label="More...">
        <MoreOptionsVertical />
      </HvButton>
    </>
  );

  const actionsStyles = (theme) => ({
    smallButton: {
      width: "32px",
      minWidth: "32px",
      padding: 0,
      color: theme.palette.grey.inspire,
      "& span": {
        color: theme.palette.grey.inspire,
      },
    },
  });

  const StyledActions = withStyles(actionsStyles)(Actions);

  const renderer = (value, viewConfiguration) => (
    <HvCard id={value.id}>
      <CustomMedia mediaPath={value.mediaPath} mediaHeight={160} title={value.mediaTitle} />
      <HvCardFooter
        actions={<StyledActions />}
        isSelectable={viewConfiguration.isSelectable}
        onChange={viewConfiguration.onSelection}
        checkboxProps={{
          value: value.checkboxValue,
          inputProps: { "aria-label": `Select Asset ${value.id + 1}` },
        }}
      />
    </HvCard>
  );

  // ------------------- Data ---------------------

  const values = (num = 10) => {
    const variations = [
      {
        semantic: "sema2",
        subheader: "Compressor",
        mediaPath: compressor,
        mediaTitle: "Compressor",
      },
      { semantic: "sema3", subheader: "Plant", mediaPath: leaf, mediaTitle: "Leaf" },
    ];

    return [...Array(num).keys()].map((id) => ({
      id: `id_${id}`,
      headerTitle: `Asset Avatar ${id + 1}`,
      mediaHeight: 186,
      selected: false,
      ...variations[id % variations.length],
    }));
  };

  // --------------- Configuration ----------------
  const viewConfiguration = {
    onSelection: (event) => alert(event.target.value),
    breakpoints: { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 },
    isSelectable: true,
  };

  return (
    <HvCardView
      id="id1"
      icon={<Tool />}
      viewConfiguration={viewConfiguration}
      values={values()}
      renderer={renderer}
    />
  );
};
