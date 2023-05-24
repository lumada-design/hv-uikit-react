import { useState } from "react";
import {
  HvBox,
  HvCheckBox,
  HvContainer,
  HvTypography,
  theme,
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

const components = [
  {
    id: "avatar",
    content: <Avatar />,
    title: "Avatar",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-avatar--main",
    selected: true,
  },
  {
    id: "badge",
    content: <Badge />,
    title: "Badge",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-badge--main",
    selected: false,
  },
  {
    id: "breadcrumb",
    content: <BreadCrumb />,
    title: "Breadcrumb",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/widgets-breadcrumb--main",
    selected: false,
  },
  {
    id: "bulkactions",
    content: <BulkActions />,
    title: "Bulk Actions",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/widgets-bulk-actions--main",
    selected: false,
  },
  {
    id: "button",
    content: <Buttons />,
    title: "Button",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-button-button--main",
    selected: true,
  },
  {
    id: "calendar",
    content: <Calendar />,
    title: "Calendar",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-button-button--main",
    selected: false,
  },
  {
    id: "card",
    content: <Cards />,
    title: "Card",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-card--main",
    selected: true,
  },
  {
    id: "checkbox",
    content: <CheckBox />,
    title: "Checkbox",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-checkbox-checkbox--main",
    selected: false,
  },
  {
    id: "dialog",
    content: <Dialogs />,
    title: "Dialog",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-dialog--main",
    selected: false,
  },
  {
    id: "dotpagination",
    content: <DotPagination />,
    title: "Dot Pagination",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-pagination-dot-pagination--main",
    selected: false,
  },
  {
    id: "dropdownmenu",
    content: <DropDownMenu />,
    title: "Dropdown Menu",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-dropdown-dropdown-menu--main",
    selected: false,
  },
  {
    id: "emptystate",
    content: <EmptyState />,
    title: "Empty State",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-empty-state--main",
    selected: true,
  },
  {
    id: "fileuploader",
    content: <FileUploader />,
    title: "File Uploaded",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/widgets-file-uploader--main",
    selected: false,
  },
  {
    id: "icons",
    content: <Icons />,
    title: "Icons",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/foundation-icons--icons",
    selected: false,
  },
  {
    id: "input",
    content: <Input />,
    title: "Input",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-input--main",
    selected: true,
  },
  {
    id: "loading",
    content: <Loading />,
    title: "Loading",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-loading-loading--main",
    selected: true,
  },
  {
    id: "pagination",
    content: <Pagination />,
    title: "Pagination",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-pagination--main",
    selected: false,
  },
  {
    id: "progressbar",
    content: <ProgressBar />,
    title: "Progress Bar",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-loading-progress-bar--main",
    selected: false,
  },
  {
    id: "snackbar",
    content: <Snackbars />,
    title: "Snackbar",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-snackbar--main",
    selected: true,
  },
  {
    id: "radio",
    content: <Radio />,
    title: "Radio",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-radio-radio--main",
    selected: false,
  },
  {
    id: "switch",
    content: <Switch />,
    title: "Switch",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-switch--main",
    selected: false,
  },
  {
    id: "tags",
    content: <Tags />,
    title: "Tags",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-tag-tag--main",
  },
  {
    id: "tagsinput",
    content: <TagsInput />,
    title: "Tags Input",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-tag-tags-input--main",
    selected: false,
  },
  {
    id: "tooltip",
    content: <Tooltip />,
    title: "Tooltip",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-tooltip-tooltip--main",
    selected: false,
  },
  {
    id: "typography",
    content: <Typography />,
    title: "Typography",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/foundation-typography--main",
    selected: true,
  },
  {
    id: "verticalnavigation",
    content: <VerticalNavigation />,
    title: "Vertical Navigation",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/foundation-typography--main",
    selected: false,
  },
];

const Component = ({
  id,
  title,
  link,
  content,
}: {
  id: string;
  title: string;
  link: string;
  content: React.ReactElement;
}) => {
  return (
    <HvBox className={styles.component}>
      <div style={{ position: "absolute", marginTop: "-100px" }}>
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid  */}
        <a id={id} />
      </div>
      <HvBox className={styles.header}>
        <HvTypography variant="title2">{title}</HvTypography>
        <HvTypography
          component="a"
          href={link}
          target="_blank"
          className={styles.docs}
        >
          Docs
        </HvTypography>
      </HvBox>
      <HvBox className={styles.content}>{content}</HvBox>
    </HvBox>
  );
};

const App = () => {
  const [componentsToShow, setComponentsToShow] = useState(components);

  const handleOnChange = (id) => {
    const comp = componentsToShow.find((c) => c.id === id);
    if (comp) {
      const newComponents = componentsToShow.map((c) =>
        c === comp ? { ...c, selected: !comp.selected } : c
      );
      setComponentsToShow(newComponents);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 250);
    }
  };

  const labelClickHandler = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <HvBox
        css={{
          position: "fixed",
          width: 200,
          height: `calc(100% - ${theme.header.height})`,
          left: 0,
          top: theme.header.height,
          overflowY: "scroll",
          padding: `20px 10px`,
          backgroundColor: theme.colors.atmo1,
          zIndex: theme.zIndices.overlay,
        }}
      >
        <HvBox css={{ display: "flex", flexDirection: "column" }}>
          {componentsToShow.map((c) => {
            return (
              <HvBox key={c.id} css={{ display: "flex", alignItems: "center" }}>
                <HvCheckBox
                  key={c.id}
                  value={c.id}
                  checked={!!c.selected}
                  onChange={() => handleOnChange(c.id)}
                />
                <HvTypography
                  onClick={() => labelClickHandler(c.id)}
                  className={styles.label}
                  disabled={!c.selected}
                >
                  {c.title}
                </HvTypography>
              </HvBox>
            );
          })}
        </HvBox>
      </HvBox>
      <HvContainer maxWidth="md">
        {componentsToShow.map((c) => (
          <div key={c.id}>{!!c.selected && <Component {...c} />}</div>
        ))}
      </HvContainer>
    </>
  );
};

export default App;
