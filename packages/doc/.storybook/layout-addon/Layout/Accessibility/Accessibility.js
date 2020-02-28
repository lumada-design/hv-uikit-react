import React from "react";
import ReactMarkdown from "react-markdown";
import HvTypography from "@hv/uikit-react-core/dist/Typography";

const Accessibility = ({ pageData }) => (
  <HvTypography component="div">
    <ReactMarkdown source={pageData} />
  </HvTypography>
);

export default Accessibility;
