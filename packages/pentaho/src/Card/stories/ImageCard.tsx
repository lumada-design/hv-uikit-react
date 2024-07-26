import { css } from "@emotion/css";
import { HvTypography, theme } from "@hitachivantara/uikit-react-core";
import { HvCard, HvCardMedia } from "@hitachivantara/uikit-react-pentaho";

const classes = {
  root: css({
    display: "flex",
    flexDirection: "row",
    gap: theme.space.xs,
    marginTop: theme.space.xs,
  }),
  content: css({
    display: "flex",
    flexDirection: "column",
    gap: theme.space.xs,
  }),
};

interface ImageCardProps {
  title: string;
  description?: string;
  image: string;
}

export const ImageCard = ({ title, description, image }: ImageCardProps) => {
  return (
    <HvCard>
      <HvCardMedia src={image} />
      <div className={classes.root}>
        <div className={classes.content}>
          <HvTypography variant="title4">{title}</HvTypography>
          <HvTypography variant="caption1">{description}</HvTypography>
        </div>
      </div>
    </HvCard>
  );
};
