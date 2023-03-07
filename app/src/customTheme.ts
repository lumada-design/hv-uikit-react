import { HvProviderProps } from "@hitachivantara/uikit-react-core";

const customTheme: HvProviderProps["theme"] = {
  baseTheme: "ds5",
  baseColorMode: "dawn",
  inheritColorModes: false,
  name: "custom-theme",
  colors: {
    modes: {
      sand: {
        backgroundColor: "#EAE7DC",
        sema1: "#738f54",
        sema2: "#7699b8",
        sema3: "#d9905f",
        sema4: "#bf6060",
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
};

export default customTheme;
