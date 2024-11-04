import clsx from "clsx";
import {
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvCardMedia,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  media?: React.ReactNode;
};

export const Card = ({ children, title, subtitle, media, icon }: CardProps) => {
  return (
    <HvCard
      className={clsx(
        "!bg-white dark:!bg-[var(--uikit-colors-atmo1)]",
        "dark:!outline-[var(--uikit-colors-atmo4)]",
      )}
    >
      <HvCardHeader
        title={<HvTypography variant="title3">{title}</HvTypography>}
        subheader={<HvTypography variant="caption1">{subtitle}</HvTypography>}
        icon={icon}
        className="mx-1 mt-1"
      />
      {media && <HvCardMedia className="my-1">{media}</HvCardMedia>}
      <HvCardContent className="!px-3">{children}</HvCardContent>
    </HvCard>
  );
};
