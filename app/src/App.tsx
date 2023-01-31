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
} as CSSProperties;

const App = () => {
  return (
    <HvProvider rootElementId="hv-root">
      <Header />
      <HvBox sx={styles}>
        <ThemeSwitcher />
        <DropDownMenu />
        <Buttons />
        {/* 
        <BaseInput />
        <Input />
        <TagsInput />
        <FileUploader />
        <BaseDropdown />
        
        <CheckBox />
        <Switch />
        <Radio />
        <Dialogs />
        <Tags />
        <Cards />
        <Tooltip />
        <Grid />
        <EmptyState />
        <Typography />
        <Buttons />
        <Icons />
        <Icons /> */}
      </HvBox>
    </HvProvider>
  );
};

export default App;
