import {
  HvBox,
  HvContainer,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import {
  Badge,
  BreadCrumb,
  BulkActions,
  Buttons,
  Calendar,
  Cards,
  CheckBox,
  Dialogs,
  DotPagination,
  DropDownMenu,
  EmptyState,
  FileUploader,
  Icons,
  Input,
  Pagination,
  Radio,
  Snackbars,
  Switch,
  Tags,
  Tooltip,
  Typography,
  TagsInput,
  VerticalNavigation,
  Avatar,
  ProgressBar,
  Loading,
} from "components/components";
import { styles } from "./Components.styles";

const App = () => {
  return (
    <HvContainer maxWidth="md">
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Avatar</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-avatar--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <Avatar />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Badge</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-badge--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <Badge />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">BreadCrumb</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/widgets-breadcrumb--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <BreadCrumb />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Bulk Actions</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/widgets-bulk-actions--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <BulkActions />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Button</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-button-button--main"
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
          <HvTypography variant="title2">Calendar</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-button-button--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <Calendar />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Cards</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-card--main"
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
          <HvTypography variant="title2">Checkbox</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-card--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <CheckBox />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Dialogs</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-dialog--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <Dialogs />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Dot Pagination</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-pagination-dot-pagination--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <DotPagination />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">DropDownMenu</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-dropdown-dropdown-menu--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <DropDownMenu />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Empty State</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-empty-state--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <EmptyState />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">File Uploader</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/widgets-file-uploader--main"
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
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Icons</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/foundation-icons--icons"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <Icons />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Input</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-input--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <Input />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Loading</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-loading-loading--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <Loading />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Pagination</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-pagination--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <Pagination />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Progress Bar</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-loading-progress-bar--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <ProgressBar />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Snackbar</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-snackbar--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <Snackbars />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Radio</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-radio-radio--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <Radio />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Switch</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-switch--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <Switch />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Tags</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-tag-tag--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <Tags />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Tags Input</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-tag-tags-input--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <TagsInput />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Tooltip</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/components-tooltip-tooltip--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <Tooltip />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Typography</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/foundation-typography--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <Typography />
        </HvBox>
      </HvBox>
      <HvBox className={styles.component}>
        <HvBox className={styles.header}>
          <HvTypography variant="title2">Vertical Navigation</HvTypography>
          <HvTypography
            component="a"
            href="https://lumada-design.github.io/uikit/master/?path=/docs/foundation-typography--main"
            target="_blank"
            className={styles.docs}
          >
            Docs
          </HvTypography>
        </HvBox>
        <HvBox className={styles.content}>
          <VerticalNavigation />
        </HvBox>
      </HvBox>
    </HvContainer>
  );
};

export default App;
