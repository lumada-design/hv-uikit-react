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
} from "./components";
import { Tooltip } from "./components/Tooltip/Tooltip";
import { Dialogs } from "./components/Dialogs/Dialogs";
import { Header, ThemeSwitcher } from "./layout";
import { Switch } from "./components/Switch";
import { DropDownMenu } from "./components/DropDownMenu/DropDownMenu";
import { BreadCrumb } from "./components/BreadCrumb/BreadCrumb";

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
    <HvProvider rootElementId="hv-root">
      <Header />
      <HvBox sx={styles}>
        <ThemeSwitcher />
        <Typography />
        {/* 
        <BaseDropdown />
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
        <Icons /> */}
      </HvBox>
    </HvProvider>
  );
};

export default App;
