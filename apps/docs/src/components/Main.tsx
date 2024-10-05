import { useTheme } from "nextra-theme-docs";
import { ds5, HvProvider, pentahoPlus } from "@hitachivantara/uikit-react-core";
import { HvVizProvider } from "@hitachivantara/uikit-react-viz";

export const Main = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();

  return (
    <HvProvider
      themes={[pentahoPlus, ds5]}
      theme="pentahoPlus"
      colorMode={resolvedTheme === "dark" ? "wicked" : "dawn"}
      cssTheme="scoped"
      cssBaseline="none"
    >
      <HvVizProvider>{children}</HvVizProvider>
    </HvProvider>
  );
};
