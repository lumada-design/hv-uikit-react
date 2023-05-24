import { css } from "@emotion/css";
import {
  BarChart,
  Cloud,
  Deploy,
  LogOut,
  Open,
  User,
} from "@hitachivantara/uikit-react-icons";
import { useMediaQuery, useTheme } from "@mui/material";
import { StoryObj } from "@storybook/react";
import { useEffect, useMemo, useState } from "react";
import {
  HvVerticalNavigation,
  HvVerticalNavigationAction,
  HvVerticalNavigationActions,
  HvVerticalNavigationHeader,
  HvVerticalNavigationProps,
  HvVerticalNavigationSlider,
  HvVerticalNavigationTreeView,
  HvVerticalNavigationTreeViewItem,
} from ".";
import {
  HvVerticalNavigationTree,
  NavigationData,
} from "./Navigation/Navigation";

export default {
  title: "Widgets/Vertical Navigation",
  component: HvVerticalNavigation,
  subcomponents: {
    HvVerticalNavigationHeader,
    HvVerticalNavigationTree,
    HvVerticalNavigationActions,
    HvVerticalNavigationAction,
    HvVerticalNavigationTreeView,
    HvVerticalNavigationTreeViewItem,
    HvVerticalNavigationSlider,
  },
};

export const Main: StoryObj<HvVerticalNavigationProps> = {
  args: {
    open: true,
    collapsedMode: "simple",
    slider: false,
  },
  argTypes: {},
  render: (args) => {
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
                  href: "https://www.hitachivantara.com/en-us/news.html",
                },
                {
                  id: "02-01-02",
                  label: "HCP Anywhere",
                  href: "/?path=/story/structure-vertical-navigation--main",
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

    const [value, setValue] = useState("00");
    return (
      <div style={{ display: "flex", width: 220, height: 530 }}>
        <HvVerticalNavigation
          id="sample1"
          open={args.open}
          slider={args.slider}
          collapsedMode={args.collapsedMode}
        >
          <HvVerticalNavigationTree
            aria-label="Example 1 navigation"
            selected={value}
            onChange={(event, data) => {
              console.log(data);
              if (data.id === "02-01-01") {
                event.preventDefault();
                event.stopPropagation();
              }
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
  },
};

export const TreeViewMode: StoryObj<HvVerticalNavigationProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Usage of the [Treeview Design Pattern](https://w3c.github.io/aria-practices/#TreeView) to build a navigation tree for a set of hierarchically organized web pages. " +
          "Instead of TAB, use the arrow keys to navigate through items. Enter performs its default action (i.e. open/close parent nodes, select otherwise).",
      },
    },
  },

  render: () => {
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

    const [value, setValue] = useState("01-01");

    return (
      <div style={{ display: "flex", width: 220, height: 530 }}>
        <HvVerticalNavigation>
          <HvVerticalNavigationTree
            mode="treeview"
            collapsible
            defaultExpanded
            aria-label="Example 3 navigation"
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
  },
};

export const WithoutActions: StoryObj<HvVerticalNavigationProps> = {
  render: () => {
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

    const [value, setValue] = useState("02-03-02");

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
  },
};

export const Collapsible: StoryObj<HvVerticalNavigationProps> = {
  render: () => {
    const [navigationDataState, setNavigationDataState] = useState<
      NavigationData[]
    >([]);

    useEffect(() => {
      setNavigationDataState([
        { id: "00", label: "Instalation Overview" },
        {
          id: "01",
          label: "Hardware",
          icon: <BarChart />,
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
      ]);
    }, []);

    const [value, setValue] = useState("01-01");

    const [show, setShow] = useState(false);

    const handleIsExpanded = () => {
      setShow(!show);
    };

    return (
      <div style={{ display: "flex", width: 220, height: 530 }}>
        <HvVerticalNavigation open={show} collapsedMode="simple">
          <HvVerticalNavigationHeader
            title="Menu"
            onCollapseButtonClick={handleIsExpanded}
            collapseButtonProps={{
              "aria-label": "collapseButton",
              "aria-expanded": show,
            }}
          />
          <HvVerticalNavigationTree
            collapsible
            defaultExpanded
            aria-label="Example 3 navigation"
            selected={value}
            onChange={(event, data) => {
              console.log(data);
              setValue(data.id);
            }}
            data={navigationDataState}
          />
          <HvVerticalNavigationActions>
            <HvVerticalNavigationAction label="Profile" icon={<User />} />
            <HvVerticalNavigationAction label="Logout" icon={<LogOut />} />
          </HvVerticalNavigationActions>
        </HvVerticalNavigation>
      </div>
    );
  },
};

export const CollapsibleIcons: StoryObj<HvVerticalNavigationProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "When collapsed in icon mode only the icons are visible, if an icon is not provided one will be generated based on the first letter of the label.",
      },
    },
  },

  render: () => {
    const [navigationDataState, setNavigationDataState] = useState<
      NavigationData[]
    >([]);

    useEffect(() => {
      setNavigationDataState([
        { id: "00", label: "Instalation Overview", icon: <Open /> },
        {
          id: "01",
          label: "Hardware",
          icon: <BarChart />,
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
          icon: <Deploy />,
          data: [
            {
              id: "02-01",
              label: "Buckets",
              icon: <Deploy />,
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
        {
          id: "03",
          label: "System 2",
          // icon: <Deploy />,
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
              label: "Log Bundle",
              data: [
                {
                  id: "03-03-01",
                  label: "Rest API",
                },
                {
                  id: "03-03-02",
                  label: "License",
                },
              ],
            },
          ],
        },
      ]);
    }, []);

    const [value, setValue] = useState("01-01");

    const [show, setShow] = useState(false);

    const handleIsExpanded = () => {
      setShow(!show);
    };

    return (
      <div style={{ display: "flex", width: 220, height: 530 }}>
        <HvVerticalNavigation open={show} collapsedMode="icon">
          <HvVerticalNavigationHeader
            title="Menu"
            onCollapseButtonClick={handleIsExpanded}
            collapseButtonProps={{
              "aria-label": "collapseButton",
              "aria-expanded": show,
            }}
          />
          <HvVerticalNavigationTree
            collapsible
            defaultExpanded
            aria-label="Example 3 navigation"
            selected={value}
            onChange={(event, data) => {
              console.log(data);
              setValue(data.id);
            }}
            data={navigationDataState}
          />
          <HvVerticalNavigationActions>
            <HvVerticalNavigationAction label="Profile" icon={<User />} />
            <HvVerticalNavigationAction label="Logout" icon={<LogOut />} />
          </HvVerticalNavigationActions>
        </HvVerticalNavigation>
      </div>
    );
  },
};

