import React, { useState } from "react";

import { LogOut, OpenBook, Operation, Tool, User, Stop, Play } from "@hv/uikit-react-icons/dist";
import HvVerticalNavigation, { Action, Actions, Navigation } from "..";

export default {
  title: "Components/Navigation System/Vertical Navigation",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvVerticalNavigation } from '@hv/uikit-react-core/dist'",
    subcomponents: { Navigation, Actions, Action }
  },
  component: HvVerticalNavigation
};

export const Main = () => {
  const navigationData = [
    {
      id: "01",
      label: "System",
      icon: <Tool />,
      data: [
        {
          id: "01-01",
          label: "SCPodF",
          data: [
            {
              id: "01-01-01",
              label: "Compute"
            },
            {
              id: "01-01-02",
              label: "Storage"
            },
            {
              id: "01-01-03",
              label: "Ethernet"
            },
            {
              id: "01-01-04",
              label: "Fiber Channel",
              payload: { path: "/hello/world", params: { a: 2, b: "3" } }
            }
          ]
        }
      ]
    },
    {
      id: "02",
      label: "Administration",
      icon: <Operation />,
      data: [
        {
          id: "02-01",
          label: "Rest API"
        },
        {
          id: "02-02",
          label: "License"
        },
        {
          id: "02-03",
          label: "Log Bundle",
          data: [
            {
              id: "02-03-01",
              label: "Rest API"
            },
            {
              id: "02-03-02",
              label: "License"
            }
          ]
        },
        {
          id: "02-04",
          label: "Log Bundle"
        }
      ]
    }
  ];

  const [value, setValue] = React.useState("02-03-02");

  return (
    <HvVerticalNavigation id="sample1" isCollapsable={false}>
      <Navigation
        label="Example 1 navigation"
        selected={value}
        onClick={(event, data) => {
          console.log(data);
          setValue(data.id);
        }}
        data={navigationData}
      />

      <Actions>
        <Action
          label="User"
          icon={<User />}
          onClick={event => {
            console.log("Action 1", event);
          }}
        />
        <Action
          label="Documentation"
          icon={<OpenBook />}
          onClick={event => {
            console.log("Action 2", event);
          }}
        />
        <Action
          label="Logout"
          icon={<LogOut />}
          onClick={event => {
            console.log("Action 3", event);
          }}
        />
      </Actions>
    </HvVerticalNavigation>
  );
};

export const WithoutActions = () => {
  const navigationData = [
    {
      id: "01",
      label: "System",
      icon: <Tool />,
      data: [
        {
          id: "01-01",
          label: "SCPodF",
          data: [
            {
              id: "01-01-01",
              label: "Compute"
            },
            {
              id: "01-01-02",
              label: "Storage"
            },
            {
              id: "01-01-03",
              label: "Ethernet"
            },
            {
              id: "01-01-04",
              label: "Fiber Channel",
              payload: { path: "/hello/world", params: { a: 2, b: "3" } }
            }
          ]
        }
      ]
    },
    {
      id: "02",
      label: "Administration",
      icon: <Operation />,
      data: [
        {
          id: "02-01",
          label: "Rest API"
        },
        {
          id: "02-02",
          label: "License"
        },
        {
          id: "02-03",
          label: "Log Bundle",
          data: [
            {
              id: "02-03-01",
              label: "Rest API"
            },
            {
              id: "02-03-02",
              label: "License"
            }
          ]
        },
        {
          id: "02-04",
          label: "Log Bundle"
        }
      ]
    }
  ];

  const [value, setValue] = React.useState("02-03-02");

  return (
    <HvVerticalNavigation id="sample2" isCollapsable={false}>
      <Navigation
        label="Example 1 navigation"
        selected={value}
        onClick={(event, data) => {
          console.log(data);
          setValue(data.id);
        }}
        data={navigationData}
      />
    </HvVerticalNavigation>
  );
};

