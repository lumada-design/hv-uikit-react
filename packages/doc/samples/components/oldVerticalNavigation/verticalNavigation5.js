import React from "react";
import HvVerticalNavigation from "@hv/uikit-react-core/dist/OldVerticalNavigation";
import {
  Calendar,
  Components,
  Help,
  LineChart,
  Machine,
  Plane,
  Settings,
  User
} from "@hv/uikit-react-icons/dist";

const data = {
  showSearch: true,
  data: [
    {
      label: "Advanced server DS120",
      iconCallback: ({ isSelected }) => <User color={isSelected ? "atmo1" : undefined} />,
      path: "route3"
    },
    {
      label: "Advanced server DS121",
      iconCallback: ({ isSelected }) => <Calendar color={isSelected ? "atmo1" : undefined} />
    },
    {
      label: "Advanced server DS122",
      showNavIcon: true,
      iconCallback: ({ isSelected }) => <LineChart color={isSelected ? "atmo1" : undefined} />,
      subData: {
        showSearch: false,
        data: [
          {
            label: "Variant Y-242",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            path: "route3"
          },
          {
            label: "Variant Y-243",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          },
          {
            label: "Variant Y-245",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            path: "route3"
          },
          {
            label: "Variant Y-246",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          },
          {
            label: "Variant Y-247",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            path: "route3"
          },
          {
            label: "Variant Y-248",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          },
          {
            label: "Variant Y-249",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            path: "route3"
          },
          {
            label: "Variant Y-250",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          },
          {
            label: "Variant Y-251",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            path: "route3"
          },
          {
            label: "Variant Y-252",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          },
          {
            label: "Variant Y-253",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            path: "route3"
          },
          {
            label: "Variant Y-254",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          },
          {
            label: "Variant Y-255",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            path: "route3"
          },
          {
            label: "Variant Y-256",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          },
          {
            label: "Variant Y-257",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            path: "route3"
          },
          {
            label: "Variant Y-258",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          },
          {
            label: "Variant Y-259",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            path: "route3"
          },
          {
            label: "Variant Y-260",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          },
          {
            label: "Variant Y-261",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            path: "route3"
          },
          {
            label: "Variant Y-262",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      iconCallback: ({ isSelected }) => <Plane color={isSelected ? "atmo1" : undefined} />,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  iconCallback: ({ isSelected }) => (
                    <Machine color={isSelected ? "atmo1" : undefined} />
                  )
                },
                {
                  label: "Component HS-921",
                  iconCallback: ({ isSelected }) => (
                    <Machine color={isSelected ? "atmo1" : undefined} />
                  )
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          }
        ]
      }
    },
    {
      label: "Advanced server DS140",
      iconCallback: ({ isSelected }) => <User color={isSelected ? "atmo1" : undefined} />,
      path: "route3"
    },
    {
      label: "Advanced server DS145",
      iconCallback: ({ isSelected }) => <Calendar color={isSelected ? "atmo1" : undefined} />
    },
    {
      label: "Advanced server DS250",
      showNavIcon: true,
      iconCallback: ({ isSelected }) => <LineChart color={isSelected ? "atmo1" : undefined} />,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant Y-242",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            path: "route3"
          },
          {
            label: "Variant Y-244",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      iconCallback: ({ isSelected }) => <Plane color={isSelected ? "atmo1" : undefined} />,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  iconCallback: ({ isSelected }) => (
                    <Machine color={isSelected ? "atmo1" : undefined} />
                  )
                },
                {
                  label: "Component HS-921",
                  iconCallback: ({ isSelected }) => (
                    <Machine color={isSelected ? "atmo1" : undefined} />
                  )
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          }
        ]
      }
    },
    {
      label: "Advanced server DS120",
      iconCallback: ({ isSelected }) => <User color={isSelected ? "atmo1" : undefined} />,
      path: "route3"
    },
    {
      label: "Advanced server DS122",
      iconCallback: ({ isSelected }) => <Calendar color={isSelected ? "atmo1" : undefined} />
    },
    {
      label: "Advanced server DS250",
      showNavIcon: true,
      iconCallback: ({ isSelected }) => <LineChart color={isSelected ? "atmo1" : undefined} />,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant Y-242",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            path: "route3"
          },
          {
            label: "Variant Y-244",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      iconCallback: ({ isSelected }) => <Plane color={isSelected ? "atmo1" : undefined} />,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  iconCallback: ({ isSelected }) => (
                    <Machine color={isSelected ? "atmo1" : undefined} />
                  )
                },
                {
                  label: "Component HS-921",
                  iconCallback: ({ isSelected }) => (
                    <Machine color={isSelected ? "atmo1" : undefined} />
                  )
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          }
        ]
      }
    },
    {
      label: "Advanced server DS120",
      iconCallback: ({ isSelected }) => <User color={isSelected ? "atmo1" : undefined} />,
      path: "route3"
    },
    {
      label: "Advanced server DS122",
      iconCallback: ({ isSelected }) => <Calendar color={isSelected ? "atmo1" : undefined} />
    },
    {
      label: "Advanced server DS250",
      showNavIcon: true,
      iconCallback: ({ isSelected }) => <LineChart color={isSelected ? "atmo1" : undefined} />,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant Y-242",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            path: "route3"
          },
          {
            label: "Variant Y-244",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      iconCallback: ({ isSelected }) => <Plane color={isSelected ? "atmo1" : undefined} />,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  iconCallback: ({ isSelected }) => (
                    <Machine color={isSelected ? "atmo1" : undefined} />
                  )
                },
                {
                  label: "Component HS-921",
                  iconCallback: ({ isSelected }) => (
                    <Machine color={isSelected ? "atmo1" : undefined} />
                  )
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          }
        ]
      }
    },
    {
      label: "Advanced server DS120",
      iconCallback: ({ isSelected }) => <User color={isSelected ? "atmo1" : undefined} />,
      path: "route3"
    },
    {
      label: "Advanced server DS122",
      iconCallback: ({ isSelected }) => <Calendar color={isSelected ? "atmo1" : undefined} />
    },
    {
      label: "Advanced server DS250",
      showNavIcon: true,
      iconCallback: ({ isSelected }) => <LineChart color={isSelected ? "atmo1" : undefined} />,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant Y-242",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            path: "route3"
          },
          {
            label: "Variant Y-244",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      iconCallback: ({ isSelected }) => <Plane color={isSelected ? "atmo1" : undefined} />,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  iconCallback: ({ isSelected }) => (
                    <Machine color={isSelected ? "atmo1" : undefined} />
                  )
                },
                {
                  label: "Component HS-921",
                  iconCallback: ({ isSelected }) => (
                    <Machine color={isSelected ? "atmo1" : undefined} />
                  )
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          }
        ]
      }
    },
    {
      label: "Advanced server DS120",
      iconCallback: ({ isSelected }) => <User color={isSelected ? "atmo1" : undefined} />,
      path: "route3"
    },
    {
      label: "Advanced server DS122",
      iconCallback: ({ isSelected }) => <Calendar color={isSelected ? "atmo1" : undefined} />
    },
    {
      label: "Advanced server DS250",
      showNavIcon: true,
      iconCallback: ({ isSelected }) => <LineChart color={isSelected ? "atmo1" : undefined} />,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant Y-242",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            path: "route3"
          },
          {
            label: "Variant Y-244",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      iconCallback: ({ isSelected }) => <Plane color={isSelected ? "atmo1" : undefined} />,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            ),
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  iconCallback: ({ isSelected }) => (
                    <Machine color={isSelected ? "atmo1" : undefined} />
                  )
                },
                {
                  label: "Component HS-921",
                  iconCallback: ({ isSelected }) => (
                    <Machine color={isSelected ? "atmo1" : undefined} />
                  )
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            iconCallback: ({ isSelected }) => (
              <Components color={isSelected ? "atmo1" : undefined} />
            )
          }
        ]
      }
    }
  ]
};

const actionValues = [
  {
    label: "Profile",
    iconCallback: ({ isSelected }) => <User color={isSelected ? "atmo1" : undefined} />,
    path: "route3"
  },
  {
    label: "Settings",
    iconCallback: ({ isSelected }) => <Settings color={isSelected ? "atmo1" : undefined} />,
    path: "route3"
  },
  {
    label: "Help",
    iconCallback: ({ isSelected }) => <Help color={isSelected ? "atmo1" : undefined} />,
    path: "route3"
  }
];

export default (
  <div style={{ height: "700px" }}>
    <HvVerticalNavigation values={data} actionValues={actionValues} />
  </div>
);
