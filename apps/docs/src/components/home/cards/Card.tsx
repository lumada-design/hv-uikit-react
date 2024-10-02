import {
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvCardMedia,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

export const Card = ({
  children,
  title,
  subtitle,
  media,
  icon,
}: {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  media?: React.ReactNode;
}) => {
  return (
    <HvCard classes={{ root: "bg-white" }}>
      <HvCardHeader
        title={<HvTypography variant="title3">{title}</HvTypography>}
        subheader={<HvTypography variant="caption1">{subtitle}</HvTypography>}
        icon={icon}
        classes={{
          root: "mx-1 mt-1",
        }}
      />
      {media && <HvCardMedia classes={{ root: "my-1" }}>{media}</HvCardMedia>}
      <HvCardContent classes={{ content: "px-3" }}>{children}</HvCardContent>
    </HvCard>
  );
};