export const Collapsable = () => {
  const navigationData = [
    {
      id: "01",
      label: "System",
      icon: <Tool />,
      data: [
        {
          id: "01-01",
          label: "SCPodF",
          data: [
            {
              id: "01-01-01",
              label: "Compute"
            },
            {
              id: "01-01-02",
              label: "Storage"
            },
            {
              id: "01-01-03",
              label: "Ethernet"
            },
            {
              id: "01-01-04",
              label: "Fiber Channel",
              payload: { path: "/hello/world", params: { a: 2, b: "3" } }
            }
          ]
        }
      ]
    },
    {
      id: "02",
      label: "Administration",
      icon: <Operation />,
      data: [
        {
          id: "02-01",
          label: "Rest API"
        },
        {
          id: "02-02",
          label: "License"
        },
        {
          id: "02-03",
          label: "Log Bundle",
          data: [
            {
              id: "02-03-01",
              label: "Rest API"
            },
            {
              id: "02-03-02",
              label: "License"
            }
          ]
        },
        {
          id: "02-04",
          label: "Log Bundle"
        }
      ]
    }
  ];

  const [value, setValue] = useState("02-03-02");

  const sampleContainerStyle = {
    height: "600px"
  };

  return (
    <div style={sampleContainerStyle}>
      <HvVerticalNavigation id="sample3" isCollapsable>
        <Navigation
          label="Example 2 navigation"
          selected={value}
          onClick={(event, data) => {
            console.log(data);
            setValue(data.id);
          }}
          data={navigationData}
        />

        <Actions>
          <Action
            label="User"
            icon={<User />}
            onClick={event => {
              console.log("Action 1", event);
            }}
          />
          <Action
            label="Documentation"
            icon={<OpenBook />}
            onClick={event => {
              console.log("Action 2", event);
            }}
          />
          <Action
            label="Logout"
            icon={<LogOut />}
            onClick={event => {
              console.log("Action 3", event);
            }}
          />
        </Actions>
      </HvVerticalNavigation>
    </div>
  );
};

export const CollapseOnExit = () => {
  const [value, setValue] = useState("02-03-02");

  const navigationData = [
    {
      id: "01",
      label: "System",
      icon: <Play />,
      data: [
        {
          id: "01-01",
          label: "SCPodF",
          data: [
            {
              id: "01-01-01",
              label: "Compute",
              disabled: true
            },
            {
              id: "01-01-02",
              label: "Storage"
            },
            {
              id: "01-01-03",
              label: "Ethernet"
            },
            {
              id: "01-01-04",
              label: "Fiber Channel",
              path: "/hello/world",
              params: { a: 2, b: "3" }
            }
          ]
        }
      ]
    },
    {
      id: "02",
      label: "Administration",
      icon: <Stop />,
      data: [
        {
          id: "02-01",
          label: "Rest API"
        },
        {
          id: "02-02",
          label: "License"
        },
        {
          id: "02-03",
          label: "Log Bundle",
          data: [
            {
              id: "02-03-01",
              label: "Rest API"
            },
            {
              id: "02-03-02",
              label: "License"
            }
          ]
        },
        {
          id: "02-04",
          label: "Log Bundle"
        }
      ]
    }
  ];

  return (
    <div style={{ eight: "600px" }}>
      <HvVerticalNavigation
        id="sample4"
        navigationLabel="Example 2 navigation"
        isCollapsable
        closeOnExit
      >
        <Navigation
          label="Example 2 navigation"
          selected={value}
          onClick={(event, data) => {
            console.log(data);
            setValue(data.id);
          }}
          data={navigationData}
        />

        <Actions>
          <Action
            label="Action 1"
            icon={<Play />}
            onClick={event => {
              console.log("Action 1", event);
            }}
          />
          <Action
            label="Action 2"
            onClick={event => {
              console.log("Action 2", event);
            }}
          />
          <Action
            label="Action 3"
            icon={<Stop />}
            onClick={event => {
              console.log("Action 3", event);
            }}
          />
        </Actions>
      </HvVerticalNavigation>
    </div>
  );
};
