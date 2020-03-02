import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import Collapse from "@material-ui/core/Collapse";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import IconButton from "@material-ui/core/IconButton";
import Code from "@hv/uikit-react-icons/dist/Code";

const CodeButton = ({ classes, onClick }) => (
  <IconButton className={classes.iconCode} onClick={onClick}>
    <Code iconSize="S" className={classes.iconStyles} />
  </IconButton>
);

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snippetIsOpen: false
    };
  }

  toggleSnippetArea(evt) {
    this.setState((prevState, props) => ({
      snippetIsOpen: !prevState.snippetIsOpen
    }));
  }

  render() {
    const { snippetIsOpen } = this.state;
    const { classes, example, theme } = this.props;
    const { src } = example;
    const isPath = typeof src === "string";

    let component, snippet;
    if (isPath) {
      component = require(`../../../../samples/${src}`).default;
      snippet = require(`!!raw-loader!../../../../samples/${src}`);
    }

    return (
      <>
        <div className={classes.titleContainer}>
          <HvTypography variant="highlightText">{example.title}</HvTypography>
          {!example.description && (
            <CodeButton
              classes={classes}
              onClick={() => this.toggleSnippetArea()}
            />
          )}
        </div>
        {example.description && (
          <div className={classes.titleContainer}>
            <HvTypography variant="normalText">
              {example.description}
            </HvTypography>
            <CodeButton
              classes={classes}
              onClick={() => this.toggleSnippetArea()}
            />
          </div>
        )}
        <div className={classes.content}>
          <Collapse in={snippetIsOpen}>
            <SyntaxHighlighter
              language="jsx"
              style={theme.type === "dark" ? darcula : prism}
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
  }
}

const Examples = ({ classes, examples, basePath, theme }) => (
  <>
    <div className={classes.root}>
      <HvTypography variant="xsTitle">Examples</HvTypography>
    </div>
    {examples.map((example, idx) => (
      <Example
        key={idx}
        classes={classes}
        example={example}
        basePath={basePath}
        theme={theme.hv}
      />
    ))}
  </>
);

export default Examples;
