/* eslint-disable react/prop-types */
import React, { useState } from "react";

import { HvCard, HvSwitch, HvTypography } from "../..";

import compressor from "./resources/compressor.png";

export default {
  title: "Tests/Card",
  parameters: {
    docs: {
      disable: true,
      page: null
    }
  }
};

// __________________________________
// Extended robot test scenarios

const SingleContent = ({ classes }) => {
  const data = {
    firstTitle: "ID",
    firstContent: "2101cad3-7cd4-1000-bdp95-d8c497176e7c",
    secondTitle: "Last connected",
    secondContent: "Aug 30, 2017 12:27:53 PM"
  };

  return (
    <>
      <div>
        <HvTypography variant="labelText">{data.firstTitle}</HvTypography>
        <HvTypography variant="normalText" className={classes.text}>
          {data.firstContent}
        </HvTypography>
      </div>
      <div style={{ marginTop: "15px" }}>
        <HvTypography variant="labelText">{data.secondTitle}</HvTypography>
        <HvTypography variant="normalText" className={classes.text}>
          {data.secondContent}
        </HvTypography>
      </div>
    </>
  );
};

export const CustomActionsSelectable = () => {
  const styles = theme => ({
    content: {
      padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`
    },
    item: {
      padding: `0 0 ${theme.hv.spacing.sm}px 0`
    },
    text: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  });

  const CustomSample = () => {
    const [toggleA, setToggleA] = useState(true);
    const [toggleB, setToggleB] = useState(true);
    return (
      <div style={{ width: "360px" }}>
        <HvCard
          headerTitle={toggleA ? "Asset Avatar L90" : "onClickAction()"}
          subheader={toggleB ? "Compressor" : "onChange()"}
          id="cardId"
          aria-label="Asset Avatar L90 press enter or space to select this card"
          checkboxProps={{
            value: "l90",
            inputProps: {
              "aria-label": "L90 input"
            }
          }}
          innerCardContent={<SingleContent classes={styles} />}
          onClick={() => setToggleA(!toggleA)}
          onChange={() => setToggleB(!toggleB)}
          isSelectable
          selectOnClickAction
        />
      </div>
    );
  };

  return <CustomSample />;
};

export const CustomActionsNotSelectable = () => {
  const styles = theme => ({
    content: {
      padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`
    },
    item: {
      padding: `0 0 ${theme.hv.spacing.sm}px 0`
    },
    text: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  });

  const CustomSample = () => {
    const [toggleA, setToggleA] = useState(true);
    const [toggleB, setToggleB] = useState(true);
    return (
      <div style={{ width: "360px" }}>
        <HvCard
          headerTitle={toggleA ? "Asset Avatar L90" : "onClickAction()"}
          subheader={toggleB ? "Compressor" : "onChange()"}
          id="cardId"
          innerCardContent={<SingleContent classes={styles} />}
          aria-label="Asset Avatar L90 press enter or space to use this card main action"
          checkboxProps={{
            value: "l90",
            inputProps: {
              "aria-label": "l90 input"
            }
          }}
          onClick={() => setToggleA(!toggleA)}
          onChange={() => setToggleB(!toggleB)}
          isSelectable
        />
      </div>
    );
  };

  return <CustomSample />;
};

export const Controlled = () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <HvSwitch
        id="controller"
        checked={checked}
        displayIconChecked
        onChange={() => setChecked(!checked)}
      />
      <div style={{ width: 360, paddingTop: 10 }}>
        <HvCard
          headerTitle="Asset Avatar L90"
          subheader="Compressor"
          id="controlled"
          isSelectable
          checked={checked}
          mediaPath={compressor}
          mediaHeight={186}
          mediaTitle="Compressor"
          checkboxProps={{
            inputProps: { "aria-label": "Check asset" }
          }}
        />
      </div>
    </>
  );
};
