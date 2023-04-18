import {
  HvAccordion,
  HvBox,
  HvButton,
  HvDropdown,
  HvInput,
  HvSimpleGrid,
} from "@hitachivantara/uikit-react-core";
import { icons as iconComponentList } from "@hitachivantara/uikit-react-icons";
import { useState } from "react";
import Library from "./Library";

const dropdownSizes = [
  { id: "0", label: "XS" },
  { id: "1", label: "S", selected: true },
  { id: "2", label: "M" },
  { id: "3", label: "L" },
];

const categories = [
  {
    Actions: [
      "Add",
      "AddAlt",
      "AddManually",
      "AddNote",
      "Alert",
      "AppSwitcher",
      "Attachment",
      "Ban",
      "Blocked",
      "Bluetooth",
      "Bookmark",
      "BookmarkSelected",
      "Calendar",
      "Change",
      "Chat",
      "Close",
      "CloseAll",
      "Cluster",
      "Code",
      "Connect",
      "Connection",
      "CustomerSupport",
      "Debug",
      "Delete",
      "Deploy",
      "Delete",
      "DeployAlt",
      "Disconnect",
      "Disk",
      "Dislike",
      "Download",
      "Drag",
      "Duplicate",
      "Email",
      "Event",
      "Favorite",
      "Filters",
      "Flag",
      "Functions",
      "Group",
      "Heart",
      "Help",
      "Hold",
      "Home",
      "Host",
      "Hotspot",
      "ImportFile",
      "Incomplete",
      "Sort",
      "SortAscending",
      "SortDescending",
      "Home",
      "HourGlass",
      "Info",
      "Inject",
      "Install",
      "Job",
      "Layers",
      "LightOff",
      "LightOn",
      "Like",
      "Live",
      "Load",
      "LogActivity",
      "Magnifier",
      "MarginsOff",
      "MarginsOn",
      "Menu",
      "MoreOptionsHorizontal",
      "MoreOptionsVertical",
      "NoData",
      "Offline",
      "Online",
      "Open",
      "Operation",
      "Phone",
      "PhotoCam",
      "Pin",
      "PlayVideo",
      "PlayVideoScreen",
      "PlayVideoAlt",
      "Point",
      "Position",
      "Preview",
      "PreviewOff",
      "QrCode",
      "Radar",
      "RecordCamOn",
      "RecordCamOff",
      "Redo",
      "Refresh",
      "Reload",
      "RepeatEvent",
      "ReplicaSet",
      "Reset",
      "ResetOff",
      "Reuse",
      "Save",
      "Schema",
      "Search",
      "Settings",
      "Share",
      "SortAlt",
      "SortAltAscending",
      "SortAltDescending",
      "Split",
      "Submit",
      "SubmitForm",
      "SurroundingCameras",
      "SwipeRight",
      "Switch",
      "Tag",
      "TagGroup",
      "Template",
      "TemplateAlt",
      "ThemeSwitcher",
      "Time",
      "Toolset",
      "Touch",
      "Transformation",
      "Undo",
      "Ungroup",
      "Unlock",
      "Upload",
      "Whiteboard",
    ],
  },
  {
    Charts: [
      "AucRocCurve",
      "BarChart",
      "BubbleChart",
      "Cards",
      "ConfusionMatrix",
      "DataFlow",
      "DonutChart",
      "Heatmap",
      "LineChart",
      "LineChartAlt",
      "PieChart",
      "Speedometer",
      "Table",
    ],
  },
  {
    Controls: [
      "Add",
      "End",
      "Equal",
      "FastBackwars",
      "FastForwards",
      "Pause",
      "Play",
      "Playback",
      "Remove",
      "Start",
      "Stop",
      "VolumeOff",
      "VolumeOn",
      "ZoomIn",
      "ZoomOut",
    ],
  },
  {
    "Construction and Buildings": [
      "BlastholeDrill",
      "Building",
      "Dozer",
      "Dragline",
      "Excavator",
      "Grader",
      "HaulTruck",
      "Loader",
      "RecyclingTruck",
      "Tractor",
      "Truck",
      "Warehouse",
      "WaterTruck",
    ],
  },
  {
    Directions: [
      "BackWards",
      "BackwardsEmpty",
      "Bottom",
      "Down",
      "DownEmpty",
      "Previous",
      "DropDown",
      "DropLeft",
      "DropRight",
      "DropUp",
      "Forwards",
      "ForwardsEmpty",
      "Next",
      "Previous",
      "SwapNextPrevious",
      "SwapTopBottom",
      "KeyboardDown",
      "KeyboardUp",
      "Top",
      "Up",
      "UpEmpty",
    ],
  },
  {
    Location: [
      "LocationPin",
      "Map",
      "MarkerA",
      "MarkerB",
      "MarkerC",
      "MarkerD",
      "MarkerE",
      "WorldGlobe",
    ],
  },
  {
    Other: [
      "Agents",
      "AppleLogoFilled",
      "Asterisk",
      "Backpack",
      "Binoculars",
      "Champion",
      "CompletedStep",
      "Components",
      "Cube",
      "DataStore",
      "Experiment",
      "GameController",
      "Ghost",
      "Gyroscope",
      "Hash",
      "Leaf",
      "Luggage",
      "Machine",
      "Magnet",
      "OpenBook",
      "OpenDoor",
      "ParcelDelivery",
      "PingPong",
      "Plant",
      "Poo",
      "Research",
      "Scale",
      "Seat",
      "Teapot",
      "Tetris",
      "Topics",
      "Wand",
      "WindowsLogoFilled",
    ],
  },
  {
    "Screen and Cursor": [
      "ActualSize",
      "DefaultCursor",
      "Desktop",
      "FitToScreen",
      "Focus",
      "Fullscreen",
      "LocationCursor",
      "Mobile",
      "MobileRotation",
      "Move",
      "MultiDevices",
      "PopUp",
    ],
  },
  {
    Selectors: [
      "Backwards",
      "BackwardsEmpty",
      "Bookmark",
      "BookmarkSelected",
      "Checkbox",
      "CheckboxCheck",
      "CheckboxPartial",
      "Dislike",
      "DownEmpty",
      "DownSelected",
      "Favorite",
      "Flag",
      "ForwardsEmpty",
      "ForwardsSelected",
      "Heart",
      "HeartSelected",
      "Like",
      "Pin",
      "PinSelected",
      "RadioButton",
      "Tag",
      "TagSelected",
      "UpEmpty",
      "UpSelected",
    ],
  },
  { KPIS: ["Stable"] },
  { Pagination: ["SelectedPage", "SelectedPageXS", "UnSelectedPageXS"] },
  {
    "Severity and Priority": [
      "Level0Good",
      "Level0MarkerA",
      "Level0MarkerB",
      "Level0MarkerC",
      "Level0MarkerD",
      "Level1",
      "Level1Alt",
      "Level1Marker",
      "Level2Alt",
      "Level2Average",
      "Level3Bad",
      "Level3MarkerA",
      "Level3MarkerB",
      "Level3MarkerC",
      "Level3MarkerD",
      "Level4",
      "Level4Alt",
      "Level4MarkerA",
      "Level4MarkerB",
      "Level4MarkerC",
      "Level4MarkerD",
      "Level4MarkerE",
      "Level5",
      "Level5MarkerA",
      "Level5MarkerB",
      "Level5MarkerC",
      "Level5MarkerD",
      "Level5MarkerE",
      "Priority1",
      "Priority2",
      "Priority3",
      "Priority4",
      "Priority5",
      "Severity1",
      "Severity2",
      "Severity3",
      "Severity4",
      "Severity5",
    ],
  },
  {
    Shopping: ["Cart", "Cash", "CreditCard", "GiftVoucher", "Ticket", "Upsell"],
  },
  {
    Status: [
      "Level0Good",
      "Level1",
      "Level1Alt",
      "Level2Alt",
      "Level2Average",
      "Canceled",
      "Fail",
      "Pending",
      "Running",
    ],
  },
  { "System Feedback": ["Caution", "Fail", "Success"] },
  {
    Transports: [
      "AerialTramway",
      "Bicycle",
      "Boat",
      "Bus",
      "Car",
      "FerryBoat",
      "Helicopter",
      "Monorail",
      "PaperBoat",
      "Plane",
      "Train",
    ],
  },
  {
    User: [
      "EditUser",
      "Female",
      "Fine",
      "Great",
      "Identification",
      "Instructor",
      "LogIn",
      "LogOut",
      "Male",
      "MaleAccessibility",
      "MaleRunning",
      "MaleWalking",
      "Okay",
      "People",
      "Poor",
      "User",
    ],
  },
  {
    Tools: [
      "Abacus",
      "Archive",
      "ArchiveDropUp",
      "ArchiveNew",
      "Archives",
      "ArchiveShared",
      "ArchiveTeam",
      "Bold",
      "Branch",
      "Center",
      "ClusterAlt",
      "Collection",
      "ColorPicker",
      "Column",
      "Container",
      "Contract",
      "Cpu",
      "DaemonSet",
      "DataQuality",
      "DataSource",
      "Doc",
      "DocCSV",
      "DocExcel",
      "DocWord",
      "Draw",
      "Edit",
      "EditNotes",
      "FolderAlt",
      "Folders",
      "FoldersAlt",
      "FontSize",
      "FontSizeBigger",
      "FontSizeSmaller",
      "HardDisk",
      "Italic",
      "Justify",
      "LeftAlign",
      "Memory",
      "MultipleFolder",
      "Namespace",
      "Node",
      "PaintBucket",
      "Palette",
      "Percentage",
      "Picture",
      "Pod",
      "ProfileDocument",
      "Report",
      "RightAlign",
      "Ruler",
      "Service",
      "Storage",
      "Strikethrough",
      "SystemActivity",
      "TablePartition",
      "Tool",
      "ToolAlt",
      "Underline",
      "VirtualFolder",
    ],
  },
  {
    Weather: [
      "Cloud",
      "Cyclone",
      "Dust",
      "Energy",
      "Fire",
      "FoggyDay",
      "FoggyNights",
      "Frost",
      "HazyDay",
      "HazyNight",
      "HeavyShowerDay",
      "HeavyShowerNight",
      "LightRain",
      "LightShowerDay",
      "LightShowerNight",
      "Moon",
      "MostlySunny",
      "PartlyCloudy",
      "Rain",
      "ShowerDay",
      "ShowerNight",
      "Snow",
      "Sun",
      "Water",
      "Wind",
    ],
  },
];

