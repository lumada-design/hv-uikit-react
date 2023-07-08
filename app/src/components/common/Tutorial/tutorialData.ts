import { theme } from "@hitachivantara/uikit-styles";

interface StepProps {
  title?: string;
  content?: string;
  orientation?: string;
  position?: {
    top?: number | string;
    bottom?: number | string;
    right?: number | string;
    left?: number | string;
  };
  size?: {
    width?: number;
    height?: number;
  };
  arrow?: {
    top?: number | string;
    bottom?: number | string;
    right?: number | string;
    left?: number | string;
  };
}

export const tutorialData: StepProps[] = [
  {
    title: "Open the Theme Creator",
    content: "Click the menu icon to open the Theme Creator.",
    size: {
      width: 350,
    },
    position: {
      right: 10,
      top: 60,
    },
    arrow: {
      left: 310,
    },
  },
  {
    title: "Theme base configuration",
    content: "Select the base theme and color mode.",
    size: {
      width: 350,
    },
    position: {
      right: 20,
      top: 120,
    },
  },
  {
    title: "Code Editor",
    content:
      "All the changes you make to your theme will be available here. You can use the icons to reset or copy the code and the usual keyboard shortcuts to undo or redo. You can also download your theme here.",
    orientation: "right",
    size: {
      width: 350,
    },
    position: {
      right: 415,
      top: 180,
    },
  },
  {
    title: "Theme Tools",
    content:
      "The Theme Tools allow you to configure basic definitions of your theme: customize the palette, add new fonts, update typography settings and tune several layout definitions like the radii, sizes, zIndices or spacings.",
    orientation: "right",
    size: {
      width: 450,
    },
    position: {
      right: 415,
      top: 455,
    },
  },
  {
    title: "Preview",
    content: "This is the preview tab.",
    orientation: "up",
    size: {
      width: 350,
    },
    position: {
      right: "calc(50% - 40px)",
      top: `calc(${theme.header.height} + 20px)`,
    },
  },
  {
    title: "Templates",
    content:
      "In the Preview section you can view your theme in several different templates.",
    orientation: "up",
    size: {
      width: 350,
    },
    position: {
      right: "calc(50% - 40px)",
      top: `calc(2 * ${theme.header.height} + 20px)`,
    },
  },
  {
    title: "Components",
    content: "This is the components tab.",
    orientation: "up",
    size: {
      width: 350,
    },
    position: {
      right: "calc(50% + 70px)",
      top: `calc(${theme.header.height} + 20px)`,
    },
  },
  {
    title: "Components",
    content:
      "In the Components section you can view your theme in specific isolated components. Use the check boxes to select the components you want to test your theme on. Click on the component name to navigate to it.",
    orientation: "left",
    size: {
      width: 350,
    },
    position: {
      left: 220,
      top: `calc(50% - 100px)`,
    },
  },
];
