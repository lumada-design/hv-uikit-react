import React from "react";
import ReactMarkdown from "react-markdown";
import input from "../../pages/gettingStarted/INTRODUCTION.md";

import corePackage from "../../../core/package.json";
import labPackage from "../../../lab/package.json";
import iconsPackage from "../../../icons/package.json";

const Introduction = () => {
  const inputParsed = input
    .replace("%CORE_VERSION%", corePackage.version)
    .replace("%LAB_VERSION%", labPackage.version)
    .replace("%ICONS_VERSION%", iconsPackage.version);
  return <ReactMarkdown source={inputParsed} />;
};

export default Introduction;
