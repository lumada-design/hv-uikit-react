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
      // 👆 override "normal" props
    },
    HvButton: {
      classes: {
        // 👇 override classes styles
        primarySubtle: {
          color: theme.colors.brand,
        },
      },
    },
  },
});

export const DefaultProps = () => {
  return (
    <HvProvider cssTheme="scoped" themes={[newTheme]}>
      <HvButton variant="primarySubtle">Hey!</HvButton>
      <HvAvatar />
    </HvProvider>
  );
};
