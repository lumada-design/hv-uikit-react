import { useMemo, useState } from "react";
import {
  HvHeader,
  HvButton,
  HvHeaderActions,
  HvHeaderNavigation,
} from "@hitachivantara/uikit-react-core";
import { BarChart, Open, User, Deploy } from "@hitachivantara/uikit-react-icons";

import HvVerticalNavigation from "../VerticalNavigation";

const verticalNavigationData = [
  {
    id: "menu1",
    label: "Menu 1",
    path: "",
    icon: <Open />,
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
  title: "Lab/Vertical Navigation",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvVerticalNavigation } from "@hitachivantara/uikit-react-lab"',
  },
  component: HvVerticalNavigation,
  decorators: [(storyFn) => <div style={{ height: "600px" }}>{storyFn()}</div>],
};

export const Main = () => {
  const [selectedItem, setSelectedItem] = useState("menu1");

  const navigationChangeHandler = (event, item) => {
    setSelectedItem(item.id);
  };

  return (
    <HvVerticalNavigation
      data={verticalNavigationData}
      selected={selectedItem}
      topPosition={0}
      onNavigationChange={navigationChangeHandler}
      position="absolute"
    />
  );
};

export const ExampleWithDefaultHeader = () => {
  const [selectedItem, setSelectedItem] = useState("menu1");
  const headerNavigationData = useMemo(
    () => [
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
    ],
    []
  );

  const navigationChangeHandler = (event, item) => {
    setSelectedItem(item.id);
  };

  const Header = () => (
    <HvHeader position="absolute">
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
      <HvVerticalNavigation
        data={verticalNavigationData}
        selected={selectedItem}
        onNavigationChange={navigationChangeHandler}
        position="absolute"
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
      position: "absolute",
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
      <HvVerticalNavigation
        topPosition={headerHeight}
        data={verticalNavigationData}
        selected={selectedItem}
        onNavigationChange={navigationChangeHandler}
        position="absolute"
      />
    </>
  );
};
