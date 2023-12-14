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
        green: "#738f54",
      },
      wicked: {
        green: "#738f54",
      },
    },
  },
});

const Content = () => {
  const { colors } = useTheme();

  return (
    <HvTypography style={{ color: colors?.green }}>
      Hello from the UI Kit team!
    </HvTypography>
  );
};

export const ThemeContext = () => {
  const id = "hv-root-theme-context-use-theme-hook";
  return (
    <div id={id}>
      <HvProvider
        classNameKey={id}
        rootElementId={id}
        cssTheme="scoped"
        themes={[newTheme]}
      >
        <Content />
      </HvProvider>
    </div>
  );
};
