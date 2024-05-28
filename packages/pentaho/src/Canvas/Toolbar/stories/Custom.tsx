import { css } from "@emotion/css";
import {
  HvButton,
  HvDropDownMenu,
  HvIconButton,
  HvInlineEditor,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Backwards,
  Calendar,
  Plane,
  Pod,
  Redo,
  Undo,
  User,
} from "@hitachivantara/uikit-react-icons";
import { HvCanvasToolbar } from "@hitachivantara/uikit-react-pentaho";

const classes = {
  separator: css({
    height: 30,
    width: 1,
    backgroundColor: theme.colors.divider,
    margin: `0 ${theme.space.xs}`,
  }),
  toolbar: css({
    position: "relative", // for Storybook purposes
  }),
};

const Separator = () => <div className={classes.separator} />;

export const CustomStory = () => (
  <HvCanvasToolbar
    backButton={
      <HvButton aria-label="Back" icon>
        <Backwards />
      </HvButton>
    }
    title={<HvInlineEditor defaultValue="Toolbar Title" variant="title4" />}
    classes={{ root: classes.toolbar }}
  >
    <HvIconButton title="Undo">
      <Undo />
    </HvIconButton>
    <HvIconButton title="Redo">
      <Redo />
    </HvIconButton>
    <Separator />
    <HvIconButton title="Add">
      <Pod />
    </HvIconButton>
    <Separator />
    <HvButton variant="primary">Save</HvButton>
    <HvButton variant="primaryGhost">Cancel</HvButton>
    <Separator />
    <HvDropDownMenu
      placement="right"
      onClick={(e, item) => console.log(item.label)}
      dataList={[
        { label: "Label 1", icon: <User /> },
        { label: "Label 2", icon: <Calendar />, disabled: true },
        { label: "Label 3", icon: <Plane /> },
      ]}
    />
  </HvCanvasToolbar>
);
