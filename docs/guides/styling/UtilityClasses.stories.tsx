import {
  Alert,
  DropRightXS,
  InProgress,
} from "@hitachivantara/uikit-react-icons";
import {
  HvButton,
  HvDropdown,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

export default {
  title: "Guides/Styling/Utility Classes",
};

export const LayoutAndTheme = () => (
  <section className="flex flex-row w-500px justify-center gap-sm p-sm">
    <div className="w-10 h-10 rounded bg-positive" />
    <div className="w-11 h-11 rounded bg-warning" />
    <div className="w-12 h-12 rounded bg-negative" />
    <div className="w-12 h-12 rounded bg-primary_20" />
  </section>
);

export const Breakpoints = () => (
  <section className="grid gap-xs grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
    {[...Array(12).keys()].map((i) => (
      <div key={i} className="h-10 bg-atmo3 flex items-center justify-center">
        <HvTypography variant="title3">{i + 1}</HvTypography>
      </div>
    ))}
  </section>
);

export const OverridingClasses = () => (
  <HvDropdown
    label="Label"
    values={[{ label: "Val1" }, { label: "Val2" }]}
    classes={{
      root: "w-200px",
      label: "color-primary",
      placeholder: "color-primary",
    }}
  />
);

export const Animations = () => (
  <div className="flex gap-xs">
    <HvButton icon>
      <DropRightXS className="transition-transform hover:rotate-90" />
    </HvButton>
    <HvButton icon>
      <Alert className="hover:animate-swing" />
    </HvButton>
    <InProgress className="animate-spin" />
  </div>
);
