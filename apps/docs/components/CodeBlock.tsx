import { useState } from "react";
import {
  LiveProvider,
  LiveError,
  LivePreview,
  CodeEditor,
} from "react-live-runner";
import { Pre } from "nextra/components";
// @ts-ignore
import { themes } from "prism-react-renderer";
import * as HvCore from "@hitachivantara/uikit-react-core";

const Live = ({ children }) => {
  // Remove trailing newline character from the 'code' string.
  const [code, setCode] = useState(children.replace(/\n$/, ""));
  // Regular expression that matches words starting with "Hv".
  const regex = /\bHv\w+\b/g;
  // Find all matches in the 'code' string and remove duplicates.
  const matches = [...new Set(code.match(regex))] as string[];
  // Create a scope object that contains all Hv matched components.
  const scope = matches.reduce((acc, match) => {
    acc[match] = HvCore[match];
    return acc;
  }, {});

  if (!scope) {
    return <div>Loading...</div>;
  }

  const handleChanged = (value) => {
    setCode(value);
  };

  return (
    <LiveProvider code={code} scope={{ ...scope }} theme={themes.github}>
      <LivePreview className="flex gap-5 p-3 border border-slate-200 rounded-t-lg" />
      <CodeEditor
        value={code}
        onChange={handleChanged}
        theme={themes.github}
        className="[&>textarea]:outline"
      />
      <LiveError className="text-xs p-3" />
    </LiveProvider>
  );
};

const CodeBlock = ({ children, live }) => {
  return live ? <Live>{children}</Live> : <Pre>{children}</Pre>;
};

export default CodeBlock;
