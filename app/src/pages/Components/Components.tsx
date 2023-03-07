import { HvBox, HvSnackbar, theme } from "@hitachivantara/uikit-react-core";
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
} from "components/components";

const styles = {
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(5),
} as CSSProperties;

const App = () => {
  return (
    <HvBox sx={styles}>
      <HvSnackbar
        open={true}
        variant={"default"}
        label={"This is a snackbar"}
        transitionDirection={"left"}
        showIcon={true}
        transitionDuration={300}
        autoHideDuration={5000}
      />
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
