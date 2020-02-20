import React from "react";
import { withTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ language, value, theme }) => (
  <SyntaxHighlighter
    language={language}
    style={theme.hv.type === "dark" ? darcula : prism}
    customStyle={{ margin: 0, borderRadius: 0, fontSize: 14 }}
  >
    {value}
  </SyntaxHighlighter>
);

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
};
CodeBlock.defaultProps = {
  language: null
};
export default withTheme(CodeBlock);
