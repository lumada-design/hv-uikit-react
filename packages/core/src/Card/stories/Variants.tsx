import { css } from "@emotion/css";
import {
  HvActionBar,
  HvButton,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvCardMedia,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Level0Good,
  Level3Bad,
  LocationPin,
  WorldGlobe,
} from "@hitachivantara/uikit-react-icons";

const classes = {
  root: css({
    display: "flex",
    gap: theme.space.lg,
    flexWrap: "wrap",
  }),
  card: css({
    width: 380,
  }),
  header: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  subheader: css({
    display: "flex",
    alignItems: "center",
    "& > div": {
      width: 16,
      height: 16,
    },
  }),
  content: css({
    padding: theme.space.xs,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.atmo2,
    borderRadius: theme.radii.round,
  }),
  actions: css({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  }),
  sideActions: css({
    display: "flex",
    gap: theme.space.xs,
  }),
};

export const Variants = () => {
  return (
    <div className={classes.root}>
      <HvCard
        className={classes.card}
        bgcolor="atmo1"
        statusColor="positive"
        icon={<Level0Good iconSize="S" color="positive" />}
      >
        <HvCardMedia
          component="img"
          alt="Nature"
          height={140}
          image="https://www.ocean-retreat.com/wp-content/uploads/2018/03/original.jpg"
        />
        <HvCardContent>
          <HvTypography>
            Madeira is a stunning Portuguese archipelago known for its lush
            landscapes, mild climate, and rich wine, located in the North
            Atlantic Ocean.
          </HvTypography>
        </HvCardContent>
      </HvCard>

      <HvCard
        className={classes.card}
        bgcolor="atmo1"
        statusColor="negative"
        icon={<Level3Bad color="negative" />}
      >
        <HvCardHeader
          title={
            <HvTypography variant="title4">The island of Madeira</HvTypography>
          }
          subheader={
            <div className={classes.subheader}>
              <LocationPin iconSize="XS" />
              <HvTypography variant="caption2">Portugal</HvTypography>
            </div>
          }
        />
        <HvCardMedia
          component="img"
          alt="Nature"
          height={140}
          image="https://www.ocean-retreat.com/wp-content/uploads/2018/03/original.jpg"
        />
      </HvCard>

      <HvCard className={classes.card} bgcolor="atmo1" statusColor="warning">
        <HvCardHeader
          title="The island of Madeira"
          subheader={
            <div className={classes.subheader}>
              <LocationPin iconSize="XS" />
              <HvTypography variant="caption2">Portugal</HvTypography>
            </div>
          }
          icon={<WorldGlobe />}
        />
      </HvCard>

      <HvCard className={classes.card} bgcolor="atmo1" statusColor="neutral">
        <HvCardHeader
          title="The island of Madeira"
          subheader={
            <div className={classes.subheader}>
              <LocationPin iconSize="XS" />
              <HvTypography variant="caption2">Portugal</HvTypography>
            </div>
          }
          icon={<WorldGlobe />}
        />
        <HvCardContent>
          <HvTypography>
            Madeira is a stunning Portuguese archipelago known for its lush
            landscapes, mild climate, and rich wine, located in the North
            Atlantic Ocean.
          </HvTypography>
        </HvCardContent>
      </HvCard>

      <HvCard className={classes.card} bgcolor="atmo1" statusColor="cat1">
        <HvCardHeader
          title={
            <div className={classes.header}>
              <HvTypography variant="title4">
                The island of Madeira
              </HvTypography>
            </div>
          }
          subheader={
            <div className={classes.subheader}>
              <LocationPin iconSize="XS" />
              <HvTypography variant="caption2">Portugal</HvTypography>
            </div>
          }
          icon={<WorldGlobe />}
        />

        <HvActionBar>
          <div className={classes.actions}>
            <HvButton variant="secondaryGhost">Add to Wishlist</HvButton>
            <HvButton variant="secondarySubtle">Book Now</HvButton>
          </div>
        </HvActionBar>
      </HvCard>

      <HvCard className={classes.card} bgcolor="atmo1" statusColor="cat2">
        <HvCardContent>
          <HvTypography>
            Madeira is a stunning Portuguese archipelago known for its lush
            landscapes, mild climate, and rich wine, located in the North
            Atlantic Ocean.
          </HvTypography>
        </HvCardContent>
        <HvActionBar className={classes.actions}>
          <div className={classes.actions}>
            <HvButton variant="secondaryGhost">Add to Wishlist</HvButton>
            <HvButton variant="secondarySubtle">Book Now</HvButton>
          </div>
        </HvActionBar>
      </HvCard>
    </div>
  );
};
