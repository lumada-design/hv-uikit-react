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
            iconCallback: ({ isSelected }) => <Components color={isSelected ? "atmo1" : undefined} />,
            path: "route3"
          },
          {
            label: "Variant Y-244",
            iconCallback: ({ isSelected }) => <Components color={isSelected ? "atmo1" : undefined} />
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
            iconCallback: ({ isSelected }) => <Components color={isSelected ? "atmo1" : undefined} />,
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  iconCallback: ({ isSelected }) => <Machine color={isSelected ? "atmo1" : undefined} />
                },
                {
                  label: "Component HS-921",
                  iconCallback: ({ isSelected }) => <Machine color={isSelected ? "atmo1" : undefined} />
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            iconCallback: ({ isSelected }) => <Components color={isSelected ? "atmo1" : undefined} />
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
