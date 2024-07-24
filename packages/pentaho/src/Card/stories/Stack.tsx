import { css } from "@emotion/css";
import {
  HvColorAny,
  HvStack,
  HvTag,
  HvTagsInput,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Copy, Delete, MoveFile, Tag } from "@hitachivantara/uikit-react-icons";

import { ButtonCard } from "./ButtonCard";
import { SimpleCard } from "./SimpleCard";
import { SwitchCard } from "./SwitchCard";

const classes = {
  root: css({
    display: "flex",
    flexDirection: "row",
    gap: theme.space.md,
  }),
  stack: css({
    width: 350,
  }),
  tags: css({
    display: "flex",
    flexDirection: "row",
    gap: theme.space.xs,
    marginTop: theme.space.xs,
    alignItems: "center",
  }),
};

const iconWrapper = (icon: React.ReactNode, backgroundColor: HvColorAny) => (
  <div
    style={{
      height: 32,
      width: 32,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: `1px solid ${theme.colors.atmo1}`,
      borderRadius: theme.radii.circle,
      backgroundColor,
    }}
  >
    {icon}
  </div>
);

export const StackStory = () => (
  <div className={classes.root}>
    <HvStack withNavigation className={classes.stack}>
      <ButtonCard
        title="Get Started"
        description="Click here to get started with UI Kit."
        target="_parent"
        href="/?path=/docs/overview-get-started--docs"
      />
      <ButtonCard
        title="Migration Guide"
        description="Click here to get see how to migrate from a previous version of UI Kit."
        target="_parent"
        href="/?path=/docs/overview-migration-from-v4-x--docs"
      />
    </HvStack>
    <HvStack withNavigation className={classes.stack}>
      <SimpleCard
        title="Move Data"
        description="Move data to the destination and delete it from the original source."
        icon={iconWrapper(
          <MoveFile iconSize="XS" color={["positive"]} />,
          theme.colors.positive_20,
        )}
      />
      <SimpleCard
        title="Duplicate Data"
        description="A copy of the selected data will be created in the chosen destination."
        icon={iconWrapper(
          <Copy iconSize="XS" color={["neutral"]} />,
          theme.colors.neutral_20,
        )}
      />
      <SimpleCard
        title="Purge Data"
        description="Permanently delete the data during the migration process."
        icon={iconWrapper(
          <Delete iconSize="XS" color={["negative"]} />,
          theme.colors.negative_20,
        )}
      />
    </HvStack>
    <HvStack withNavigation className={classes.stack}>
      <SwitchCard
        title="Tag Source"
        description="Add a tag so people know why the dt was moved."
        icon={iconWrapper(
          <Tag iconSize="XS" color={["cat1"]} />,
          theme.colors.cat1_20,
        )}
      >
        <HvTagsInput />
        <div className={classes.tags}>
          <HvTypography variant="caption1">Last used:</HvTypography>
          <div>
            <HvTag label="Testing" />
            <HvTag label="Lorem ipsum" />
          </div>
        </div>
      </SwitchCard>
      <SwitchCard
        title="Tag Destination"
        description="Add a tag so people know why the dt was moved."
        icon={iconWrapper(
          <Tag iconSize="XS" color={["cat2"]} />,
          theme.colors.cat2_20,
        )}
      >
        <HvTagsInput />
        <div className={classes.tags}>
          <HvTypography variant="caption1">Last used:</HvTypography>
          <div>
            <HvTag label="Testing" />
            <HvTag label="Lorem ipsum" />
          </div>
        </div>
      </SwitchCard>
    </HvStack>
  </div>
);
