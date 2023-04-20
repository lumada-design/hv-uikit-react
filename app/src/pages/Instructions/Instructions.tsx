import {
  HvBox,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvContainer,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import {
  Tool,
  Favorite,
  PaintBucket,
  FontSize,
  Bold,
  Template,
  Components,
  Preview,
  ThemeSwitcher,
  Code,
  ColorPicker,
  FontSizeBigger,
} from "@hitachivantara/uikit-react-icons";
import classes from "./styles";

const Instructions = () => {
  return (
    <HvContainer maxWidth="lg">
      <HvBox className={classes.root}>
        <HvBox className={classes.section}>
          <HvBox>
            <HvCard statusColor="positive" bgcolor="atmo1">
              <HvCardHeader
                title={
                  <HvBox className={classes.title}>
                    <Tool iconSize="M" />
                    <HvTypography variant="title1">
                      Using the Editor
                    </HvTypography>
                  </HvBox>
                }
              />
              <HvCardContent>
                <HvTypography variant="title2" className={classes.subSection}>
                  Tools
                </HvTypography>
                <HvBox className={classes.tool}>
                  <HvBox className={classes.toolTitle}>
                    <PaintBucket />
                    <HvTypography variant="title4">Colors</HvTypography>
                  </HvBox>
                  <HvTypography>
                    Configure the colors of your theme palette
                  </HvTypography>
                </HvBox>

                <HvBox className={classes.tool}>
                  <HvBox className={classes.toolTitle}>
                    <FontSize />
                    <HvTypography variant="title4">Typography</HvTypography>
                  </HvBox>
                  <HvTypography>
                    Configure colors, font size, line height and font weight for
                    the various typographys
                  </HvTypography>
                </HvBox>

                <HvBox className={classes.tool}>
                  <HvBox className={classes.toolTitle}>
                    <Bold />
                    <HvTypography variant="title4">Fonts</HvTypography>
                  </HvBox>
                  <HvTypography>
                    Add Google Fonts and configure generic font sizes on your
                    theme
                  </HvTypography>
                </HvBox>

                <HvBox className={classes.tool}>
                  <HvBox className={classes.toolTitle}>
                    <Template />
                    <HvTypography variant="title4">Layout</HvTypography>
                  </HvBox>
                  <HvTypography>
                    Configure generic sizes, radii, spacing and zIndices on your
                    theme
                  </HvTypography>
                </HvBox>
                <HvTypography variant="title2" className={classes.subSection}>
                  Tabs
                </HvTypography>
                <HvBox className={classes.tool}>
                  <HvBox className={classes.toolTitle}>
                    <Components />
                    <HvTypography variant="title4">Components</HvTypography>
                  </HvBox>
                  <HvTypography>
                    Test your customized theme on a list of UI Kit NEXT
                    components
                  </HvTypography>
                </HvBox>
                <HvBox className={classes.tool}>
                  <HvBox className={classes.toolTitle}>
                    <Preview />
                    <HvTypography variant="title4">Preview</HvTypography>
                  </HvBox>
                  <HvTypography>
                    Test your customized theme on a variety of templates
                  </HvTypography>
                </HvBox>
              </HvCardContent>
            </HvCard>
          </HvBox>
        </HvBox>
        <HvBox className={classes.section}>
          <HvCard statusColor="positive" bgcolor="atmo1">
            <HvCardHeader
              title={
                <HvBox className={classes.title}>
                  <Favorite iconSize="M" />
                  <HvTypography variant="title1">Features</HvTypography>
                </HvBox>
              }
            />
            <HvCardContent>
              <HvTypography variant="title2" className={classes.subSection}>
                Design System versions
              </HvTypography>
              <HvBox className={classes.tool}>
                <HvBox className={classes.toolTitle}>
                  <ThemeSwitcher />
                  <HvTypography variant="title4">Theme</HvTypography>
                </HvBox>
                <HvTypography>
                  Choose between DS3 and DS5 as your base theme
                </HvTypography>
              </HvBox>
              <HvBox className={classes.tool}>
                <HvBox className={classes.toolTitle}>
                  <ColorPicker />
                  <HvTypography variant="title4">Color Mode</HvTypography>
                </HvBox>
                <HvTypography>
                  Select your prefered color mode between `dawn` and `wicked`
                </HvTypography>
              </HvBox>
              <HvTypography variant="title2" className={classes.subSection}>
                Theme Code
              </HvTypography>
              <HvBox className={classes.tool}>
                <HvBox className={classes.toolTitle}>
                  <Code />
                  <HvTypography variant="title4">Theme Code</HvTypography>
                </HvBox>
                <HvTypography>
                  The Theme Code displays your custom theme code in a readonly
                  format (for now). You can copy the code and reset to the
                  default.
                </HvTypography>
              </HvBox>
              <HvTypography variant="title2" className={classes.subSection}>
                Google Fonts
              </HvTypography>
              <HvBox className={classes.tool}>
                <HvBox className={classes.toolTitle}>
                  <FontSizeBigger />
                  <HvTypography variant="title4">Google Fonts</HvTypography>
                </HvBox>
                <HvTypography>
                  Add a Google Font and have it dynamically added to the Theme
                  Creator to test your theme with your font
                </HvTypography>
              </HvBox>
            </HvCardContent>
          </HvCard>
        </HvBox>
      </HvBox>
    </HvContainer>
  );
};

export default Instructions;
