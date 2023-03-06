import { HvProviderProps } from "@hitachivantara/uikit-react-core";

const customTheme: HvProviderProps["theme"] = {
  baseTheme: "ds5",
  baseColorMode: "dawn",
  name: "custom-theme",
  colors: {
    modes: {
      dawn: {
        // atmo1: "#A2ECE6",
        /* newColor: "#eee", */
      },
      salmon: {
        acce1: "#FFA07A",
        atmo2: "#add8e6",
        /* newColor: "#eee", */
      },
    },
  },
  // checkbox: { hoverColor: "red" },
  // baseCheckBox: {
  //   hoverColor: "red",
  // },
  header: {
    backgroundColor: "#abb5de",
    secondLevelBackgroundColor: "#8f99c2",
    hoverColor: "#bac2e6",
    selectedItemBorderBottomColor: "#6d7182",
  },
  /* newProperty: {
      newValue1: "",
      newValue2: {
        newValue3: "",
        newValue4: {
          newValue5: 120,
        },
      },
    },  */
};

export default customTheme;