const IconCategories = () => {
  const iconList = iconComponentList;

  const [iconListResults, setIconListResults] =
    useState<typeof iconComponentList>(iconList);
  const [iconSize, setIconSize] = useState<(typeof dropdownSizes)[0]>();
  const [expandedState, setExpandedState] = useState(
    categories.map((category) => {
      return {
        category: Object.keys(category)[0],
        open: false,
      };
    })
  );

  const handleToggle = (category) => {
    const newExpandedState = expandedState.map((element) => {
      if (element.category == category) {
        return { ...element, open: !element.open };
      }
      return element;
    });
    setExpandedState(newExpandedState);
  };

  const handleAll = (option: boolean) => {
    setExpandedState(
      expandedState.map((category) => {
        return { ...category, open: option };
      })
    );
  };

  const handleIconSearch = (searchTerm: string) => {
    const filteredIcons = Object.keys(iconList)
      .filter((key) => key.toLowerCase().includes(searchTerm.toLowerCase()))
      .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: iconList[key],
        });
      }, {});
    setIconListResults(filteredIcons as typeof iconComponentList);
  };

  const filterByCategory = (category: string) => {
    const categoryObject = categories.find(
      (categoryE) => Object.keys(categoryE)[0] === category
    );

    if (categoryObject) {
      const categoryKeys = categoryObject[category];
      return Object.keys(iconListResults)
        .filter((key) => categoryKeys.includes(key))
        .reduce((obj, key) => {
          return Object.assign(obj, {
            [key]: iconListResults[key],
          });
        }, {});
    }
    return [];
  };

  return (
    <>
      <HvSimpleGrid spacing="sm" cols={2} style={{ maxWidth: 400 }}>
        <HvButton variant="secondarySubtle" onClick={() => handleAll(false)}>
          Close all
        </HvButton>
        <HvButton variant="secondarySubtle" onClick={() => handleAll(true)}>
          Expand all
        </HvButton>
        <HvInput
          label="Search All Categories"
          aria-label="Search Icons"
          onChange={(e, value) => handleIconSearch(value)}
          placeholder="Search"
          type="search"
        />
        <HvDropdown
          label="Select icon size"
          values={dropdownSizes}
          multiSelect={false}
          onChange={(item) => setIconSize(item)}
          notifyChangesOnFirstRender
        />
      </HvSimpleGrid>
      <HvBox>
        {expandedState.map((element) => (
          <HvAccordion
            key={element.category + "Accordion"}
            label={element.category}
            expanded={element.open}
            onChange={() => handleToggle(element.category)}
          >
            <Library
              isIcons
              size={iconSize?.label}
              iconList={filterByCategory(element.category)}
            />
          </HvAccordion>
        ))}
      </HvBox>
    </>
  );
};

export default IconCategories;
