import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
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
import {
  HvCanvasToolbar,
  HvCanvasToolbarProps,
} from "@hitachivantara/uikit-react-lab";

const meta: Meta<typeof HvCanvasToolbar> = {
  title: "Lab/Canvas/Toolbar",
  component: HvCanvasToolbar,
};
export default meta;

export const Main: StoryObj<HvCanvasToolbarProps> = {
  args: {
    title: "Toolbar Title",
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          backgroundColor: theme.palette.slate[950],
          padding: 20,
        }}
      >
        <HvCanvasToolbar {...args}>
          <HvButton variant="primary">Save</HvButton>
          <HvButton variant="primaryGhost">Cancel</HvButton>
        </HvCanvasToolbar>
      </div>
    );
  },
};

export const Custom: StoryObj<HvCanvasToolbarProps> = {
  render: () => {
    const classes = {
      separator: css({
        height: 30,
        width: 1,
        backgroundColor: theme.colors.atmo4,
        margin: `0 ${theme.space.xs}`,
      }),
      toolbar: css({
        position: "absolute",
        top: 10,
      }),
    };
    const backButton = (
      <HvButton aria-label="Back" icon>
        <Backwards />
      </HvButton>
    );

    const title = <HvInlineEditor value="Toolbar Title" variant="title4" />;

    const Separator = () => <div className={classes.separator} />;

    const renderIcon = (Icon: React.ElementType) => () => <Icon />;

    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
      >
        <HvCanvasToolbar
          backButton={backButton}
          title={title}
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
              { label: "Label 1", icon: renderIcon(User) },
              { label: "Label 2", icon: renderIcon(Calendar), disabled: true },
              { label: "Label 3", icon: renderIcon(Plane) },
            ]}
          />
        </HvCanvasToolbar>
      </div>
    );
  },
};
