import React, { ComponentType, useEffect, useMemo, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { DocsContainer } from "@storybook/addon-docs";
import { addons } from "@storybook/addons";
import { Global } from "@storybook/theming";
import {
  HvProvider,
  HvTypography,
  HvTypographyProps,
  theme,
} from "@hitachivantara/uikit-react-core";

import { ADDON_EVENT } from "../addons/mode-selector/constants";
import { getInitialMode, Mode } from "../addons/mode-selector/utils";
import { getDocsStyles } from "../theme/styles/docs";
import { themes } from ".storybook/theme";

const components: Record<string, ComponentType> = {
  a: (props: HvTypographyProps<"a">) => (
    <HvTypography
      link
      component="a"
      style={{ color: theme.colors.primary }}
      target={props.href?.includes("./?path=/docs/") ? undefined : "_self"}
      {...props}
    />
  ),
  p: (props) => <HvTypography component="p" {...props} />,
  li: (props) => <li {...props} />,
  h1: (props) => <HvTypography component="h1" variant="title1" {...props} />,
  h2: (props) => <HvTypography component="h2" variant="title2" {...props} />,
  h3: (props) => <HvTypography component="h3" variant="title3" {...props} />,
  h4: (props) => <HvTypography component="h4" variant="title4" {...props} />,
  h5: (props) => <HvTypography component="h5" variant="title4" {...props} />,
  h6: (props) => <HvTypography component="h6" variant="title4" {...props} />,
};

export default ({ context, children }) => {
  const initialMode = getInitialMode();
  const [mode, setMode] = useState(initialMode);

  const switchMode = (mode: Mode) => {
    setMode(mode);
  };

  useEffect(() => {
    const channel = addons.getChannel();
    channel.on(ADDON_EVENT, switchMode);

    return () => {
      channel.off(ADDON_EVENT, switchMode);
    };
  }, []);

  const docsStyles = useMemo(() => getDocsStyles(), [mode]);

  return (
    <MDXProvider components={components}>
      <Global styles={docsStyles} />
      <HvProvider
        classNameKey="hv-storybook"
        cssTheme="scoped"
        colorMode={mode}
      >
        <DocsContainer theme={themes[mode]} context={context}>
          {children}
        </DocsContainer>
      </HvProvider>
    </MDXProvider>
  );
};
