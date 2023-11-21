import {
  HvProvider,
  createTheme,
  HvAvatar,
  HvButton,
  theme,
} from "@hitachivantara/uikit-react-core";

const newTheme = createTheme({
  name: "myTheme",
  base: "ds5",
  components: {
    HvAvatar: {
      variant: "square",
    },
  },
});

export const DefaultProps = () => {
  const id = "hv-root-create-theme-default-props-mode";
  return (
    <div id={id}>
      <HvProvider
        classNameKey={id}
        rootElementId={id}
        cssTheme="scoped"
        themes={[newTheme]}
      >
        <HvAvatar />
      </HvProvider>
    </div>
  );
};

const newThemeClassOverwrite = createTheme({
  name: "myTheme",
  base: "ds5",
  components: {
    HvButton: {
      classes: {
        primary: {
          backgroundColor: theme.colors.brand,
        },
      },
    },
  },
});

export const DefaultPropsClassOverwrite = () => {
  const id = "hv-root-create-theme-default-props-class-overwrite";
  return (
    <div id={id}>
      <HvProvider
        classNameKey={id}
        rootElementId={id}
        cssTheme="scoped"
        themes={[newThemeClassOverwrite]}
      >
        <HvButton>Hey!</HvButton>
      </HvProvider>
    </div>
  );
};
