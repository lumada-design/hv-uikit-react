import { createTheme } from "@hitachivantara/uikit-react-core";

const customTheme = createTheme({
  name: "tatooine",
  base: "ds5",
  inheritColorModes: false,
  colors: {
    modes: {
      sand: {
        backgroundColor: "#EAE7DC",
        positive: "#738f54",
        neutral: "#7699b8",
        warning: "#d9905f",
        negative: "#bf6060",
        neutral_20: "#a4aeba",
        positive_20: "#b2bda6",
        negative_20: "#d19090",
        primary: "#536f8f",
        primary_80: "#76a6db",
      },
    },
  },
  fontFamily: {
    body: "Courier New",
  },
  typography: {
    body: {
      color: "#635f59",
    },
    label: {
      color: "#635f59",
    },
    title3: {
      color: "#635f59",
    },
  },
  card: {
    borderRadius: "0px 0px 20px 20px",
    hoverColor: "#635f59",
    backgroundColor: "#fbfaf8",
  },
  header: {
    backgroundColor: "#D8C3A5",
    secondLevelBackgroundColor: "#c7b69f",
    hoverColor: "#e6d5be",
    height: "52px",
  },
  bulkActions: {
    backgroundColor: "#ebe4da",
    anySelectedBackgroundColor: "#c9bdab",
  },
  table: {
    selectedRowBackgroundColor: "#c9bdab",
    rowHoverColor: "#ebe4da",
  },
});

export default customTheme;
