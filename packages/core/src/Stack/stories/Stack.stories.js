import React, { useState } from "react";
import { withStyles } from "@mui/styles";

import { Tool, FavoriteSelected, Favorite } from "@hitachivantara/uikit-react-icons";
import {
  HvStack,
  HvRadioGroup,
  HvRadio,
  HvCheckBox,
  HvTypography,
  HvCard,
  HvCardHeader,
  HvCardContent,
  HvActionBar,
  HvActionsGeneric,
  HvToggleButton,
} from "../..";

export default {
  title: "Layout/Stack",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvStack } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.6.0",
  },
  component: HvStack,
};

const styles = (theme) => ({
  box: {
    display: "flex",
    border: `1px solid ${theme.hv.palette.semantic.sema15}`,
    backgroundColor: theme.hv.palette.semantic.sema7,
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    flexWrap: "wrap",
    "& > *": {
      margin: "0 10px 5px 0",
    },
  },
  divider: {
    width: "85%",
    height: 5,
    border: `1px solid ${theme.hv.palette.atmosphere.atmo5}`,
    borderRadius: 5,
    backgroundColor: theme.hv.palette.atmosphere.atmo4,
    alignSelf: "center",
  },
});

const Box = withStyles(styles)(({ classes, children }) => (
  <div className={classes.box}>{children}</div>
));

export const Main = () => {
  const [useDivider, setUseDivider] = useState(false);

  const handleDividerChange = (evt, val) => {
    setUseDivider(val);
  };
  return (
    <>
      <HvTypography>
        By default the Stack component will display a vertical stack of child elements in a column.
      </HvTypography>
      <br />
      <div style={{ width: 150, display: "flex", flexDirection: "row", gap: 20 }}>
        <HvCheckBox label="Include divider" onChange={handleDividerChange} />
        <HvStack direction="column" divider={useDivider} withNavigation>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </HvStack>
      </div>
    </>
  );
};

export const HorizontalStack = () => {
  const [useDivider, setUseDivider] = useState(false);

  const handleDividerChange = (evt, val) => {
    setUseDivider(val);
  };
  return (
    <>
      <HvTypography>
        A Stack is a one dimensional layout so it can also be arranged in a row.
      </HvTypography>
      <br />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <HvCheckBox label="Include divider" onChange={handleDividerChange} />
        <HvStack direction="row" divider={useDivider}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </HvStack>
      </div>
    </>
  );
};

export const Spacing = () => {
  const [spacing, setSpacing] = useState("xs");
  const [useDivider, setUseDivider] = useState(false);

  const handleSpacingChange = (evt, val) => {
    setSpacing(val);
  };

  const handleDividerChange = (evt, val) => {
    setUseDivider(val);
  };

  return (
    <>
      <HvTypography>
        This example illustrates how to configure the Stack to display vertically or horizontally
        depending on the screen width. In this case, for `xs` and `sm` widths the Stack will be
        vertical and for `md`, `lg` and `xl` it will be organized horizontally in a row.
        <br />
        <br />
        Also, the spacing between the stack elements can be set according to the Design System
        spacing guidelines:
      </HvTypography>
      <HvTypography variant="link">
        https://lumada-design.github.io/uikit/master/?path=/docs/foundation-theming--main#spacing
      </HvTypography>
      <br />
      <div
        style={{
          width: "300px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
          gap: 30,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignSelf: "flex-start" }}>
          <HvRadioGroup label="Spacing" name="spacing" onChange={handleSpacingChange}>
            <HvRadio label="xs" value="xs" checked />
            <HvRadio label="sm" value="sm" />
            <HvRadio label="md" value="md" />
            <HvRadio label="lg" value="lg" />
            <HvRadio label="xl" value="xl" />
          </HvRadioGroup>
          <hr />
          <HvCheckBox label="Include divider" onChange={handleDividerChange} />
        </div>
        <br />
        <br />
        <div>
          <HvStack direction={{ xs: "column", md: "row" }} spacing={spacing} divider={useDivider}>
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
            <Box>4</Box>
          </HvStack>
        </div>
      </div>
    </>
  );
};

export const CustomDivider = () => {
  const Divider = withStyles(styles)(({ classes }) => <div className={classes.divider} />);

  return (
    <>
      <HvTypography>
        The divider property can be a boolean in which case it defines whether or not to show the
        Material-UI Divider component. But it can also be a React node which allows custom dividers
        to be used.
      </HvTypography>
      <br />
      <div style={{ width: 150, display: "flex", flexDirection: "column", gap: 20 }}>
        <HvStack spacing="xs" divider={<Divider />}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </HvStack>
      </div>
    </>
  );
};

