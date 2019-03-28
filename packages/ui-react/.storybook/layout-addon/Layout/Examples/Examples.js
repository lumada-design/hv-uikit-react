/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import Collapse from "@material-ui/core/Collapse";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Code from "@material-ui/icons/Code";

const CodeButton = ({ classes, onClick }) => (
  <IconButton
    className={classes.iconCode}
    aria-label="Delete"
    onClick={onClick}
  >
    <Code />
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
    const { classes, example } = this.props;
    const { src } = example;
    const isPath = typeof src === "string";

    let component, snippet;
    if (isPath) {
      component = require(`../../../../doc/samples/${src}`).default;
      snippet = require(`!!raw-loader!../../../../doc/samples/${src}`);
    }

    return (
      <>
        <div className={classes.titleContainer}>
          <Typography variant="subtitle1">{example.title}</Typography>
          {!example.description && (
            <CodeButton
              classes={classes}
              onClick={() => this.toggleSnippetArea()}
            />
          )}
        </div>
        {example.description && (
          <div className={classes.titleContainer}>
            <Typography variant="body1">{example.description}</Typography>
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
              style={prism}
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

const Examples = ({ classes, examples, basePath }) => (
  <>
    <h3 className={classes.root}>Examples</h3>
    {examples.map((example, idx) => (
      <Example
        key={idx}
        classes={classes}
        example={example}
        basePath={basePath}
      />
    ))}
  </>
);

export default Examples;