export const CollapsibleIconsWithoutSubItems: StoryObj<HvVerticalNavigationProps> =
  {
    parameters: {
      docs: {
        description: {
          story:
            "When collapsed in icon mode and no item has sub item, the panel will be have a smaller width.",
        },
      },
    },

    render: () => {
      const [navigationDataState, setNavigationDataState] = useState<
        NavigationData[]
      >([]);

      useEffect(() => {
        setNavigationDataState([
          { id: "00", label: "Instalation Overview", icon: <Open /> },
          {
            id: "01",
            label: "Hardware",
            icon: <BarChart />,
          },
          {
            id: "02",
            label: "System",
            icon: <Deploy />,
          },
          {
            id: "03",
            label: "System 2",
            icon: <Cloud />,
          },
        ]);
      }, []);

      const [value, setValue] = useState("01-01");

      const [show, setShow] = useState(false);

      const handleIsExpanded = () => {
        setShow(!show);
      };

      return (
        <div style={{ display: "flex", width: 220, height: 530 }}>
          <HvVerticalNavigation open={show} collapsedMode="icon">
            <HvVerticalNavigationHeader
              title="Menu"
              onCollapseButtonClick={handleIsExpanded}
              collapseButtonProps={{
                "aria-label": "collapseButton",
                "aria-expanded": show,
              }}
            />
            <HvVerticalNavigationTree
              collapsible
              defaultExpanded
              aria-label="Example 3 navigation"
              selected={value}
              onChange={(event, data) => {
                console.log(data);
                setValue(data.id);
              }}
              data={navigationDataState}
            />
            <HvVerticalNavigationActions>
              <HvVerticalNavigationAction label="Profile" icon={<User />} />
              <HvVerticalNavigationAction label="Logout" icon={<LogOut />} />
            </HvVerticalNavigationActions>
          </HvVerticalNavigation>
        </div>
      );
    },
  };

