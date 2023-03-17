import {
  createTheme,
  HvProvider,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";

const newTheme = createTheme({
  name: "myTheme",
  base: "ds5",
  inheritColorModes: true,
  colors: {
    modes: {
      dawn: {
        brand: "#738f54",
      },
      wicked: {
        brand: "#738f54",
      },
    },
  },
});

const Content = () => {
  const { activeTheme, selectedMode } = useTheme();

  return (
    <HvTypography
      style={{
        color: activeTheme?.colors.modes[selectedMode].brand,
      }}
    >
      Hello from the UI Kit team!
    </HvTypography>
  );
};

export const ThemeContext = () => {
  const id = "hv-root-theme-context-use-theme-hook";
  return (
    <div id={id}>
      <HvProvider rootElementId={id} themes={[newTheme]}>
        <Content />
      </HvProvider>
    </div>
  );
};
