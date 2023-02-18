import {
  BarChart,
  Open,
  Deploy,
  Binoculars,
  Cpu,
  Machine,
  LightOff,
  Magnet,
  MarginsOff,
  Connect,
  CloseAll,
  ColorPicker,
  DaemonSet,
} from "@hitachivantara/uikit-react-icons";

const multiLevelNavigationData = [
  {
    id: "menu1",
    label: "Menu 1",
    path: "",
    icon: <Open />,
    parent: null,
    data: [
      {
        id: "subMenu1-1",
        label: "Sub Menu 1-1",
        path: "",
        icon: <Binoculars />,
        parent: null,
      },
      {
        id: "subMenu1-2",
        label: "Sub Menu 1-2",
        path: "",
        icon: <Cpu />,
        parent: null,
        data: [
          {
            id: "subMenu1-2-1",
            label: "Sub Menu 1-2-1",
            path: "",
            icon: <LightOff />,
            parent: null,
          },
          {
            id: "subMenu1-2-2",
            label: "Sub Menu 1-2-2",
            path: "",
            icon: <Magnet />,
            parent: null,
          },
          {
            id: "subMenu1-2-3",
            label: "Sub Menu 1-2-3",
            path: "",
            icon: <MarginsOff />,
            parent: null,
          },
        ],
      },
      {
        id: "subMenu1-3",
        label: "Sub Menu 1-3",
        path: "",
        icon: <Machine />,
        parent: null,
      },
    ],
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
  {
    id: "menu4",
    label: "Menu 4",
    path: "",
    icon: <Connect />,
    parent: null,
    data: [
      {
        id: "menu4-1",
        label: "Menu 4-1",
        path: "",
        icon: <ColorPicker />,
        parent: null,
      },
      {
        id: "menu4-2",
        label: "Menu 4-2",
        path: "",
        icon: <DaemonSet />,
        parent: null,
      },
    ],
  },
  {
    id: "menu5",
    label: "Menu 5",
    path: "",
    icon: <CloseAll />,
    parent: null,
  },
];

export default multiLevelNavigationData;
