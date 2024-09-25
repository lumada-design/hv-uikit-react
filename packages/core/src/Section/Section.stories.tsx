import { useMemo, useState } from "react";
import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvSwitch,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Duplicate, Ticket } from "@hitachivantara/uikit-react-icons";
import { HvDonutChart, HvVizProvider } from "@hitachivantara/uikit-react-viz";

import { HvActionsGeneric } from "../ActionsGeneric";
import { HvButton } from "../Button";
import { HvSection, HvSectionProps } from "./Section";

const meta: Meta<typeof HvSection> = {
  title: "Widgets/Section",
  component: HvSection,
};
export default meta;

export const Main: StoryObj<HvSectionProps> = {
  args: {
    title: "Section Title",
    expandable: false,
    defaultExpanded: true,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: ({ title, ...others }) => {
    const wrappedTitle = <HvTypography variant="title4">{title}</HvTypography>;
    return (
      <HvSection title={wrappedTitle} {...others}>
        <HvTypography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
          blandit ipsum quis sollicitudin. Aliquam erat volutpat. Praesent nisi
          nisl, sodales vitae blandit tincidunt, malesuada id sapien. Nulla
          dapibus accumsan est, a pharetra velit consequat et. Nullam iaculis
          justo sed urna condimentum ultricies. Integer nec interdum tortor.
          Nulla molestie nibh in elit congue malesuada. Donec fringilla volutpat
          sapien id maximus. Vestibulum faucibus pellentesque ex, non gravida
          dui pharetra quis. Nulla facilisi. Suspendisse erat nisl, mollis ut
          est nec, malesuada feugiat orci. Vivamus dignissim nibh id lacinia
          vehicula. Nullam lobortis scelerisque dui, non suscipit sapien
          tincidunt at. Vivamus ut orci imperdiet, volutpat mauris in, sagittis
          mi. Donec pulvinar nibh sit amet neque tristique, vitae gravida ipsum
          dapibus. Donec a eros commodo, tincidunt nunc dictum, ullamcorper
          quam.
        </HvTypography>
      </HvSection>
    );
  },
};

export const WithActions: StoryObj<HvSectionProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "You can use whatever you want as actions. This example showcases the use of the `HvActionsGeneric` component.",
      },
    },
    a11y: {
      config: {
        rules: [
          { id: "aria-allowed-attr", enabled: false },
          { id: "aria-prohibited-attr", enabled: false },
          { id: "color-contrast", enabled: false },
        ],
      },
    },
  },
  render: () => {
    const classes = {
      container: css({
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: theme.space.sm,
      }),
      root: css({ position: "relative", height: "100%" }),
      content: css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }),
    };

    const data = {
      Country: ["Portugal", "Spain", "France", "Germany"],
      "Tickets Sold": [61829, 123948, 253792, 524638],
    };

    const actions = useMemo(
      () => (
        <HvActionsGeneric
          actions={[
            { id: "action1", label: "Action 1" },
            {
              id: "action2",
              label: "Action 2",
            },
            {
              id: "action3",
              label: "Action 3",
            },
          ]}
          onAction={(event, action) => {
            console.log(action.label);
          }}
          maxVisibleActions={1}
        />
      ),
      [],
    );

    return (
      <HvSection
        title={
          <HvTypography variant="title4">Section with actions</HvTypography>
        }
        actions={actions}
      >
        <div className={classes.container}>
          <HvTypography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
            blandit ipsum quis sollicitudin. Aliquam erat volutpat. Praesent
            nisi nisl, sodales vitae blandit tincidunt, malesuada id sapien.
            Nulla dapibus accumsan est, a pharetra velit consequat et. Nullam
            iaculis justo sed urna condimentum ultricies. Integer nec interdum
            tortor. Nulla molestie nibh in elit congue malesuada. Donec
            fringilla volutpat sapien id maximus. Vestibulum faucibus
            pellentesque ex, non gravida dui pharetra quis. Nulla facilisi.
            Suspendisse erat nisl, mollis ut est nec, malesuada feugiat orci.
            Vivamus dignissim nibh id lacinia vehicula.
          </HvTypography>

          <div className={classes.root}>
            <HvVizProvider>
              <HvDonutChart
                data={data}
                groupBy="Country"
                measure="Tickets Sold"
              />
            </HvVizProvider>
            <div className={classes.content}>
              <Ticket iconSize="M" />
              <HvTypography variant="title3">
                {data["Tickets Sold"].reduce((acc, value) => acc + value, 0)}
              </HvTypography>
            </div>
          </div>
        </div>
      </HvSection>
    );
  },
};