export const CustomDividerProps = () => {
  const [useDivider, setUseDivider] = useState(false);

  const handleDividerChange = (evt, val) => {
    setUseDivider(val);
  };
  return (
    <>
      <HvTypography>
        You can pass on different properties down to the Material-UI divider.
      </HvTypography>
      <br />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <HvCheckBox label="Include divider" onChange={handleDividerChange} />
        <HvStack
          direction="row"
          divider={useDivider}
          dividerProps={{ variant: "middle", light: true, component: "p" }}
        >
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </HvStack>
      </div>
    </>
  );
};

export const WithNavigation = () => {
  return (
    <>
      <HvTypography>
        When the stack elements are interactive navigation can be achieved by tabbing into the first
        element of the stack and using the arrow keys to jump between elements.
      </HvTypography>
      <br />
      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 275 }}>
        <HvStack
          withNavigation
          direction={{ xs: "column", md: "row" }}
          divider={false}
          dividerProps={{ variant: "middle", light: true, component: "p" }}
        >
          <HvCard bgcolor="atmo1" statusColor="sema4" style={{ width: 275 }} selectable>
            <HvCardHeader title="Card 1" icon={<Tool />} />
            <HvCardContent>
              <div style={{ marginTop: "20px" }}>
                <HvTypography variant="highlightText">Last connected</HvTypography>
                <HvTypography noWrap>Aug 30, 2017 12:27:53 PM</HvTypography>
              </div>
            </HvCardContent>
            <HvActionBar>
              <HvCheckBox
                onChange={() => true}
                checked
                value="value"
                inputProps={{ "aria-label": "leaf input" }}
              />
              <div style={{ width: 32, height: 32 }}>
                <HvToggleButton
                  aria-label="Star"
                  selectedIcon={<FavoriteSelected />}
                  notSelectedIcon={<Favorite />}
                />
              </div>
              <div style={{ flex: 1 }} />
              <HvActionsGeneric actions={[{ id: "view1", label: "View" }]} />
            </HvActionBar>
          </HvCard>
          <HvCard bgcolor="atmo1" statusColor="sema1" style={{ width: 275 }} selectable>
            <HvCardHeader title="Card 2" icon={<Tool />} />
            <HvCardContent>
              <div style={{ marginTop: "20px" }}>
                <HvTypography variant="highlightText">Last connected</HvTypography>
                <HvTypography noWrap>Aug 30, 2017 12:27:53 PM</HvTypography>
              </div>
            </HvCardContent>
            <HvActionBar>
              <HvCheckBox
                onChange={() => true}
                checked
                value="value"
                inputProps={{ "aria-label": "leaf input" }}
              />
              <div style={{ width: 32, height: 32 }}>
                <HvToggleButton
                  aria-label="Star"
                  selectedIcon={<FavoriteSelected />}
                  notSelectedIcon={<Favorite />}
                />
              </div>
              <div style={{ flex: 1 }} />
              <HvActionsGeneric actions={[{ id: "view2", label: "View" }]} />
            </HvActionBar>
          </HvCard>
          <HvCard bgcolor="atmo1" statusColor="sema15" style={{ width: 275 }} selectable>
            <HvCardHeader title="Card 3" icon={<Tool />} />
            <HvCardContent>
              <div style={{ marginTop: "20px" }}>
                <HvTypography variant="highlightText">Last connected</HvTypography>
                <HvTypography noWrap>Aug 30, 2017 12:27:53 PM</HvTypography>
              </div>
            </HvCardContent>
            <HvActionBar>
              <HvCheckBox
                onChange={() => true}
                checked
                value="value"
                inputProps={{ "aria-label": "leaf input" }}
              />
              <div style={{ width: 32, height: 32 }}>
                <HvToggleButton
                  aria-label="Star"
                  selectedIcon={<FavoriteSelected />}
                  notSelectedIcon={<Favorite />}
                />
              </div>
              <div style={{ flex: 1 }} />
              <HvActionsGeneric actions={[{ id: "view3", label: "View" }]} />
            </HvActionBar>
          </HvCard>
          <HvCard bgcolor="atmo1" statusColor="sema7" style={{ width: 275 }} selectable>
            <HvCardHeader title="Card 4" icon={<Tool />} />
            <HvCardContent>
              <div style={{ marginTop: "20px" }}>
                <HvTypography variant="highlightText">Last connected</HvTypography>
                <HvTypography noWrap>Aug 30, 2017 12:27:53 PM</HvTypography>
              </div>
            </HvCardContent>
            <HvActionBar>
              <HvCheckBox
                onChange={() => true}
                checked
                value="value"
                inputProps={{ "aria-label": "leaf input" }}
              />
              <div style={{ width: 32, height: 32 }}>
                <HvToggleButton
                  aria-label="Star"
                  selectedIcon={<FavoriteSelected />}
                  notSelectedIcon={<Favorite />}
                />
              </div>
              <div style={{ flex: 1 }} />
              <HvActionsGeneric actions={[{ id: "view4", label: "View" }]} />
            </HvActionBar>
          </HvCard>
        </HvStack>
      </div>
    </>
  );
};
