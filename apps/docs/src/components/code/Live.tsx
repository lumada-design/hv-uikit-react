import * as Reactdep from "react";
import {
  CodeEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from "react-live-runner";
import * as emotionCss from "@emotion/css";
import { css } from "@emotion/css";
// import * as emotionReact from "@emotion/react";
// import * as materialUi from "@mui/material";
// @ts-ignore
import { themes } from "prism-react-renderer";
import * as HvCore from "@hitachivantara/uikit-react-core";
import * as HvIcons from "@hitachivantara/uikit-react-icons";

interface LiveProps {
  children: string;
}

export const classes = {
  editor: css({
    fontFamily:
      "source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace",
    fontSize: 12,
    whiteSpace: "pre",
    caretColor: "#fff",
    minWidth: "100%",
    minHeight: "100%",
    float: "left",

    "& > textarea, & > pre": {
      outline: "none",
      whiteSpace: "pre !important",
    },
  }),
  editorContainer: css({
    maxHeight: 300,
    overflow: "auto",
    borderRadius: `0 0 ${HvCore.theme.radii.round} ${HvCore.theme.radii.round}`,
  }),
};

const imports = {
  import: {
    react: Reactdep,
    "@hitachivantara/uikit-react-core": HvCore,
    "@hitachivantara/uikit-react-icons": HvIcons,
    "@emotion/css": emotionCss,
    // "@emotion/react": emotionReact,
    // "@mui/material": materialUi,
  },
};

const getHvComponents = (code: string) => {
  const matches = code.match(/\bHv[A-Za-z0-9_]*\b/g) || [];
  return Array.from(new Set(matches)) as string[];
};

const getHvIcons = (code: string) => {
  const matches = code.match(/<(?!(Hv))[A-Z][a-zA-Z]*/g) || [];
  const parsedIcons = matches.map((icon) => icon.replace(/</g, ""));
  return Array.from(new Set(parsedIcons)) as string[];
};

export const Live: React.FC<LiveProps> = ({ children }) => {
  // Initialize code state with trimmed children
  const initialCode = children.trimEnd();
  const [code, setCode] = Reactdep.useState<string>(initialCode);

  const hvComponents = getHvComponents(code);
  const hvIcons = getHvIcons(code);

  // Memoize the creation of the scope object containing Hv components
  const scope = Reactdep.useMemo(() => {
    const comps = hvComponents.reduce<Record<string, any>>(
      (acc, componentName) => {
        const component = HvCore[componentName as keyof typeof HvCore];
        if (component) {
          acc[componentName] = component;
        } else {
          // eslint-disable-next-line no-console
          console.warn(`Component "${componentName}" not found in HvCore.`);
        }
        return acc;
      },
      {},
    );

    const icons = hvIcons.reduce<Record<string, any>>((acc, iconName) => {
      const icon = HvIcons[iconName as keyof typeof HvIcons];
      if (icon) {
        acc[iconName] = icon;
      } else {
        // eslint-disable-next-line no-console
        console.warn(`Icon "${iconName}" not found in HvIcons.`);
      }
      return acc;
    }, {});

    const { theme } = HvCore;

    return { ...comps, ...icons, theme };
  }, [hvComponents, hvIcons]);

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  return (
    <LiveProvider
      code={code}
      scope={{
        ...scope,
        ...imports,
      }}
      theme={themes.dracula}
    >
      <LivePreview className="flex flex-wrap gap-3 p-2 mt-1 border border-[var(--uikit-colors-atmo4)] rounded-t-round" />

      <div className={classes.editorContainer}>
        <CodeEditor
          className={classes.editor}
          value={code}
          onChange={handleCodeChange}
          theme={themes.dracula}
        />
      </div>

      <LiveError className="text-xs p-3" />
    </LiveProvider>
  );
};
