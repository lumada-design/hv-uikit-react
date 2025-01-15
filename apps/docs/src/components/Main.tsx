import createCache from "@emotion/cache";
import { useTheme } from "nextra-theme-docs";
import { ds5, HvProvider, pentahoPlus } from "@hitachivantara/uikit-react-core";
import { HvVizProvider } from "@hitachivantara/uikit-react-viz";

const emotionCache = createCache({
  key: "hv-docs",
  prepend: true,
  container: typeof document !== "undefined" ? document.head : undefined,
});

export const Main = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();

  return (
    <HvProvider
      themes={[pentahoPlus, ds5]}
      theme="pentahoPlus"
      colorMode={resolvedTheme === "dark" ? "wicked" : "dawn"}
      emotionCache={emotionCache}
    >
      <HvVizProvider>{children}</HvVizProvider>
    </HvProvider>
  );
};
