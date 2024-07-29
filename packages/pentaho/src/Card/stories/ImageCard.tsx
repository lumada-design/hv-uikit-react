import { css } from "@emotion/css";
import { HvTypography, theme } from "@hitachivantara/uikit-react-core";
import {
  HvCard,
  HvCardMedia,
  HvCardSection,
} from "@hitachivantara/uikit-react-pentaho";

const classes = {
  root: css({
    display: "flex",
    flexDirection: "row",
    gap: theme.space.xs,
  }),
  content: css({
    display: "flex",
    flexDirection: "column",
    gap: theme.space.xs,
  }),
};

interface ImageCardProps {
  title?: string;
  description?: string;
  image: string;
}

export const ImageCard = ({ title, description, image }: ImageCardProps) => {
  return (
    <HvCard>
      {title && (
        <HvCardSection>
          <HvTypography variant="title4">{title}</HvTypography>
        </HvCardSection>
      )}
      <HvCardMedia src={image} />
      {description && (
        <HvCardSection>
          <div className={classes.root}>
            <div className={classes.content}>
              <HvTypography variant="caption1">{description}</HvTypography>
            </div>
          </div>
        </HvCardSection>
      )}
    </HvCard>
  );
};
