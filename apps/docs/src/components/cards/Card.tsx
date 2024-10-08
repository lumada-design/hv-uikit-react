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
        "shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]",
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
