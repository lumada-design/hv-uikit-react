import {
  HvButton,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvContainer,
  HvSimpleGrid,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import {
  Bold,
  Code,
  ColorPicker,
  Components,
  Favorite,
  FontSize,
  FontSizeBigger,
  PaintBucket,
  Preview,
  Template,
  ThemeSwitcher,
  Tool,
} from "@hitachivantara/uikit-react-icons";

import { useGeneratorContext } from "../generator/GeneratorContext";

const Entry = ({
  title,
  icon,
  children,
}: {
  title: React.ReactNode;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="flex align-start mb-xs">
    <div className="flex items-center gap-xs mr-sm min-w-[140px]">
      {icon}
      <HvTypography variant="title4">{title}</HvTypography>
    </div>
    <HvTypography>{children}</HvTypography>
  </div>
);

export const Component = () => {
  const { setTutorialOpen } = useGeneratorContext();

  return (
    <HvContainer maxWidth="lg">
      <div className="flex justify-center pb-sm">
        <HvButton
          variant="secondaryGhost"
          onClick={() => setTutorialOpen?.((prev) => !prev)}
        >
          <HvTypography variant="title2">Check our tutorial!</HvTypography>
        </HvButton>
      </div>
      <HvSimpleGrid
        breakpoints={[
          { minWidth: 600, cols: 2, spacing: "sm" },
          { minWidth: 0, cols: 1, spacing: "sm" },
        ]}
      >
        <HvCard statusColor="positive" bgcolor="atmo1">
          <HvCardHeader
            title={
              <div className="flex flex-row items-center">
                <Tool iconSize="M" />
                <HvTypography variant="title1">Using the Editor</HvTypography>
              </div>
            }
          />
          <HvCardContent>
            <HvTypography variant="title2" className="mb-sm">
              Tools
            </HvTypography>
            <Entry title="Colors" icon={<PaintBucket />}>
              Configure the colors of your theme palette
            </Entry>

            <Entry title="Typography" icon={<FontSize />}>
              Configure colors, font size, line height and font weight for the
              various typographies
            </Entry>

            <Entry title="Fonts" icon={<Bold />}>
              Add Google Fonts and configure generic font sizes on your theme
            </Entry>
            <Entry title="Layout" icon={<Template />}>
              Configure generic sizes, radii, spacing and zIndices on your theme
            </Entry>

            <HvTypography variant="title2" className="my-sm">
              Tabs
            </HvTypography>
            <Entry title="Components" icon={<Components />}>
              Test your customized theme on a list of UI Kit NEXT components
            </Entry>
            <Entry title="Preview" icon={<Preview />}>
              Test your customized theme on a variety of templates
            </Entry>
          </HvCardContent>
        </HvCard>
        <HvCard statusColor="positive" bgcolor="atmo1">
          <HvCardHeader
            title={
              <div className="flex flex-row items-center">
                <Favorite iconSize="M" />
                <HvTypography variant="title1">Features</HvTypography>
              </div>
            }
          />
          <HvCardContent>
            <HvTypography variant="title2" className="mb-sm">
              Design System versions
            </HvTypography>
            <Entry title="Theme" icon={<ThemeSwitcher />}>
              Choose between DS3 and DS5 as your base theme
            </Entry>
            <Entry title="Color Mode" icon={<ColorPicker />}>
              Select your preferred color mode between `dawn` and `wicked`
            </Entry>
            <HvTypography variant="title2" className="my-sm">
              Theme Code
            </HvTypography>
            <Entry title="Theme Code" icon={<Code />}>
              The Theme Code displays your custom theme code in a readonly
              format (for now). You can copy the code and reset to the default.
            </Entry>
            <HvTypography variant="title2" className="my-sm">
              Google Fonts
            </HvTypography>
            <Entry title="Google Fonts" icon={<FontSizeBigger />}>
              Add a Google Font and have it dynamically added to the Theme
              Creator to test your theme with your font
            </Entry>
          </HvCardContent>
        </HvCard>
      </HvSimpleGrid>
    </HvContainer>
  );
};
