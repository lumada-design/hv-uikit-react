import { useState } from "react";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvBadge,
  HvSimpleGrid,
  HvTab,
  HvTabProps,
  HvTabs,
  HvTabsProps,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Alert,
  Calendar,
  DataStore,
  Helicopter,
  Reload,
} from "@hitachivantara/uikit-react-icons";

const meta: Meta<typeof HvTabs> = {
  title: "Components/Tabs",
  component: HvTabs,
  // @ts-expect-error https://github.com/storybookjs/storybook/issues/20782
  subcomponents: { HvTab },
};
export default meta;

export const Main: StoryObj<HvTabsProps> = {
  args: {},
  argTypes: {
    onChange: { control: { disable: true } },
    value: { control: { disable: true } },
    classes: { control: { disable: true } },
  },
  render: () => {
    const [value, setValue] = useState(0);

    return (
      <HvTabs value={value} onChange={(_, newValue) => setValue(newValue)}>
        <HvTab label="Clickable tab 1" />
        <HvTab label="Clickable tab 2" />
        <HvTab label="Clickable tab 3" />
      </HvTabs>
    );
  },
};

export const FullWidth: StoryObj<HvTabsProps> = {
  parameters: {
    docs: {
      description: {
        story: "Tabs occupying the full width of the available space.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(0);

    return (
      <HvTabs
        variant="fullWidth"
        value={value}
        onChange={(_, val) => setValue(val)}
      >
        <HvTab label="Clickable tab 1" />
        <HvTab label="Clickable tab 2" />
        <HvTab label="Clickable tab 3" />
      </HvTabs>
    );
  },
};

export const ContentChanging: StoryObj<HvTabsProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Tabs changing the content to display according to the selected tab.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(0);

    return (
      <>
        <HvTabs value={value} onChange={(_, val) => setValue(val)}>
          <HvTab label="Clickable tab 1" />
          <HvTab label="Clickable tab 2" />
          <HvTab label="Clickable tab 3" />
        </HvTabs>
        <HvTypography style={{ padding: 16 }}>{`Page ${value}`}</HvTypography>
      </>
    );
  },
};

export const TextSize: StoryObj<HvTabsProps> = {
  render: () => {
    const [value, setValue] = useState(0);

    const StyledHvTab = styled(HvTab, { label: "StyledHvTab" })({
      ...theme.typography.title2,
      minHeight: 48,
    });

    return (
      <HvTabs value={value} onChange={(_, val) => setValue(val)}>
        <StyledHvTab label="Large tab 1" />
        <StyledHvTab disabled label="Large tab 2" />
        <StyledHvTab label="Large tab 3" />
      </HvTabs>
    );
  },
};

export const CenteredTabs: StoryObj<HvTabsProps> = {
  render: () => {
    const [value, setValue] = useState(0);

    return (
      <HvTabs
        value={value}
        onChange={(_, val) => setValue(val)}
        classes={{ flexContainer: css({ justifyContent: "center" }) }}
      >
        <HvTab label="Clickable tab 1" />
        <HvTab label="Clickable tab 2" />
        <HvTab label="Clickable tab 3" />
      </HvTabs>
    );
  },
};