export const CollapsibleIconsWithCustomPopupStyles: StoryObj<HvVerticalNavigationProps> =
  {
    parameters: {
      docs: {
        description: {
          story:
            "Custom popup styles can be applied to the popup container by passing a style object to the popupStyles prop.",
        },
      },
    },

    render: () => {
      const [navigationDataState, setNavigationDataState] = useState<
        NavigationData[]
      >([]);

      useEffect(() => {
        setNavigationDataState([
          { id: "00", label: "Instalation Overview", icon: <Open /> },
          {
            id: "01",
            label: "Hardware",
            icon: <BarChart />,
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
            icon: <Deploy />,
            data: [
              {
                id: "02-01",
                label: "Buckets",
                icon: <Deploy />,
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
          {
            id: "03",
            label: "System 2",
            // icon: <Deploy />,
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
                label: "Log Bundle",
                data: [
                  {
                    id: "03-03-01",
                    label: "Rest API",
                  },
                  {
                    id: "03-03-02",
                    label: "License",
                  },
                ],
              },
            ],
          },
        ]);
      }, []);

      const [value, setValue] = useState("01-01");

      const [show, setShow] = useState(false);

      const handleIsExpanded = () => {
        setShow(!show);
      };

      const popupStyles = css({
        padding: "20px",
        backgroundColor: "coral",

        "& > div": {
          border: "3px solid orange",
        },
      });

      return (
        <div style={{ display: "flex", width: 220, height: 530 }}>
          <HvVerticalNavigation open={show} collapsedMode={"icon"}>
            <HvVerticalNavigationHeader
              title="Menu"
              onCollapseButtonClick={handleIsExpanded}
              collapseButtonProps={{
                "aria-label": "collapseButton",
                "aria-expanded": show,
              }}
            />
            <HvVerticalNavigationTree
              collapsible
              defaultExpanded
              aria-label="Example 3 navigation"
              selected={value}
              onChange={(event, data) => {
                console.log(data);
                setValue(data.id);
              }}
              data={navigationDataState}
              classes={{ navigationPopup: popupStyles }}
            />
            <HvVerticalNavigationActions>
              <HvVerticalNavigationAction label="Profile" icon={<User />} />
              <HvVerticalNavigationAction label="Logout" icon={<LogOut />} />
            </HvVerticalNavigationActions>
          </HvVerticalNavigation>
        </div>
      );
    },
  };

export const SliderMode: StoryObj<HvVerticalNavigationProps> = {
  render: () => {
    const [navigationDataState, setNavigationDataState] = useState<
      NavigationData[]
    >([]);

    useEffect(() => {
      setNavigationDataState([
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
          label: "Menu 2 with a very big name that should be truncated",
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
      ]);
    }, []);

    const [value, setValue] = useState("menu1-3");

    return (
      <div>
        <div style={{ display: "flex", width: 220, height: 530 }}>
          <HvVerticalNavigation open collapsedMode="simple" slider>
            <HvVerticalNavigationHeader title="Menu" />
            <HvVerticalNavigationTree
              collapsible
              defaultExpanded
              aria-label="Example 4 Slider Mode"
              selected={value}
              onChange={(event, data) => {
                console.log(data);
                setValue(data.id);
              }}
              data={navigationDataState}
            />
          </HvVerticalNavigation>
        </div>
      </div>
    );
  },
};

export const MobileNavigation: StoryObj<HvVerticalNavigationProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Example of an implementation of the Design System Mobile Navigation pattern: the Vertical Navigation component changes to Slider mode when the window is in a smaller size.",
      },
    },
  },
  render: () => {
    const [navigationDataState, setNavigationDataState] = useState<
      NavigationData[]
    >([]);

    useEffect(() => {
      setNavigationDataState([
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
      ]);
    }, []);

    const [value, setValue] = useState("menu1-3");

    const [show, setShow] = useState(true);

    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.down("sm"));

    const handleIsExpanded = () => {
      setShow(!show);
    };

    return (
      <div>
        <div style={{ display: "flex", width: 220, height: 530 }}>
          <HvVerticalNavigation
            open={show}
            collapsedMode="simple"
            slider={isXs}
          >
            <HvVerticalNavigationHeader
              title="Menu"
              onCollapseButtonClick={handleIsExpanded}
              collapseButtonProps={{
                "aria-label": "collapseButton",
                "aria-expanded": show,
              }}
            />
            <HvVerticalNavigationTree
              collapsible
              defaultExpanded
              aria-label="Example 4 navigation slider"
              selected={value}
              onChange={(event, data) => {
                console.log(data);
                setValue(data.id);
              }}
              data={navigationDataState}
            />
            <HvVerticalNavigationActions>
              <HvVerticalNavigationAction label="Profile" icon={<User />} />
              <HvVerticalNavigationAction label="Logout" icon={<LogOut />} />
            </HvVerticalNavigationActions>
          </HvVerticalNavigation>
        </div>
      </div>
    );
  },
};