export const NoHeader: StoryObj<HvSectionProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "This sample showcases an example of a Section with just the content.",
      },
    },
  },
  render: () => {
    return (
      <HvSection>
        <HvTypography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
          blandit ipsum quis sollicitudin. Aliquam erat volutpat. Praesent nisi
          nisl, sodales vitae blandit tincidunt, malesuada id sapien. Nulla
          dapibus accumsan est, a pharetra velit consequat et. Nullam iaculis
          justo sed urna condimentum ultricies. Integer nec interdum tortor.
          Nulla molestie nibh in elit congue malesuada. Donec fringilla volutpat
          sapien id maximus. Vestibulum faucibus pellentesque ex, non gravida
          dui pharetra quis. Nulla facilisi. Suspendisse erat nisl, mollis ut
          est nec, malesuada feugiat orci. Vivamus dignissim nibh id lacinia
          vehicula.
        </HvTypography>
      </HvSection>
    );
  },
};

export const Multiple: StoryObj<HvSectionProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "This sample showcases an example where multiple sections are used together.",
      },
    },
  },
  render: () => {
    const [openIds, setOpenIds] = useState<string[]>([]);
    const [multiple, setMultiple] = useState(false);
    const sections = useMemo(
      () => [
        { id: "1", title: "Section 1", content: "Section 1 content." },
        { id: "2", title: "Section 2", content: "Section 2 content." },
        { id: "3", title: "Section 3", content: "Section 3 content." },
        { id: "4", title: "Section 4", content: "Section 4 content." },
        { id: "5", title: "Section 5", content: "Section 5 content." },
        { id: "6", title: "Section 6", content: "Section 6 content." },
      ],
      [],
    );

    const classes = {
      section: css({
        marginBottom: theme.space.sm,
      }),
    };

    return (
      <>
        <HvSwitch
          label="Allow multiple sections open"
          checked={multiple}
          defaultChecked={false}
          onChange={(_evt, newChecked) => setMultiple(newChecked)}
        />
        {sections.map((s) => (
          <div key={s.id} className={classes.section}>
            <HvSection
              id={s.id}
              title={<HvTypography variant="title4">{s.title}</HvTypography>}
              expandable
              expanded={openIds.includes(s.id)}
              actions={
                <HvButton
                  variant="primaryGhost"
                  startIcon={<Duplicate />}
                  onClick={() => console.log(`Link to ${s.title} copied`)}
                >
                  Copy Link
                </HvButton>
              }
              onToggle={(event, open) =>
                setOpenIds((ids) => {
                  if (!multiple) {
                    if (open) {
                      return [s.id];
                    }
                    return [];
                  }
                  if (open) {
                    return [...ids, s.id];
                  }
                  return ids.filter((i) => i !== s.id);
                })
              }
            >
              <HvTypography>{s.content}</HvTypography>
            </HvSection>
          </div>
        ))}
      </>
    );
  },
};

export const Test: StoryObj = {
  parameters: {
    docs: { disable: true },
    a11y: {
      config: {
        rules: [{ id: "landmark-unique", enabled: false }],
      },
    },
  },
  render: () => (
    <>
      <HvSection
        title={<HvTypography variant="title4">My Section</HvTypography>}
        actions={<HvButton variant="primaryGhost">Action</HvButton>}
      >
        <HvTypography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
          blandit ipsum quis sollicitudin. Aliquam erat volutpat. Praesent nisi
          nisl, sodales vitae blandit tincidunt, malesuada id sapien. Nulla
          dapibus accumsan est, a pharetra velit consequat et. Nullam iaculis
          justo sed urna condimentum ultricies. Integer nec interdum tortor.
          Nulla molestie nibh in elit congue malesuada. Donec fringilla volutpat
          sapien id maximus. Vestibulum faucibus pellentesque ex, non gravida
          dui pharetra quis.
        </HvTypography>
      </HvSection>
      <HvSection>
        <HvTypography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
          blandit ipsum quis sollicitudin. Aliquam erat volutpat. Praesent nisi
          nisl, sodales vitae blandit tincidunt, malesuada id sapien. Nulla
          dapibus accumsan est, a pharetra velit consequat et.
        </HvTypography>
      </HvSection>
      <HvSection expandable title="My Section">
        <HvTypography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
          blandit ipsum quis sollicitudin. Aliquam erat volutpat. Praesent nisi
          nisl, sodales vitae blandit tincidunt, malesuada id sapien. Nulla
          dapibus accumsan est, a pharetra velit consequat et.
        </HvTypography>
      </HvSection>
      <HvSection raisedHeader expandable title="My Section">
        <HvTypography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
          blandit ipsum quis sollicitudin. Aliquam erat volutpat. Praesent nisi
          nisl, sodales vitae blandit tincidunt, malesuada id sapien. Nulla
          dapibus accumsan est, a pharetra velit consequat et.
        </HvTypography>
      </HvSection>
      <HvSection
        expandable
        expanded={false}
        title="My Section"
        actions={<HvButton variant="primaryGhost">Action</HvButton>}
      >
        <HvTypography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
          blandit ipsum quis sollicitudin. Aliquam erat volutpat. Praesent nisi
          nisl, sodales vitae blandit tincidunt, malesuada id sapien. Nulla
          dapibus accumsan est, a pharetra velit consequat et.
        </HvTypography>
      </HvSection>
    </>
  ),
};
