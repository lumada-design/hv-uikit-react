import React, { useMemo, useState } from "react";

import { LogOut, User } from "@hitachivantara/uikit-react-icons";

import {
  HvVerticalNavigation,
  HvVerticalNavigationTree,
  HvVerticalNavigationActions,
  HvVerticalNavigationAction,
} from "../..";

export default {
  title: "Components/Structure/Vertical Navigation",
  parameters: {
    componentSubtitle: null,
    usage:
      'import {\n  HvVerticalNavigation,\n  HvVerticalNavigationTree,\n  HvVerticalNavigationActions,\n  HvVerticalNavigationAction,\n} from "@hitachivantara/uikit-react-core";',
    subcomponents: {
      HvVerticalNavigationTree,
      HvVerticalNavigationActions,
      HvVerticalNavigationAction,
    },
    dsVersion: "3.4.0",
  },
  component: HvVerticalNavigation,
};

export const Main = () => {
  const navigationData = useMemo(
    () => [
      { id: "00", label: "Overview" },
      { id: "01", label: "Analytics", selectable: false },
      {
        id: "02",
        label: "Storage",
        data: [
          {
            id: "02-01",
            label: "Cloud",
            data: [
              {
                id: "02-01-01",
                label: "Servers",
              },
              {
                id: "02-01-02",
                label: "HCP Anywhere",
              },
              {
                id: "02-01-03",
                label: "This Computer",
                disabled: true,
              },
            ],
          },
        ],
      },
      {
        id: "03",
        label: "Administration",
        data: [
          {
            id: "03-01",
            label: "Rest API",
            data: [
              {
                id: "03-01-01",
                label: "Log Bundle",
              },
            ],
          },
        ],
      },
    ],
    []
  );

  const [value, setValue] = React.useState("00");

  return (
    <div style={{ display: "flex", width: 220, height: 530 }}>
      <HvVerticalNavigation id="sample1">
        <HvVerticalNavigationTree
          aria-label="Example 1 navigation"
          selected={value}
          onChange={(event, data) => {
            console.log(data);
            setValue(data.id);
          }}
          data={navigationData}
        />
        <HvVerticalNavigationActions>
          <HvVerticalNavigationAction label="Profile" icon={<User />} />
          <HvVerticalNavigationAction label="Logout" icon={<LogOut />} />
        </HvVerticalNavigationActions>
      </HvVerticalNavigation>
    </div>
  );
};

export const ExpandableList = () => {
  const navigationData = useMemo(
    () => [
      { id: "00", label: "Instalation Overview" },
      {
        id: "01",
        label: "Hardware",
        data: [
          {
            id: "01-01",
            label: "Ambient Monitoring",
          },
          {
            id: "01-02",
            label: "Server Status Summary",
          },
        ],
      },
      {
        id: "02",
        label: "System",
        data: [
          {
            id: "02-01",
            label: "Buckets",
          },
          {
            id: "02-02",
            label: "Admin Users",
          },
          {
            id: "02-03",
            label: "Log Bundle",
            data: [
              {
                id: "02-03-01",
                label: "Rest API",
              },
              {
                id: "02-03-02",
                label: "License",
              },
            ],
          },
          {
            id: "02-04",
            label: "Log Bundle",
          },
        ],
      },
      {
        id: "03",
        label: "Internal Logs",
        data: [
          {
            id: "03-01",
            label: "Buckets",
          },
          {
            id: "03-02",
            label: "Admin Users",
          },
          {
            id: "03-03",
            label: "Public Users",
          },
        ],
      },
    ],
    []
  );

  const [value, setValue] = React.useState("01-01");

  return (
    <div style={{ display: "flex", width: 220, height: 470 }}>
      <HvVerticalNavigation>
        <HvVerticalNavigationTree
          collapsible
          aria-label="Example 1 navigation"
          selected={value}
          onChange={(event, data) => {
            console.log(data);
            setValue(data.id);
          }}
          data={navigationData}
        />
        <HvVerticalNavigationActions>
          <HvVerticalNavigationAction label="Profile" icon={<User />} />
          <HvVerticalNavigationAction label="Logout" icon={<LogOut />} />
        </HvVerticalNavigationActions>
      </HvVerticalNavigation>
    </div>
  );
};

export const TreeviewMode = () => {
  const navigationData = useMemo(
    () => [
      { id: "00", label: "Instalation Overview" },
      {
        id: "01",
        label: "Hardware",
        data: [
          {
            id: "01-01",
            label: "Ambient Monitoring",
          },
          {
            id: "01-02",
            label: "Server Status Summary",
          },
        ],
      },
      {
        id: "02",
        label: "System",
        data: [
          {
            id: "02-01",
            label: "Buckets",
          },
          {
            id: "02-02",
            label: "Admin Users",
          },
          {
            id: "02-03",
            label: "Log Bundle",
            data: [
              {
                id: "02-03-01",
                label: "Rest API",
              },
              {
                id: "02-03-02",
                label: "License",
              },
            ],
          },
        ],
      },
    ],
    []
  );

  const [value, setValue] = React.useState("01-01");

  return (
    <div style={{ display: "flex", width: 220, height: 530 }}>
      <HvVerticalNavigation>
        <HvVerticalNavigationTree
          mode="treeview"
          collapsible
          defaultExpanded
          aria-label="Example 1 navigation"
          selected={value}
          onChange={(event, data) => {
            console.log(data);
            setValue(data.id);
          }}
          data={navigationData}
        />
        <HvVerticalNavigationActions>
          <HvVerticalNavigationAction label="Profile" icon={<User />} />
          <HvVerticalNavigationAction label="Logout" icon={<LogOut />} />
        </HvVerticalNavigationActions>
      </HvVerticalNavigation>
    </div>
  );
};

