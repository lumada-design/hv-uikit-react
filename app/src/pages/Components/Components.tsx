import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Global } from "@emotion/react";
import {
  HvBox,
  HvButton,
  HvCheckBox,
  HvCheckBoxGroup,
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

const componentsList = [
  {
    id: "avatar",
    content: <Avatar />,
    title: "Avatar",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-avatar--main",
  },
  {
    id: "badge",
    content: <Badge />,
    title: "Badge",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-badge--main",
  },
  {
    id: "breadcrumb",
    content: <BreadCrumb />,
    title: "Breadcrumb",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/widgets-breadcrumb--main",
  },
  {
    id: "bulkactions",
    content: <BulkActions />,
    title: "Bulk Actions",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/widgets-bulk-actions--main",
  },
  {
    id: "button",
    content: <Buttons />,
    title: "Button",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-button-button--main",
  },
  {
    id: "calendar",
    content: <Calendar />,
    title: "Calendar",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-button-button--main",
  },
  {
    id: "card",
    content: <Cards />,
    title: "Card",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-card--main",
  },
  {
    id: "checkbox",
    content: <CheckBox />,
    title: "Checkbox",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-checkbox-checkbox--main",
  },
  {
    id: "dialog",
    content: <Dialogs />,
    title: "Dialog",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-dialog--main",
  },
  {
    id: "dotpagination",
    content: <DotPagination />,
    title: "Dot Pagination",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-pagination-dot-pagination--main",
  },
  {
    id: "dropdownmenu",
    content: <DropDownMenu />,
    title: "Dropdown Menu",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-dropdown-dropdown-menu--main",
  },
  {
    id: "emptystate",
    content: <EmptyState />,
    title: "Empty State",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-empty-state--main",
  },
  {
    id: "fileuploader",
    content: <FileUploader />,
    title: "File Uploaded",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/widgets-file-uploader--main",
  },
  {
    id: "icons",
    content: <Icons />,
    title: "Icons",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/foundation-icons--icons",
  },
  {
    id: "input",
    content: <Input />,
    title: "Input",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-input--main",
  },
  {
    id: "loading",
    content: <Loading />,
    title: "Loading",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-loading-loading--main",
  },
  {
    id: "pagination",
    content: <Pagination />,
    title: "Pagination",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-pagination--main",
  },
  {
    id: "progressbar",
    content: <ProgressBar />,
    title: "Progress Bar",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-loading-progress-bar--main",
  },
  {
    id: "snackbar",
    content: <Snackbars />,
    title: "Snackbar",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-snackbar--main",
  },
  {
    id: "radio",
    content: <Radio />,
    title: "Radio",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-radio-radio--main",
  },
  {
    id: "switch",
    content: <Switch />,
    title: "Switch",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-switch--main",
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
  },
  {
    id: "tooltip",
    content: <Tooltip />,
    title: "Tooltip",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/components-tooltip-tooltip--main",
  },
  {
    id: "typography",
    content: <Typography />,
    title: "Typography",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/foundation-typography--main",
  },
  {
    id: "verticalnavigation",
    content: <VerticalNavigation />,
    title: "Vertical Navigation",
    link: "https://lumada-design.github.io/uikit/master/?path=/docs/foundation-typography--main",
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
      <HvBox className={styles.header}>
        <HvTypography variant="title2" component="a" href={`#${id}`}>
          {title}
        </HvTypography>
        <HvButton
          component="a"
          href={link}
          target="_blank"
          className={styles.docs}
          variant="secondarySubtle"
        >
          Docs
        </HvButton>
      </HvBox>
      <HvBox className={styles.content}>{content}</HvBox>
    </HvBox>
  );
};

const initialSelection = [
  "avatar",
  "button",
  "card",
  "emptystate",
  "input",
  "loading",
  "snackbar",
  "typography",
];

const Components = () => {
  const [params, setParams] = useSearchParams();
  const [selection, setSelection] = useState(
    params.get("selection")?.split(",") ?? initialSelection
  );

  useEffect(() => {
    setParams({ selection: selection.join(",") }, { replace: true });
  }, [selection, setParams]);

  const componentsToShow = useMemo(
    () =>
      componentsList.map((c) => ({ ...c, selected: selection.includes(c.id) })),
    [selection]
  );

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Global styles={{ html: { scrollBehavior: "smooth" } }} />
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
          <HvCheckBoxGroup
            showSelectAll
            value={selection}
            onChange={(event, newSelection) => setSelection(newSelection)}
          >
            {componentsToShow.map((c) => (
              <HvCheckBox
                key={c.id}
                value={c.id}
                label={c.title}
                onClick={() => handleClick(c.id)}
                labelProps={{
                  // checked labels only scroll to element
                  style: { color: c.selected ? undefined : theme.colors.atmo4 },
                  onClick: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleClick(c.id);
                  },
                }}
              />
            ))}
          </HvCheckBoxGroup>
        </HvBox>
      </HvBox>
      <HvContainer maxWidth="md">
        {componentsToShow.map((c) => (
          <div key={c.id} id={c.id} style={{ scrollMarginTop: 64 + 10 }}>
            {!!c.selected && <Component {...c} />}
          </div>
        ))}
      </HvContainer>
    </>
  );
};

export default Components;