export const WithBadges: StoryObj<HvTabsProps> = {
  parameters: {
    docs: {
      description: {
        story: "Badges applied to Tabs component.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(0);

    const StyledHvTab = styled(HvTab, { label: "StyledHvTab" })({
      minHeight: 48,
      justifyContent: "center",
      "& div p": {
        ...theme.typography.title3,
        fontWeight: 400,
      },
      "&.Mui-selected": {
        "& div p": {
          fontWeight: 600,
        },
      },
    });

    return (
      <HvTabs value={value} onChange={(_, val) => setValue(val)}>
        <StyledHvTab
          label={<HvBadge showCount count={2} text="Track events" />}
        />
        <StyledHvTab label={<HvBadge count={1} text="Vehicle events" />} />
      </HvTabs>
    );
  },
};

export const Icons: StoryObj<HvTabsProps> = {
  render: () => {
    const [value, setValue] = useState(0);

    const handleChange: HvTabsProps["onChange"] = (_, newValue) => {
      setValue(newValue);
    };

    return (
      <>
        <HvTabs value={value} onChange={handleChange}>
          <HvTab
            label="Clickable tab 1"
            icon={<DataStore />}
            iconPosition="start"
          />
          <HvTab
            label="Clickable tab 2"
            icon={<DataStore />}
            iconPosition="start"
          />
          <HvTab
            label="Clickable tab 3"
            icon={<DataStore />}
            iconPosition="start"
          />
        </HvTabs>
        <br />
        <HvTabs value={value} onChange={handleChange}>
          <HvTab
            label="Clickable tab 1"
            icon={<Helicopter />}
            iconPosition="top"
          />
          <HvTab
            label="Clickable tab 2"
            icon={<Helicopter />}
            iconPosition="top"
          />
          <HvTab
            label="Clickable tab 3"
            icon={<Helicopter />}
            iconPosition="top"
          />
        </HvTabs>
        <br />
        <HvTabs value={value} onChange={handleChange}>
          <HvTab icon={<Alert />} aria-label="Alert" />
          <HvTab icon={<Reload />} aria-label="Reload" />
          <HvTab icon={<Calendar />} aria-label="Calendar" />
        </HvTabs>
      </>
    );
  },
};

export const Test: StoryObj = {
  parameters: {
    docs: { disable: true },
  },
  render: () => (
    <HvSimpleGrid
      cols={3}
      style={{ alignItems: "start", justifyContent: "start" }}
    >
      <HvTabs value={0}>
        <HvTab label="Clickable tab 1" />
        <HvTab label="Clickable tab 2" />
        <HvTab disabled label="Clickable tab 3" />
      </HvTabs>
      <HvTabs value={0} variant="fullWidth">
        <HvTab label="Clickable tab 1" />
        <HvTab label="Clickable tab 2" />
        <HvTab disabled label="Clickable tab 3" />
      </HvTabs>
      <HvTabs value={0}>
        <HvTab
          label="Clickable tab 1"
          icon={<DataStore />}
          iconPosition="start"
        />
        <HvTab
          label="Clickable tab 2"
          icon={<DataStore />}
          iconPosition="start"
        />
        <HvTab
          disabled
          label="Clickable tab 3"
          icon={<DataStore />}
          iconPosition="start"
        />
      </HvTabs>
      <HvTabs value={0}>
        <HvTab
          label="Clickable tab 1"
          icon={<Helicopter />}
          iconPosition="top"
        />
        <HvTab
          label="Clickable tab 2"
          icon={<Helicopter />}
          iconPosition="top"
        />
        <HvTab
          disabled
          label="Clickable tab 3"
          icon={<Helicopter />}
          iconPosition="top"
        />
      </HvTabs>
      <HvTabs value={0}>
        <HvTab icon={<Alert />} aria-label="Alert" />
        <HvTab icon={<Reload />} aria-label="Reload" />
        <HvTab disabled icon={<Calendar />} aria-label="Calendar" />
      </HvTabs>
      <HvTabs value={0}>
        <HvTab label={<HvBadge showCount count={2} text="Track events" />} />
        <HvTab label={<HvBadge count={1} text="Vehicle events" />} />
      </HvTabs>
    </HvSimpleGrid>
  ),
};

export const Floating: StoryObj<HvTabsProps> = {
  parameters: {
    docs: {
      description: {
        story: "Tabs in the floating format.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(0);

    const CustomTab = ({ ...props }: HvTabProps) => (
      <HvTab
        className={css({
          height: 56,
          paddingLeft: 24,
          paddingRight: 24,
          "& .MuiTab-iconWrapper": {
            "--size": "24px",
          },
        })}
        {...props}
      />
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <HvTabs floating value={value} onChange={(_, val) => setValue(val)}>
          <HvTab
            label="Clickable tab 1"
            icon={<DataStore />}
            iconPosition="start"
          />
          <HvTab
            label="Clickable tab 2"
            icon={<DataStore />}
            iconPosition="start"
          />
          <HvTab
            label="Clickable tab 3"
            icon={<DataStore />}
            iconPosition="start"
          />
        </HvTabs>
        <HvTabs floating value={value} onChange={(_, val) => setValue(val)}>
          <CustomTab
            label="Clickable tab 1"
            icon={<Helicopter />}
            iconPosition="top"
          />
          <CustomTab
            label="Clickable tab 2"
            icon={<Helicopter />}
            iconPosition="top"
          />
          <CustomTab
            label="Clickable tab 3"
            icon={<Helicopter />}
            iconPosition="top"
          />
        </HvTabs>
        <HvTabs floating value={value} onChange={(_, val) => setValue(val)}>
          <HvTab icon={<Alert />} aria-label="Alert" />
          <HvTab icon={<Reload />} aria-label="Reload" />
          <HvTab icon={<Calendar />} aria-label="Calendar" />
        </HvTabs>
        <HvTabs floating value={value} onChange={(_, val) => setValue(val)}>
          <HvTab
            icon={<Alert />}
            aria-label="Alert"
            className={css({ height: 48 })}
          />
          <HvTab
            icon={<Reload />}
            aria-label="Reload"
            className={css({ height: 48 })}
          />
          <HvTab
            icon={<Calendar />}
            aria-label="Calendar"
            className={css({ height: 48 })}
          />
        </HvTabs>
        <HvTabs floating value={value} onChange={(_, val) => setValue(val)}>
          <HvTab
            icon={<Alert />}
            aria-label="Alert"
            className={css({ height: 64 })}
          />
          <HvTab
            icon={<Reload />}
            aria-label="Reload"
            className={css({ height: 64 })}
          />
          <HvTab
            icon={<Calendar />}
            aria-label="Calendar"
            className={css({ height: 64 })}
          />
        </HvTabs>
      </div>
    );
  },
};