TreeviewMode.parameters = {
  docs: {
    description: {
      story:
        "Usage of the [Treeview Design Pattern](https://w3c.github.io/aria-practices/#TreeView) to build a navigation tree for a set of hierarchically organized web pages. " +
        "Instead of TAB, use the arrow keys to navigate through items. Enter performs its default action (i.e. open/close parent nodes, select otherwise).",
    },
  },
};

export const WithoutActions = () => {
  const navigationData = useMemo(
    () => [
      {
        id: "01",
        label: "System",
        data: [
          {
            id: "01-01",
            label: "SCPodF",
            data: [
              {
                id: "01-01-01",
                label: "Compute",
              },
              {
                id: "01-01-02",
                label: "Storage",
              },
              {
                id: "01-01-03",
                label: "Ethernet",
              },
              {
                id: "01-01-04",
                label: "Fiber Channel",
                payload: { path: "/hello/world", params: { a: 2, b: "3" } },
              },
            ],
          },
        ],
      },
      {
        id: "02",
        label: "Administration",
        data: [
          {
            id: "02-01",
            label: "Rest API",
          },
          {
            id: "02-02",
            label: "License",
          },
          {
            id: "02-03",
            label: "Some big text that shouldn't fit",
            data: [
              {
                id: "02-03-01",
                label: "Rest API",
              },
              {
                id: "02-03-02",
                label: "License",
              },
            ],
          },
          {
            id: "02-04",
            label: "Log Bundle",
          },
        ],
      },
    ],
    []
  );

  const [value, setValue] = React.useState("02-03-02");

  return (
    <div style={{ display: "flex", width: 220 }}>
      <HvVerticalNavigation id="sample2">
        <HvVerticalNavigationTree
          aria-label="Example 1 navigation"
          selected={value}
          onChange={(event, data) => {
            setValue(data.id);
          }}
          data={navigationData}
        />
      </HvVerticalNavigation>
    </div>
  );
};

export const Collapsable = () => {
  const navigationData = useMemo(
    () => [
      {
        id: "01",
        label: "System",
        data: [
          {
            id: "01-01",
            label: "SCPodF",
            data: [
              {
                id: "01-01-01",
                label: "Compute",
              },
              {
                id: "01-01-02",
                label: "Storage",
              },
              {
                id: "01-01-03",
                label: "Ethernet",
              },
              {
                id: "01-01-04",
                label: "Fiber Channel",
                payload: { path: "/hello/world", params: { a: 2, b: "3" } },
              },
            ],
          },
        ],
      },
      {
        id: "02",
        label: "Administration",
        data: [
          {
            id: "02-01",
            label: "Rest API",
          },
          {
            id: "02-02",
            label: "License",
          },
          {
            id: "02-03",
            label: "Log Bundle",
            data: [
              {
                id: "02-03-01",
                label: "Rest API",
              },
              {
                id: "02-03-02",
                label: "License",
              },
            ],
          },
          {
            id: "02-04",
            label: "Log Bundle",
          },
        ],
      },
    ],
    []
  );

  const [value, setValue] = useState("02-03-02");

  const sampleContainerStyle = {
    height: "600px",
  };

  return (
    <div style={sampleContainerStyle}>
      <HvVerticalNavigation id="sample3" isCollapsable>
        <HvVerticalNavigationTree
          aria-label="Example 2 navigation"
          selected={value}
          onChange={(event, data) => {
            setValue(data.id);
          }}
          data={navigationData}
        />
      </HvVerticalNavigation>
    </div>
  );
};

Collapsable.parameters = {
  docs: {
    description: {
      story:
        "This usage is no longer recommend and supported. This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component.",
    },
  },
};

export const CollapseOnExit = () => {
  const [value, setValue] = useState("02-03-02");

  const navigationData = useMemo(
    () => [
      {
        id: "01",
        label: "System",
        data: [
          {
            id: "01-01",
            label: "SCPodF",
            data: [
              {
                id: "01-01-01",
                label: "Compute",
                disabled: true,
              },
              {
                id: "01-01-02",
                label: "Storage",
              },
              {
                id: "01-01-03",
                label: "Ethernet",
              },
              {
                id: "01-01-04",
                label: "Fiber Channel",
                path: "/hello/world",
                params: { a: 2, b: "3" },
              },
            ],
          },
        ],
      },
      {
        id: "02",
        label: "Administration",
        data: [
          {
            id: "02-01",
            label: "Rest API",
          },
          {
            id: "02-02",
            label: "License",
          },
          {
            id: "02-03",
            label: "Log Bundle",
            data: [
              {
                id: "02-03-01",
                label: "Rest API",
              },
              {
                id: "02-03-02",
                label: "License",
              },
            ],
          },
          {
            id: "02-04",
            label: "Log Bundle",
          },
        ],
      },
    ],
    []
  );

  return (
    <div style={{ height: "600px" }}>
      <HvVerticalNavigation
        id="sample4"
        buttonAriaLabel="Example 2 navigation"
        isCollapsable
        closeOnExit
      >
        <HvVerticalNavigationTree
          arial-label="Example 2 navigation"
          selected={value}
          onChange={(event, data) => {
            setValue(data.id);
          }}
          data={navigationData}
        />
      </HvVerticalNavigation>
    </div>
  );
};

CollapseOnExit.parameters = {
  docs: {
    description: {
      story:
        "This usage is no longer recommend and supported. This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component.",
    },
  },
};
