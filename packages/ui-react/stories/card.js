import React from "react";
import { storiesOf } from "@storybook/react";
import FailureIcon from "@hv-ui/icons/core/S-icons/Level5Unsuccess16Color";
import IconInvalid from "@hv-ui/icons/core/S-icons/Level216Color";
import WarningIcon from "@hv-ui/icons/core/S-icons/Level416Color";
import Icon from "@hv-ui/icons/core/S-icons/Tool16";
import MultipleActionsWithMedia, {
  MultipleActionsWithMediaButtons
} from "./card/MultipleActionsWithMedia";
import MultipleActions, {
  MultipleActionsButtons
} from "./card/MultipleActions";
import {
  HvCard,
  HvCardHeader,
  HvCardFooter,
  HvCardContent,
  HvShowCase,
  HvShowCaseHeader,
  HvCardMedia,
} from "../src";
import Content from "./card/KPICard";
import SingleContent from "./card/Single";
import compressor from "./card/resources/compressor.png";
import leaf from "./card/resources/leaf.png";

const configuration = {
  title: "Leaves Appear wilted and scorched",
  subtitleLeft: "Just now",
  subtitleRight: "L20"
};

const configurationNoMedia = {
  title: "Advanced Server DS120",
  subtitle: "QTFCR27520007"
};

const separation = {
  margin: "80px",
  height: "600px",
  width: "357px"
};

const subtitleLeftStyle = {
  borderRight: "1px solid #dedede",
  paddingRight: "10px",
  marginRight: "10px"
};

storiesOf("Card", module)
  .add("Single Action", () => (
    <>
      <HvShowCaseHeader reviewed date="2018/Dec/28" />
      <HvShowCase title="Single Action" style={separation}>
        <HvCard
          HeaderTitle="Asset Avatar L90"
          Subheader="Compressor"
          InnerCardContent={<SingleContent />}
          mediaPath={compressor}
          mediaHeight={186}
        />
      </HvShowCase>
    </>
  ))
  .add("Card/multipleActions", () => (
    <>
      <HvShowCaseHeader reviewed date="2018/Dec/28" />
      <HvShowCase title="Card with all elements" style={separation}>
        <HvCard
          Icon={<FailureIcon />}
          HeaderTitle={configuration.title}
          Subheader={(
            <div>
              <span style={subtitleLeftStyle}>
                {configuration.subtitleLeft}
              </span>
              <span>{configuration.subtitleRight}</span>
            </div>
          )}
          InnerCardContent={<MultipleActionsWithMedia />}
          Actions={<MultipleActionsWithMediaButtons />}
          variant="error"
          isSelectable
          checkboxValue="value"
          mediaPath={leaf}
          mediaHeight={160}
          onSelect={event => console.log(`my value is ${event.target.value}`)}
        />
      </HvShowCase>
    </>
  ))
  .add("Card/composed/noHeaderNoContent", () => (
    <>
      <HvShowCaseHeader reviewed date="2018/Dec/28" />
      <HvShowCase title="Card with all elements" style={separation}>
        <HvCard variant="error">
          <HvCardMedia mediaPath={leaf} mediaHeight={160} />
          <HvCardFooter
            Actions={<MultipleActionsWithMediaButtons />}
            isSelectable
            onSelect={event => console.log(`my value is ${event.target.value}`)}
          />
        </HvCard>
      </HvShowCase>
    </>
  ))
  .add("Card/composed/HeaderContent", () => (
    <>
      <HvShowCaseHeader reviewed date="2018/Dec/28" />
      <HvShowCase title="Card with all elements" style={separation}>
        <HvCard variant="error">
          <HvCardHeader
            HeaderTitle="Asset Avatar L90"
            Subheader="Compressor"
          />
          <HvCardFooter
            Actions={<MultipleActionsWithMediaButtons />}
            isSelectable
            onSelect={event => console.log(`my value is ${event.target.value}`)}
          />
          <HvCardContent
            InnerCardContent={<MultipleActionsWithMedia />}
            needsBorder
          />
        </HvCard>
      </HvShowCase>
    </>
  ))
  .add("Card/multipleActions/nomedia", () => (
    <>
      <HvShowCaseHeader reviewed date="2018/Dec/28" />
      <HvShowCase title="Card with all elements" style={separation}>
        <HvCard
          HeaderTitle={configurationNoMedia.title}
          Subheader={configurationNoMedia.subtitle}
          InnerCardContent={<MultipleActions />}
          Actions={<MultipleActionsButtons />}
          variant="none"
          checkboxValue="value"
          onSelect={event => console.log(`my value is ${event.target.value}`)}
        />
      </HvShowCase>
    </>
  ))
  .add("Card/noAction", () => (
    <>
      <HvShowCaseHeader reviewed date="2018/Dec/28" />
      <HvShowCase title="Card with all elements" style={separation}>
        <HvCard
          HeaderTitle={configurationNoMedia.title}
          Subheader={configurationNoMedia.subtitle}
          InnerCardContent={<MultipleActions />}
          variant="none"
          checkboxValue="value"
          onSelect={event => console.log(`my value is ${event.target.value}`)}
        />
      </HvShowCase>
    </>
  ))
  .add("Card/onlyTitle", () => (
    <>
      <HvShowCaseHeader reviewed date="2018/Dec/28" />
      <HvShowCase title="Card with all elements" style={separation}>
        <HvCard
          HeaderTitle={configurationNoMedia.title}
          variant="none"
          checkboxValue="value"
          onSelect={event => console.log(`my value is ${event.target.value}`)}
        />
      </HvShowCase>
    </>
  ))
  .add("With KPI", () => (
    <>
      <HvShowCaseHeader reviewed date="2018/Dec/28" />
      <HvShowCase title="With KPI">
        <div
          style={{
            display: "flex",
            width: "1000px",
            justifyContent: "space-evenly"
          }}
        >
          <div style={{ width: "280px" }}>
            <HvCard
              Icon={<Icon />}
              HeaderTitle="Replace contaminated oil"
              InnerCardContent={<Content value="85" icon={<IconInvalid />} />}
              variant="info"
              isSelectable
              checkboxValue="value"
              onSelect={event =>
                console.log(`my value is ${event.target.value}`)
              }
            />
          </div>
          <div style={{ width: "280px" }}>
            <HvCard
              Icon={<Icon />}
              HeaderTitle="Replace contaminated oil"
              InnerCardContent={<Content value="45" icon={<WarningIcon />} />}
              variant="warning"
              isSelectable
              checkboxValue="value"
              onSelect={event =>
                console.log(`my value is ${event.target.value}`)
              }
            />
          </div>
          <div style={{ width: "280px" }}>
            <HvCard
              Icon={<Icon />}
              HeaderTitle="Replace contaminated oil"
              InnerCardContent={<Content value="19" icon={<FailureIcon />} />}
              variant="error"
              isSelectable
              checkboxValue="value"
              onSelect={event =>
                console.log(`my value is ${event.target.value}`)
              }
            />
          </div>
        </div>
      </HvShowCase>
    </>
  ));
