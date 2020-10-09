/* eslint-disable react/prop-types, no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import { wait, screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";
import React, { useState } from "react";

import {
  HvActionContainer,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvCardMedia,
  HvCheckBox,
  HvSwitch,
  HvTypography,
} from "../..";

import { AllComponents } from "./Card.stories";
import compressor from "./resources/compressor.png";

export default {
  title: "Tests/Card",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

// __________________________________
// Extended robot test scenarios

const SingleContent = ({ classes }) => {
  const data = {
    firstTitle: "ID",
    firstContent: "2101cad3-7cd4-1000-bdp95-d8c497176e7c",
    secondTitle: "Last connected",
    secondContent: "Aug 30, 2017 12:27:53 PM",
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

  const CustomSample = () => {
    const [toggleA, setToggleA] = useState(true);
    const [toggleB, setToggleB] = useState(true);
    return (
      <div style={{ width: "360px" }}>
        <HvCard
          id="cardId"
          aria-label="Asset Avatar L90 press enter or space to select this card"
          onClick={() => setToggleA(!toggleA)}
          selectable
        >
          <HvCardHeader
            title={toggleA ? "Asset Avatar L90" : "onClickAction()"}
            subheader={toggleB ? "Compressor" : "onChange()"}
          />
          <HvCardContent>
            <SingleContent classes={styles} />
          </HvCardContent>
          <HvActionContainer>
            <HvCheckBox
              onChange={() => setToggleB(!toggleB)}
              value="l90"
              inputProps={{ "aria-label": "l90 input" }}
            />
          </HvActionContainer>
        </HvCard>
      </div>
    );
  };

  return <CustomSample />;
};

export const CustomActionsNotSelectable = () => {
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

  const CustomSample = () => {
    const [toggleA, setToggleA] = useState(true);
    const [toggleB, setToggleB] = useState(true);
    return (
      <div style={{ width: "360px" }}>
        <HvCard
          id="cardId"
          aria-label="Asset Avatar L90 press enter or space to use this card main action"
          onClick={() => setToggleA(!toggleA)}
          selectable
        >
          <HvCardHeader
            title={toggleA ? "Asset Avatar L90" : "onClickAction()"}
            subheader={toggleB ? "Compressor" : "onChange()"}
          />
          <HvCardContent>
            <SingleContent classes={styles} />
          </HvCardContent>
          <HvActionContainer>
            <HvCheckBox
              onChange={() => setToggleB(!toggleB)}
              value="l90"
              inputProps={{ "aria-label": "l90 input" }}
            />
          </HvActionContainer>
        </HvCard>
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
        <HvCard id="controlled" selectable selected={checked}>
          <HvCardHeader title="Asset Avatar L90" subheader="Compressor" />
          <HvCardMedia component="img" image={compressor} height={186} title="Compressor" />
          <HvActionContainer>
            <HvCheckBox
              value="l90"
              checked={checked}
              inputProps={{ "aria-label": "Check asset" }}
            />
          </HvActionContainer>
        </HvCard>
      </div>
    </>
  );
};

// __________________________________
// Extended applitools test scenarios

// test scenario, card selected and dropdownmenu open
export const SelectedOpened = () => AllComponents();

SelectedOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByRole("checkbox"));
        fireEvent.click(screen.getByLabelText("Dropdown menu"));
        return wait(() => screen.getByText("Delete"));
      },
    },
  },
};
