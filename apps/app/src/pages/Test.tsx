import { HvButton, HvButtonProps } from "@hitachivantara/uikit-react-core";
import { Pause, Play, Stop } from "@hitachivantara/uikit-react-icons";

const VariantGroup = ({ color, children, ...others }: HvButtonProps) => {
  const variantProps = ["contained", "subtle", "ghost"] as const;

  return variantProps.map((type) => (
    <HvButton
      key={type}
      className="capitalize"
      color={color}
      type={type}
      {...others}
    >
      {children ?? `${color} ${type === "contained" ? "" : type}`}
    </HvButton>
  ));
};

const Buttons = () => (
  <div className="grid grid-cols-6 auto-cols-min gap-sm max-w-1200px">
    <VariantGroup color="primary" />
    <VariantGroup color="secondary" />
    <VariantGroup color="positive" />
    <VariantGroup color="warning" />
    <VariantGroup color="negative" />
    <VariantGroup disabled color="primary" />
    <VariantGroup disabled color="warning" />
    <VariantGroup color="lightcyan" />
    <VariantGroup color="rebeccapurple" />
    <VariantGroup color="primary" startIcon={<Play />} />

    <VariantGroup color="primary">
      <Play />
    </VariantGroup>
    <VariantGroup color="positive">
      <Play />
    </VariantGroup>

    <VariantGroup color="warning" startIcon={<Play />}>
      Start
    </VariantGroup>
    <VariantGroup disabled color="warning" startIcon={<Play />}>
      Start
    </VariantGroup>
    <VariantGroup color="warning" endIcon={<Pause />}>
      End
    </VariantGroup>

    <VariantGroup color="warning" startIcon={<Play />} />
    <VariantGroup color="warning" startIcon={<Stop />} />

    <VariantGroup startIcon={<Play />} color="primary" size="lg" />
    <VariantGroup startIcon={<Play />} color="primary" size="sm" />
    <VariantGroup icon color="primary" size="sm">
      <Play />
    </VariantGroup>
    <VariantGroup icon color="primary" size="lg">
      <Play />
    </VariantGroup>

    <HvButton variant="semantic">Semantic</HvButton>
  </div>
);

export const Component = () => {
  return (
    <div className="grid gap-lg">
      <Buttons />
    </div>
  );
};
