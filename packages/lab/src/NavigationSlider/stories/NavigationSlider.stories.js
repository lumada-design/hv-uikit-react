import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/styles";

import {
  HvHeader,
  HvButton,
  HvHeaderActions,
  HvHeaderNavigation,
} from "@hitachivantara/uikit-react-core";
import { BarChart, Open, User, Deploy, Menu } from "@hitachivantara/uikit-react-icons";

import HvNavigationSlider from "../NavigationSlider";

const headerNavigationData = [
  {
    id: "1",
    label: "Overview",
  },
  {
    id: "2",
    label: "Events",
  },

  {
    id: "3",
    label: "Asset",
  },
];

const verticalNavigationData = [
  {
    id: "menu1",
    label: "Menu 1",
    path: "",
    icon: <Open />,
    data: [
      {
        id: "menu1-1",
        label: "Menu 1-1",
        path: "",
        icon: <Open />,
        parent: null,
      },
      {
        id: "menu1-2",
        label: "Menu 1-2",
        path: "",
        icon: <BarChart />,
        data: [
          {
            id: "menu1-2-1",
            label: "Menu 1-2-1",
            path: "",
            icon: <Open />,
            parent: null,
          },
          {
            id: "menu1-2-2",
            label: "Menu 1-2-2",
            path: "",
            icon: <BarChart />,
            parent: null,
          },
          {
            id: "menu1-2-3",
            label: "Menu 1-2-3",
            path: "",
            icon: <Deploy />,
            parent: null,
          },
        ],
        parent: null,
      },
      {
        id: "menu1-3",
        label: "Menu 1-3",
        path: "",
        icon: <Deploy />,
        parent: null,
      },
    ],
    parent: null,
  },
  {
    id: "menu2",
    label: "Menu 2",
    path: "",
    icon: <BarChart />,
    parent: null,
  },
  {
    id: "menu3",
    label: "Menu 3",
    path: "",
    icon: <Deploy />,
    parent: null,
  },
];

export default {
  title: "Lab/Navigation Slider",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvNavigationSlider } from "@hitachivantara/uikit-react-lab"',
  },
  component: HvNavigationSlider,
  decorators: [(storyFn) => <div style={{ height: "600px" }}>{storyFn()}</div>],
};

export const Main = () => {
  const [selectedItem, setSelectedItem] = useState("menu1-3");

  const navigationChangeHandler = (event, item) => {
    setSelectedItem(item.id);
  };

  return (
    <HvNavigationSlider
      title="Main Example"
      data={verticalNavigationData}
      selected={selectedItem}
      topPosition={0}
      onNavigationChange={navigationChangeHandler}
      position="absolute"
    />
  );
};

const DefaultHeader = () => (
  <HvHeader position="absolute">
    <HvHeaderNavigation data={headerNavigationData} />
    <HvHeaderActions>
      <HvButton icon>
        <User />
      </HvButton>
    </HvHeaderActions>
  </HvHeader>
);

export const ExampleWithDefaultHeader = () => {
  const [selectedItem, setSelectedItem] = useState("menu1");

  const navigationChangeHandler = (event, item) => {
    setSelectedItem(item.id);
  };

  return (
    <>
      <DefaultHeader />
      <HvNavigationSlider
        data={verticalNavigationData}
        selected={selectedItem}
        onNavigationChange={navigationChangeHandler}
        position="absolute"
      />
    </>
  );
};

const CustomHeader = ({ headerHeight }) => {
  const styles = {
    width: "100%",
    left: 0,
    top: 0,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: `${headerHeight}px`,
    backgroundColor: "lightblue",
  };
  return <header style={styles}>This is a custom header</header>;
};

export const ExampleWithCustomHeader = () => {
  const headerHeight = 80;
  const [selectedItem, setSelectedItem] = useState("menu1");

  const navigationChangeHandler = (event, item) => {
    setSelectedItem(item.id);
  };

  return (
    <>
      <CustomHeader headerHeight={headerHeight} />
      <HvNavigationSlider
        topPosition={headerHeight}
        data={verticalNavigationData}
        selected={selectedItem}
        onNavigationChange={navigationChangeHandler}
        position="absolute"
      />
    </>
  );
};

const HeaderWithToggle = ({ onToggle }) => {
  return (
    <HvHeader position="absolute">
      <HvButton style={{ width: 32, height: 32 }} icon onClick={() => onToggle && onToggle()}>
        <Menu />
      </HvButton>

      <HvHeaderNavigation data={headerNavigationData} />
      <HvHeaderActions>
        <HvButton icon>
          <User />
        </HvButton>
      </HvHeaderActions>
    </HvHeader>
  );
};

export const ExampleWithToggle = () => {
  const [selectedItem, setSelectedItem] = useState("menu1");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const navigationChangeHandler = (event, item) => {
    setSelectedItem(item.id);
  };

  return (
    <>
      <HeaderWithToggle onToggle={() => setIsPanelOpen((prevState) => !prevState)} />
      {isPanelOpen && (
        <HvNavigationSlider
          data={verticalNavigationData}
          selected={selectedItem}
          onNavigationChange={navigationChangeHandler}
          position="absolute"
        />
      )}
    </>
  );
};

const HeaderResponsive = ({ onToggle, isMdUp }) => {
  return (
    <HvHeader position="absolute">
      {!isMdUp && (
        <HvButton style={{ width: 32, height: 32 }} icon onClick={() => onToggle && onToggle()}>
          <Menu />
        </HvButton>
      )}
      {isMdUp && <HvHeaderNavigation data={headerNavigationData} />}
      <HvHeaderActions>
        <HvButton icon>
          <User />
        </HvButton>
      </HvHeaderActions>
    </HvHeader>
  );
};

export const ExampleResponsive = () => {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState("1");
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const navigationChangeHandler = (event, item) => {
    setSelectedItem(item.id);
  };

  return (
    <>
      <HeaderResponsive
        onToggle={() => setIsPanelOpen((prevState) => !prevState)}
        isMdUp={isMdUp}
      />
      {isPanelOpen && !isMdUp && (
        <HvNavigationSlider
          data={headerNavigationData}
          selected={selectedItem}
          onNavigationChange={navigationChangeHandler}
          position="absolute"
        />
      )}
    </>
  );
};
