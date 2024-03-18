import { Meta, StoryObj } from "@storybook/react";
import {
  HvAvatar,
  HvBox,
  HvButton,
  HvTooltip,
  HvTooltipProps,
  HvTypography,
  tooltipClasses,
} from "@hitachivantara/uikit-react-core";
import { Play } from "@hitachivantara/uikit-react-icons";

const meta: Meta<typeof HvTooltip> = {
  title: "Components/Tooltip/Tooltip",
  component: HvTooltip,
};
export default meta;

export const Main: StoryObj<HvTooltipProps> = {
  args: {
    open: true,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: ({ open }) => {
    return (
      <HvBox
        sx={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: 80,
        }}
      >
        <HvTooltip title="Grid View">
          <HvButton variant="secondaryGhost">Hover or focus here</HvButton>
        </HvTooltip>
        <HvTooltip title="Grid View" open={open}>
          <HvButton variant="secondaryGhost">Tooltip open</HvButton>
        </HvTooltip>
      </HvBox>
    );
  },
};

export const Disabled: StoryObj<HvTooltipProps> = {
  parameters: {
    docs: {
      description: {
        story:
          'To "hide" a Tooltip, remove its `title`; `disableFocusListener` and `disableHoverListener` disable focus or hover, respectively.',
      },
    },
  },
  render: () => (
    <HvBox
      sx={{
        display: "flex",
        justifyContent: "space-around",
        paddingTop: 100,
      }}
    >
      <HvTooltip placement="right" title="">
        <HvButton variant="secondaryGhost">No tooltip</HvButton>
      </HvTooltip>
      <HvTooltip
        disableFocusListener
        title="Focusing the button will not open me"
      >
        <HvButton variant="secondaryGhost">Focus ignored</HvButton>
      </HvTooltip>
      <HvTooltip
        disableHoverListener
        title="Hovering the button will not open me"
      >
        <HvButton variant="secondaryGhost">Hover ignored</HvButton>
      </HvTooltip>
    </HvBox>
  ),
};

export const CustomElements: StoryObj<HvTooltipProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A Tooltip can be attached to any side (see `placement`) of any element or component that holds a `ref` and spreads its props.\
        If the component doesn't do so, a workaround is to wrap it in a `div`.",
      },
    },
  },
  render: () => (
    <HvBox
      sx={{
        display: "flex",
        justifyContent: "space-around",
        padding: "60px 0",
      }}
    >
      <HvTooltip placement="right" title="Right placement">
        <HvButton>Button</HvButton>
      </HvTooltip>
      <HvTooltip placement="bottom" title="Bottom placement">
        <HvButton icon>
          <Play />
        </HvButton>
      </HvTooltip>
      <HvTooltip title="Wrapped HvAvatar">
        <HvAvatar
          role="img"
          alt="Ryan"
          src="https://avatars.githubusercontent.com/u/80?v=4"
        />
      </HvTooltip>
      <HvTooltip placement="left" title="Left placement link">
        <HvTypography
          link
          component="a"
          href="https://github.com/lumada-design/hv-uikit-react"
        >
          UI Kit
        </HvTypography>
      </HvTooltip>
    </HvBox>
  ),
};

export const CustomContent: StoryObj<HvTooltipProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A Tooltip will grow to the size of its content. Keep in mind that the Tooltip `title` labels the content `children` \
          and is not keyboard-navigable, therefore it shouldn't be too complex or contain interactable elements.",
      },
    },
  },

  render: () => {
    const longTextTooltip = (
      <span style={{ maxWidth: 250 }}>
        Tooltips can showcase truncated text. The text should be concise and not
        redundant.
      </span>
    );

    const multilineContent1 = (
      <div>
        <div className={tooltipClasses.title}>
          <HvTypography variant="label">January</HvTypography>
        </div>
        <div className={tooltipClasses.valueWrapper}>
          {[
            ["Sales", "52,000 units"],
            ["Profit", "50%"],
          ].map(([name, value]) => (
            <div key={name} className={tooltipClasses.values}>
              <HvTypography variant="label">{name}</HvTypography>
              <div className={tooltipClasses.separator} />
              <HvTypography>{value}</HvTypography>
            </div>
          ))}
        </div>
      </div>
    );

    const multilineContent2 = (
      <div className={tooltipClasses.valueWrapper}>
        {[
          ["Status", "Open"],
          ["Date", "12/08/2018"],
          ["Assignee", "Management"],
          ["Approval", "Not yet requested"],
        ].map(([name, value]) => (
          <div key={name} className={tooltipClasses.values}>
            <HvTypography variant="label">{name}</HvTypography>
            <div className={tooltipClasses.separator} />
            <HvTypography>{value}</HvTypography>
          </div>
        ))}
      </div>
    );

    return (
      <HvBox
        sx={{
          display: "flex",
          justifyContent: "space-around",
          padding: "200px 20px 0",
        }}
      >
        <HvTooltip open title={longTextTooltip}>
          <HvButton variant="secondaryGhost">Long text tooltip</HvButton>
        </HvTooltip>
        <HvTooltip open title={multilineContent1} useSingle={false}>
          <HvButton variant="secondaryGhost">Multiline content 1</HvButton>
        </HvTooltip>
        <HvTooltip open title={multilineContent2} useSingle={false}>
          <HvButton variant="secondaryGhost">Multiline content 2</HvButton>
        </HvTooltip>
      </HvBox>
    );
  },
};
