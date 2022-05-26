import React, { useState } from "react";
import { Alert } from "@hitachivantara/uikit-react-icons";
import { HvBadge, HvButton } from "../..";

const container = {
  width: 400,
  display: "flex",
  justifyContent: "space-between",
};

export default {
  title: "Components/Display/Badge",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvBadge } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.6.0",
  },
  component: HvBadge,
};

export const Main = () => (
  <>
    <HvBadge id="badge1" count={1} />
    <HvBadge id="badge2" showCount count={8} />
    <HvBadge id="badge3" showCount count={22} />
    <HvBadge id="badge4" showCount count={100} />
    <HvBadge id="labelBadge1" label="100%" />
  </>
);

Main.decorators = [(storyFn) => <div style={{ ...container, width: 300 }}>{storyFn()}</div>];

export const WithIcon = () => (
  <>
    <HvBadge id="badge5" count={0} icon={<Alert />} />
    <HvBadge id="badge6" count={1} icon={<Alert />} />
    <HvBadge id="badge7" showCount count={8} icon={<Alert />} />
    <HvBadge id="badge8" showCount count={88} icon={<Alert />} />
    <HvBadge id="badge9" showCount count={888} icon={<Alert />} />
    <HvBadge id="labelBadge3" label="100%" icon={<Alert />} />
  </>
);

WithIcon.decorators = [(storyFn) => <div style={{ ...container, width: 500 }}>{storyFn()}</div>];

WithIcon.parameters = {
  docs: {
    description: { story: "Badge sample that uses a custom icon." },
  },
};

export const WithText = () => (
  <>
    <HvBadge id="badge10" count={0} text="Events" textVariant="sTitle" />
    <HvBadge id="badge11" count={1} text="Events" textVariant="sTitle" />
    <HvBadge id="badge12" showCount count={8} text="Events" textVariant="sTitle" />
    <HvBadge id="badge13" showCount count={88} text="Events" textVariant="sTitle" />
    <HvBadge id="badge14" showCount count={888} text="Events" textVariant="sTitle" />
    <HvBadge id="labelBadge5" label="100%" text="Events" textVariant="sTitle" />
  </>
);

WithText.decorators = [(storyFn) => <div style={{ ...container, width: 650 }}>{storyFn()}</div>];

WithText.parameters = {
  docs: {
    description: { story: "Badge sample using only text." },
  },
};

export const WithState = () => {
  const [count, setCount] = useState(1);
  const addCount = () => setCount(count * 2);

  return (
    <>
      <HvButton onClick={addCount}>Double Value</HvButton>
      <p />
      <HvBadge id="badge15" showCount count={count} text="Events" textVariant="sTitle" />
    </>
  );
};

WithState.parameters = {
  docs: {
    description: { story: "Badge sample using react hooks to set the number of events." },
  },
};
