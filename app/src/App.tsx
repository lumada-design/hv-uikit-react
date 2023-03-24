import {
  ds3,
  ds5,
  HvBox,
  HvButton,
  HvProvider,
  HvTooltip,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import "lib/i18n";
import Content from "generator/Content";
import { Sidebar } from "generator/Sidebar";
import GeneratorProvider from "generator/GeneratorContext";
import { useState } from "react";
import { Backwards, Forwards } from "@hitachivantara/uikit-react-icons";
import { css } from "@emotion/css";

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginRight: open ? 390 : 30,
        borderRadius: theme.radii.circle,
      }}
    >
      <HvBox
        sx={{
          position: "fixed",
          top: "calc(50% - 16px)",
          right: open ? 375 : 14,
          zIndex: theme.zIndices.tooltip,
          backgroundColor: theme.colors.atmo1,
          borderRadius: theme.radii.circle,
          boxShadow: "-10px 0px 10px 1px rgba(65,65,65,0.12)",
        }}
      >
        <HvTooltip
          title={
            <HvTypography>
              {open ? "Close Theme Generator" : "Open Theme Generator"}
            </HvTypography>
          }
        >
          <HvButton
            icon
            variant="secondaryGhost"
            onClick={() => setOpen((prev) => !prev)}
            classes={{
              root: css({ borderRadius: `${theme.radii.circle}!important` }),
            }}
          >
            {open ? <Forwards /> : <Backwards />}
          </HvButton>
        </HvTooltip>
      </HvBox>
      <HvProvider themes={[ds3, ds5]} theme="ds5">
        <GeneratorProvider>
          <div style={{ flexGrow: 1 }}>
            <Content />
          </div>
          <Sidebar open={open} />
        </GeneratorProvider>
      </HvProvider>
    </div>
  );
};

export default App;
