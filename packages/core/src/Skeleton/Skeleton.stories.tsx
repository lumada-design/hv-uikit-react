import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvActionBar,
  HvActionsGeneric,
  HvAvatar,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvCardMedia,
  HvCheckBox,
  HvRadio,
  HvRadioGroup,
  HvSkeleton,
  HvSkeletonProps,
  HvSwitch,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

import { CustomSkeleton } from "./CustomSkeleton";
import CustomSkeletonRaw from "./CustomSkeleton?raw";

const meta: Meta<typeof HvSkeleton> = {
  title: "Components/Skeleton",
  component: HvSkeleton,
};
export default meta;

export const Main: StoryObj<HvSkeletonProps> = {
  args: {
    width: 150,
    hidden: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: ({ hidden, ...args }) => {
    return (
      <HvTypography>
        {!hidden ? <HvSkeleton {...args} /> : "This is my text"}
      </HvTypography>
    );
  },
};

export const Variants: StoryObj<HvSkeletonProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "The `HvSkeleton` component can have different variants to represent different shapes and sizes.",
      },
    },
  },
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.space.sm,
        }}
      >
        <HvSkeleton variant="square" width={100} animation="wave">
          <HvTypography>Test</HvTypography>
        </HvSkeleton>

        <HvSkeleton variant="text" width={100} animation="wave">
          <HvTypography>Test</HvTypography>
        </HvSkeleton>

        <HvSkeleton variant="circle" animation="wave">
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
        </HvSkeleton>
      </div>
    );
  },
};

export const Card: StoryObj<HvSkeletonProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "This sample illustrates a more complex use case where you can test the two animations available in the `HvSkeleton` component. \
          You can view a working example of this sample in the Asset Inventory template.",
      },
    },
  },
  render: () => {
    const [loading, setLoading] = useState(true);
    const [mode, setMode] = useState<"wave" | "pulse">("wave");

    return (
      <>
        <div
          style={{ display: "flex", flexDirection: "row", gap: theme.space.lg }}
        >
          <HvRadioGroup
            label="Animation type"
            onChange={(_, value) => setMode(value)}
            orientation="horizontal"
            style={{ marginBottom: 20 }}
          >
            <HvRadio label="Wave" value="wave" checked={mode === "wave"} />
            <HvRadio label="Pulse" value="pulse" checked={mode === "pulse"} />
          </HvRadioGroup>
          <HvSwitch
            label="Show content"
            onChange={() => setLoading((prev) => !prev)}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <HvCard
              bgcolor="atmo1"
              key={`card-${i}`}
              style={{ width: "100%" }}
              statusColor="sema0"
            >
              <HvCardHeader
                title={
                  <HvSkeleton hidden={!loading} animation={mode} width={150}>
                    <HvTypography variant="title4">{`Event ${
                      i + 1
                    }`}</HvTypography>
                  </HvSkeleton>
                }
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ width: "50%" }}>
                  <HvCardContent>
                    <HvSkeleton hidden={!loading} animation={mode} width={100}>
                      <HvTypography variant="label">Event</HvTypography>
                    </HvSkeleton>
                    <HvSkeleton hidden={!loading} animation={mode} width={100}>
                      <HvTypography noWrap>{`Anomaly detection ${
                        i + 1
                      }`}</HvTypography>
                    </HvSkeleton>
                  </HvCardContent>
                  <HvCardContent>
                    <HvSkeleton hidden={!loading} animation={mode} width={100}>
                      <HvTypography variant="label">Severity</HvTypography>
                    </HvSkeleton>
                    <HvSkeleton hidden={!loading} animation={mode} width={100}>
                      <HvTypography noWrap>Average</HvTypography>
                    </HvSkeleton>
                  </HvCardContent>
                </div>
                <div style={{ width: "50%" }}>
                  <HvCardContent>
                    <HvSkeleton hidden={!loading} animation={mode} width={100}>
                      <HvTypography variant="label">Status</HvTypography>
                    </HvSkeleton>
                    <HvSkeleton hidden={!loading} animation={mode} width={100}>
                      <HvTypography noWrap>Open</HvTypography>
                    </HvSkeleton>
                  </HvCardContent>
                  <HvCardContent>
                    <HvSkeleton hidden={!loading} animation={mode} width={100}>
                      <HvTypography variant="label">Priority</HvTypography>
                    </HvSkeleton>
                    <HvSkeleton hidden={!loading} animation={mode} width={100}>
                      <HvTypography noWrap>Low</HvTypography>
                    </HvSkeleton>
                  </HvCardContent>
                </div>
              </div>
              <HvSkeleton
                hidden={!loading}
                width="auto"
                variant="square"
                animation={mode}
                backgroundImage="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
              >
                <HvCardMedia
                  component="img"
                  alt="just an image"
                  height={140}
                  image="https://dyj7luh3166cu.cloudfront.net/wp-content/uploads/sites/8/2016/02/Himalayas.jpg"
                />
              </HvSkeleton>
              <HvActionBar>
                <HvSkeleton hidden={!loading} variant="square" animation={mode}>
                  <HvCheckBox
                    value="value"
                    inputProps={{ "aria-label": "Tick to select the card" }}
                  />
                </HvSkeleton>
                <div style={{ flex: 1 }} />
                <HvSkeleton hidden={!loading} variant="square" animation={mode}>
                  <HvActionsGeneric
                    actions={[{ id: "view1", label: "View" }]}
                  />
                </HvSkeleton>
              </HvActionBar>
            </HvCard>
          ))}
        </div>
      </>
    );
  },
};

export const CustomAnimation: StoryObj<HvSkeletonProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "The `HvSkeleton` component can be customized with a custom animation if none of the default animations fit your needs.",
      },
      source: {
        code: CustomSkeletonRaw,
      },
    },
  },
  render: () => <CustomSkeleton />,
};
