import React from "react";
import { storiesOf } from "@storybook/react";
import FileUploader from "@hv/uikit-react-core/dist/FileUploader";

storiesOf("Components", module).add("FileUploader", () => <FileUploader />, {
  title: "FileUploader",
  description: "",
  usage: "import FileUploader from '@hv/uikit-react-core/dist/FileUploader'",
  examples: [
    {
      title: "Basic",
      description: "Sample usage of FileUploader",
      src: "components/fileuploader/sample.js"
    },
    {
      title: "With single file upload",
      description: "A file uploader which permits the upload of a single file",
      src: "components/fileuploader/single.js"
    }
  ]
});
