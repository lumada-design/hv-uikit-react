import { HvBox, HvProvider, theme } from "@hitachivantara/uikit-core";
import { CSSProperties } from "react";
import {
  Buttons,
  EmptyState,
  Grid,
  Icons,
  Cards,
  Typography,
  Tags,
  CheckBox,
  BaseDropdown,
  BaseInput,
  Radio,
  TagsInput,
  Input,
  FileUploader,
  Pagination,
  DotPagination,
  BulkActions,
  BreadCrumb,
} from "./components";
import { Tooltip } from "./components/Tooltip/Tooltip";
import { Dialogs } from "./components/Dialogs/Dialogs";
import { Header, ThemeSwitcher } from "./layout";
import { Switch } from "./components/Switch";
import { DropDownMenu } from "./components/DropDownMenu/DropDownMenu";

const styles = {
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(5),
  maxWidth: "100%",
  margin: `${theme.spacing(5)} auto`,
  padding: `calc(${theme.header.height} + 50px) 20px 20px 20px`,
  height: "100%",
} as CSSProperties;

const App = () => {
  return (
    <HvProvider
      rootElementId="hv-root"
      theme={{
        baseTheme: "ds5",
        baseColorMode: "dawn",
        name: "custom-theme",
        colors: {
          modes: {
            /* dawn: {
              atmo1: "#A2ECE6",
              newColor: "#eee",
            }, */
            salmon: {
              acce1: "#FFA07A",
              atmo2: "#add8e6",
              /* newColor: "#eee", */
            },
          },
        },
        /* checkbox: { hoverColor: "red" },
        baseCheckBox: {
          hoverColor: "red",
        },
        newProperty: {
          newValue1: "",
          newValue2: {
            newValue3: "",
            newValue4: {
              newValue5: 120,
            },
          },
        }, */
      }}
    >
      <Header />
      <HvBox sx={styles}>
        <ThemeSwitcher />
        <Typography />
        <BaseDropdown />
        <DotPagination />
        <Pagination />
        <DropDownMenu />
        <Buttons />
        <BaseInput />
        <Input />
        <TagsInput />
        <FileUploader />
        <CheckBox />
        <Switch />
        <Radio />
        <Dialogs />
        <Tags />
        <Cards />
        <Tooltip />
        <Grid />
        <EmptyState />
        <Buttons />
        <Icons />
        <BreadCrumb />
        <BulkActions />
      </HvBox>
    </HvProvider>
  );
};

export default App;
