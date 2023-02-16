import { HvBox, theme } from "@hitachivantara/uikit-core";
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
  Tooltip,
  Dialogs,
  Switch,
  DropDownMenu
} from "components/components";

const styles = {
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(5),
  maxWidth: "100%",
  margin: `${theme.spacing(5)} auto`,
  padding: `calc(${theme.header.height}) 20px 20px 20px`,
  height: "100%",
} as CSSProperties;

const App = () => {
  return (
      <HvBox sx={styles}>
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
  );
};

export default App;