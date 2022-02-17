import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useResizeAware from "react-resize-aware";
import { makeStyles } from "@material-ui/core";
import { HvButton, HvLoading, HvTypography } from "../..";
import TableExample from "./TableExample";
import hexToRgbA from "../../utils/hexToRgbA";

/* eslint-disable react/prop-types */

export default {
  title: "Components/Loading",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvLoading } from "@hitachivantara/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.2.1",
  },
  component: HvLoading,
};

export const Main = () => (
  <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
    <HvLoading />
    <HvLoading label="Loading" />
    <HvLoading small />
  </div>
);

export const Buttons = () => {
  const ExampleBox = ({ label, category, color }) => {
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
        <HvTypography style={{ paddingBottom: "5px" }}>{label}</HvTypography>
        <HvButton category={category} onClick={activateTimer}>
          {(!isLoading && "Submit") || <HvLoading small hidden={!isLoading} color={color} />}
        </HvButton>
      </div>
    );
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <ExampleBox category="primary" label="Primary button" color="base1" />
      <ExampleBox category="secondary" label="Secondary button" />
      <ExampleBox category="ghost" label="Ghost button" />
    </div>
  );
};

export const Determinate = () => {
  const ExampleBox = ({ label, children }) => (
    <div>
      <HvTypography>{label}</HvTypography>
      <br />
      {children}
    </div>
  );

  const Progress = ({ label, inc }) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue(inc);
      }, 500);
      return () => clearInterval(interval);
    }, [inc]);

    return <HvLoading label={label?.(value)} />;
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <ExampleBox label="Determine w/ percentages">
        <Progress label={(v) => `${v}%`} inc={(v) => (v === 100 ? 0 : v + 5)} />
      </ExampleBox>
      <ExampleBox label="Determine w/ progress">
        <Progress label={(v) => `${v}M/75M`} inc={(v) => (v >= 75 ? 0 : Math.round(v + 5))} />
      </ExampleBox>
    </div>
  );
};

export const WithChildren = () => {
  const [loading, setLoading] = useState(true);

  const useStyles = makeStyles((theme) => ({
    loading: {
      width: "100%",
      height: "100%",
    },
    overlay: {
      position: "absolute",
      transition: "background-Color .2s ease",
      zIndex: -1,
    },
    blur: {
      backgroundColor: hexToRgbA(theme.hv.palette.atmosphere.atmo2),
      zIndex: theme.zIndex.drawer,
    },
  }));

  const LoadingContainer = ({ children, hidden, ...others }) => {
    const ref = useRef(null);
    const classes = useStyles();
    const [resizeListener, sizes] = useResizeAware();
    const [overlayPosition, setOverlayPosition] = useState({});

    useEffect(() => {
      if (children && ref.current) {
        const { clientHeight, clientWidth, offsetTop, offsetLeft } = ref.current;
        setOverlayPosition({
          top: offsetTop,
          left: offsetLeft,
          height: clientHeight,
          width: clientWidth,
        });
      }
    }, [children, sizes.width, sizes.height]);

    return (
      <>
        <div
          style={{ ...overlayPosition }}
          className={clsx(classes.overlay, { [classes.blur]: !hidden })}
        >
          <HvLoading classes={{ root: classes.loading }} hidden={hidden} {...others} />
        </div>
        {resizeListener}
        <div ref={ref}>{children}</div>
      </>
    );
  };

  return (
    <>
      <HvButton onClick={() => setLoading(!loading)}>{loading ? "Disable" : "Enable"}</HvButton>
      <LoadingContainer hidden={!loading}>
        <TableExample />
      </LoadingContainer>
    </>
  );
};

WithChildren.parameters = {
  docs: {
    description:
      "If a children is passed the component wraps it, creating an overlay. You can control whether it's hidden with the `hidden` prop.",
  },
};

export const Progress = () => {
  const ProgressBar = ({ inc, error }) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        if (value === 100 || (error && value === error)) {
          clearInterval(interval);
        } else {
          setValue(inc);
        }
      }, 50);
      return () => clearInterval(interval);
    }, [inc, value, error]);

    return <HvLoading progress value={value} error={value === error} />;
  };

  return (
    <div
      style={{
        display: "flex:",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          width: 400,
          margin: "auto",
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        <HvTypography variant="highlightText">Success</HvTypography>
        <ProgressBar label={(v) => `${v}%`} inc={(v) => v + 15} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          width: "400px",
          margin: "auto",
        }}
      >
        <HvTypography variant="highlightText">Error</HvTypography>
        <ProgressBar label={(v) => `${v}%`} inc={(v) => v + 5} error={30} />
      </div>
    </div>
  );
};
