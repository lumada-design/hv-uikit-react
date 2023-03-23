import {
  HvBox,
  HvContainer,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import {
  Buttons,
  Cards,
  FileUploader,
  // EmptyState,
  // Grid,
  // Icons,
  // Typography,
  // Tags,
  // CheckBox,
  // BaseDropdown,
  // BaseInput,
  // Radio,
  // TagsInput,
  // Input,
  // Pagination,
  // DotPagination,
  // BulkActions,
  // BreadCrumb,
  // Tooltip,
  // Dialogs,
  // DropDownMenu,
  // Switch,
  // Snackbars,
  // Calendar,
  // VerticalNavigation,
} from "components/components";
import { styles } from "./Components.styles";

const App = () => {
  return (
    <HvContainer maxWidth="md">
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Button</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/inputs-button--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <Buttons />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Cards</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/display-card--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <Cards />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">FileUploader</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/inputs-file-uploader--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <FileUploader />
        </HvBox>
      </HvBox>
    </HvContainer>
  );
  {
    /*<HvBox sx={styles}>
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
      <CheckBox />
      <Switch />
      <Radio />
      <Dialogs />
      <Tags />
      <Cards />
      <Tooltip />
      <Grid />
      <EmptyState />
      <Icons />
      <BreadCrumb />
      <BulkActions />
      <Calendar />
      <VerticalNavigation />
    </HvBox> */
  }
};

export default App;
