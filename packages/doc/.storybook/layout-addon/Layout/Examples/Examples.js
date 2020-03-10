import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Collapse, IconButton, useTheme } from "@material-ui/core";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import { Code } from "@hv/uikit-react-icons/dist";

const CodeButton = ({ onClick }) => (
  <IconButton onClick={onClick} style={{ marginLeft: "auto" }}>
    <Code />
  </IconButton>
);

const Example = ({ classes, example }) => {
  const [snippetIsOpen, setSnippetOpen] = useState(false);
  const theme = useTheme();

  const toggleSnippetArea = () => {
    setSnippetOpen(!snippetIsOpen);
  };

  const { src } = example;
  const isPath = typeof src === "string";

  let component, snippet;
  if (isPath) {
    component = require(`../../../../samples/${src}`).default;
    snippet = require(`!!raw-loader!../../../../samples/${src}`).default;
  }

  return (
    <>
      <div className={classes.titleContainer}>
        <HvTypography variant="highlightText">{example.title}</HvTypography>
        {!example.description && <CodeButton onClick={toggleSnippetArea} />}
      </div>
      {example.description && (
        <div className={classes.titleContainer}>
          <HvTypography variant="normalText">
            {example.description}
          </HvTypography>
          <CodeButton onClick={toggleSnippetArea} />
        </div>
      )}
      <div className={classes.content}>
        <Collapse in={snippetIsOpen}>
          <SyntaxHighlighter
            language="jsx"
            style={theme.hv.type === "dark" ? darcula : prism}
            customStyle={{ margin: 0, borderRadius: 0, fontSize: 14 }}
          >
            {isPath ? snippet : example.snippet}
          </SyntaxHighlighter>
        </Collapse>
        <div className={classes.component}>
          {isPath ? component : example.src}
        </div>
      </div>
    </>
  );
};

const Examples = ({ classes, examples, basePath }) => (
  <>
    <div className={classes.root}>
      <HvTypography variant="xsTitle">Examples</HvTypography>
    </div>
    {examples.map((example, idx) => (
      <Example key={idx} classes={classes} example={example} />
    ))}
  </>
);

export default Examples;
