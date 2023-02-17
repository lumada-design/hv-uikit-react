import { DocsContainer } from "@storybook/addon-docs";
import addons from "@storybook/addons";
import { Global } from "@storybook/theming";
import { default as React, useMemo } from "react";
import { getDocsStyles } from "../theme/styles/docs";

import { HvProvider, theme } from "@hitachivantara/uikit-react-core";

export default ({ context, children }) => {
  // const { selectedTheme } = useTheme();
  // const theme = getTheme();

  const channel = addons.getChannel();
  // const [themeName, setThemeName] = useState(selectedTheme);

  // useEffect(() => {
  //   channel.on("THEME_SWITCH", setThemeName);
  //   return () => channel.off("THEME_SWITCH", setThemeName);
  // }, [channel, setThemeName]);

  const docsContext = {
    ...context,
    parameters: {
      ...context.parameters,
      docs: { ...context.parameters.docs, theme },
    },
  };

  const docsStyles = useMemo(() => getDocsStyles(theme), [theme]);

  return (
    <>
      <Global styles={docsStyles} />
      <DocsContainer context={docsContext}>
        <HvProvider
          preventSetAttrs
          // uiKitTheme={themeName}
          // generateClassNameOptions={{ seed: "sb-docs-container" }}
        >
          {children}
        </HvProvider>
      </DocsContainer>
    </>
  );
};
