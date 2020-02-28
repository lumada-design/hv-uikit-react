import React from "react";
import { storiesOf } from "@storybook/react";
import SearchBox from "@hv/uikit-react-core/dist/SearchBox";

storiesOf("Components", module).add("SearchBox", () => <SearchBox />, {
  title: "SearchBox",
  description: "",
  usage: "import SearchBox from '@hv/uikit-react-core/dist/SearchBox'",
  examples: [
    {
      title: "Simple",
      description: "Basic usage of SearchBox",
      src: "components/searchBox/simpleSearchbox.js"
    },
    {
      title: "Disabled Searchbox",
      description: "Disabled searchBox disallows interactions",
      src: "components/searchBox/disabledSearchbox.js"
    },
    {
      title: "No Suggestions Searchbox",
      description: "searchbox without suggestion",
      src: "components/searchBox/noSuggestionSearchbox.js"
    }
  ]
});
