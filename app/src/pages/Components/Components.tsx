import { HvBox, theme } from "@hitachivantara/uikit-react-core";
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
  DropDownMenu,
  Switch,
  Snackbars,
  Calendar,
} from "components/components";
import { VerticalNavigation } from "components/components/VerticalNavigation";

const styles = {
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(5),
} as CSSProperties;

const App = () => {
  return (
    <HvBox sx={styles}>
      <Snackbars />
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
      <Calendar />
      <VerticalNavigation />
    </HvBox>
  );
};

export default App;
