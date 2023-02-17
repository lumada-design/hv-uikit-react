import { HvBox, HvProvider, theme } from "@hitachivantara/uikit-react-core";
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
import customTheme from "./customTheme";

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
    <HvProvider rootElementId="hv-root" theme={customTheme}>
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
