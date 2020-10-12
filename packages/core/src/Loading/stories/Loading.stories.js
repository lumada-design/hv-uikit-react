import React, { useEffect, useState } from "react";
import { HvButton, HvLoading, HvTypography } from "../..";
import TableExample from "./TableExample";

/* eslint-disable react/prop-types */

export default {
  title: "Components/Loading",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvLoading } from '@hv/uikit-react-core/dist'",

    dsVersion: "3.2.0",
  },
  component: HvLoading,
};

export const Main = () => {
  return (
    <div style={{ display: "flex" }}>
      <HvLoading isActive />
    </div>
  );
};

export const Indeterminate = () => {
  const ExampleBox = ({ text, children }) => (
    <div>
      <HvTypography>{text}</HvTypography>
      {children}
    </div>
  );
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <ExampleBox text="Large Loading">
        <HvLoading isActive />
      </ExampleBox>
      <ExampleBox text="Large Loading w/ label">
        <HvLoading isActive text="Loading" />
      </ExampleBox>
      <ExampleBox text="Small Loading">
        <HvLoading isActive small />
      </ExampleBox>
    </div>
  );
};

export const IndeterminateButtons = () => {
  const ExampleBox = ({ text, category, color }) => {
    const [isLoading, setIsLoading] = useState(false);

    const activateTimer = () => {
      if (!isLoading) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    };

    return (
      <div style={{ textAlign: "center" }}>
        <HvTypography style={{ paddingBottom: "5px" }}>{text}</HvTypography>
        <HvButton category={category} onClick={activateTimer}>
          {(!isLoading && "Submit") || <HvLoading small isActive={isLoading} color={color} />}
        </HvButton>
      </div>
    );
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <ExampleBox category="primary" text="Primary button" color="base1" />
      <ExampleBox category="secondary" text="Secondary button" />
      <ExampleBox category="ghost" text="Ghost button" />
    </div>
  );
};

export const Determinate = () => {
  const ExampleBox = ({ text, children }) => (
    <div>
      <HvTypography>{text}</HvTypography>
      {children}
    </div>
  );

  const Progress = ({ text, inc }) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue(inc);
      }, 500);
      return () => clearInterval(interval);
    }, [inc]);

    return <HvLoading isActive text={text?.(value)} />;
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <ExampleBox text="Determine w/ percentages">
        <Progress text={(v) => `${v}%`} inc={(v) => (v === 100 ? 0 : v + 5)} />
      </ExampleBox>
      <ExampleBox text="Determine w/ progress">
        <Progress text={(v) => `${v}M/75M`} inc={(v) => (v >= 75 ? 0 : Math.round(v + 5))} />
      </ExampleBox>
    </div>
  );
};

export const WithChildren = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <HvButton id="buttonLoading" onClick={() => setIsLoading(!isLoading)}>
        {isLoading ? "Deactivate" : "Activate"}
      </HvButton>
      <HvLoading isActive={isLoading} text="Loading">
        <div>
          <TableExample />
        </div>
      </HvLoading>
    </>
  );
};

WithChildren.story = {
  parameters: {
    docs: {
      storyDescription:
        "If a children is passed the component wraps it, creating a overlay. You can control whether it's active with the `isActive` prop.",
    },
  },
};
