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
    />
  );
};

export const ExampleWithDefaultHeader = () => {
  const [selectedItem, setSelectedItem] = useState("menu1");

  const navigationChangeHandler = (event, item) => {
    setSelectedItem(item.id);
  };

  const Header = () => (
    <HvHeader position="fixed">
      <HvHeaderNavigation data={headerNavigationData} />
      <HvHeaderActions>
        <HvButton icon>
          <User />
        </HvButton>
      </HvHeaderActions>
    </HvHeader>
  );

  return (
    <>
      <Header />
      <HvNavigationSlider
        data={verticalNavigationData}
        selected={selectedItem}
        onNavigationChange={navigationChangeHandler}
      />
    </>
  );
};

export const ExampleWithCustomHeader = () => {
  const headerHeight = 80;
  const [selectedItem, setSelectedItem] = useState("menu1");

  const navigationChangeHandler = (event, item) => {
    setSelectedItem(item.id);
  };

  const Header = () => {
    const styles = {
      width: "100%",
      left: 0,
      top: 0,
      position: "fixed",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: `${headerHeight}px`,
      backgroundColor: "lightblue",
    };
    return <header style={styles}>This is a custom header</header>;
  };

  return (
    <>
      <Header />
      <HvNavigationSlider
        topPosition={headerHeight}
        data={verticalNavigationData}
        selected={selectedItem}
        onNavigationChange={navigationChangeHandler}
      />
    </>
  );
};

export const ExampleWithToggle = () => {
  const [selectedItem, setSelectedItem] = useState("menu1");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const navigationChangeHandler = (event, item) => {
    setSelectedItem(item.id);
  };

  const Header = () => {
    return (
      <HvHeader position="fixed">
        <HvButton
          style={{ width: 32, height: 32 }}
          icon
          onClick={() => setIsPanelOpen((prevState) => !prevState)}
        >
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

  return (
    <>
      <Header />
      {isPanelOpen && (
        <HvNavigationSlider
          data={verticalNavigationData}
          selected={selectedItem}
          onNavigationChange={navigationChangeHandler}
        />
      )}
    </>
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

  const Header = () => {
    return (
      <HvHeader position="fixed">
        {!isMdUp && (
          <HvButton
            style={{ width: 32, height: 32 }}
            icon
            onClick={() => setIsPanelOpen((prevState) => !prevState)}
          >
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

  return (
    <>
      <Header />
      {isPanelOpen && !isMdUp && (
        <HvNavigationSlider
          data={headerNavigationData}
          selected={selectedItem}
          onNavigationChange={navigationChangeHandler}
        />
      )}
    </>
  );
};
