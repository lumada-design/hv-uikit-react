import React, { useState } from "react";
import { HvFileUploader } from "../..";

export default {
  title: "Tests/File Uploader",
  parameters: {
    docs: {
      disable: true,
      page: null
    }
  }
};

// __________________________________
// Extended robot test scenarios

export const AutomationSample = () => {
  const files = [
    {
      id: "uploaded-file-1",
      name: "file 1.png",
      size: 141,
      progress: 41,
      status: "success",
      type: "image/png"
    },
    {
      id: "uploaded-file-2",
      name: "file 2.png",
      size: 875,
      progress: 456,
      status: "progress",
      type: "image/png"
    },
    {
      id: "uploaded-file-3",
      name: "file 3.png",
      size: 1075,
      progress: 41,
      status: "fail",
      type: "image/png",
      errorMessage: "The file exceeds the maximum upload size"
    },
    {
      id: "uploaded-file-4",
      name: "A very very very long file name.png",
      size: 1075,
      progress: 1075,
      status: "fail",
      type: "image/png",
      errorMessage: "File type not allowed for upload"
    }
  ];

  const Sample = () => {
    const uploadHandlers = {};

    function clearUploadSimulationHandler(file) {
      clearInterval(uploadHandlers[file.id]);
      delete uploadHandlers[file.id];
    }

    const simulateUpload = (file, setList) => {
      const uploadSpeed = 20000; // bits per second

      const newFile = file;

      newFile.progress = Math.min(file.progress + uploadSpeed / 4, file.size);

      if (file.size === file.progress) {
        newFile.status = "success";

        // other needed fields can be added, like the file URL in the server
        // where the file was uploaded, etc.

        clearUploadSimulationHandler(newFile);
      }

      // the new state must always be a new list, so it must be cloned
      // otherwise the list elements changes wouldn't be detected
      setList(previousList => [...previousList]);
    };

    function addFile(file, setList) {
      const newFile = file;

      const hasFailed = file.status === "fail";

      if (!hasFailed) {
        newFile.status = "progress";
        newFile.progress = 0;

        uploadHandlers[newFile.id] = setInterval(() => {
          simulateUpload(newFile, setList);
        }, 250);
      }

      // we're adding the new file to the top of the list
      // depending on the use case, we could also add to the bottom,
      // order them alphabetically, etc.
      setList(previousList => [newFile, ...previousList]);
    }

    const removeFile = (fileToRemove, setList) => {
      clearInterval(uploadHandlers[fileToRemove.id]);
      delete uploadHandlers[fileToRemove.id];

      // the filename isn't necessarly unique (e.g. the user can add two different files
      // from different folders with the same), so an individual ID is created in each file
      setList(previousList => previousList.filter(file => file.id !== fileToRemove.id));
    };
    const [list, setList] = useState(files);

    return (
      <HvFileUploader
        id="automationfileuploader1"
        acceptedFiles={["jpg", "jpeg", "png"]}
        maxFileSize={2 * 1000 ** 2}
        fileList={list}
        onFilesAdded={newFiles => {
          newFiles.forEach(newFile => addFile(newFile, setList));
        }}
        onFileRemoved={removedFile => {
          removeFile(removedFile, setList);
        }}
      />
    );
  };

  return <Sample />;
};

AutomationSample.story = {
  parameters: {
    pa11y: {
      ignore: [
        "region",
        // TODO: BUG Upload failed error message color with insufficient contrast:
        // https://github.com/lumada-design/hv-uikit-react/issues/1696
        "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
        "color-contrast"
      ]
    }
  }
};
