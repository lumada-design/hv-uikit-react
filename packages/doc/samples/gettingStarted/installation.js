import React from "react";
import CodeBlock from "./CodeBlock";
import ReactMarkdown from "react-markdown";
import input from "../../pages/gettingStarted/INSTALLATION.md";

const Code = ({ value }) => <CodeBlock value={value} language="bash" />;

const Introduction = () => (
  <ReactMarkdown source={input} renderers={{ code: Code }} />
);

export default Introduction;
