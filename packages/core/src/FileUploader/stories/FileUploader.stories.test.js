import React, { useState } from "react";

import { HvFileUploader } from "../..";

import { simulateUpload, cancelUpload } from "./simulator";

export default {
  title: "Tests/File Uploader",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

// __________________________________
// Extended robot test scenarios

function addFile(file, setList) {
  const newFile = file;

  const hasFailed = file.status === "fail";

  if (!hasFailed) {
    newFile.status = "progress";
    newFile.progress = 0;

    simulateUpload(
      newFile,
      (progress) => {
        newFile.progress = progress;
        setList((previousList) => [...previousList]);
      },
      () => {
        newFile.status = "success";
        setList((previousList) => [...previousList]);
      }
    );
  }

  setList((previousList) => [newFile, ...previousList]);
}

const removeFile = (fileToRemove, setList) => {
  if (fileToRemove.status === "progress") {
    cancelUpload(fileToRemove);
  }

  setList((previousList) => previousList.filter((file) => file !== fileToRemove));
};

export const AutomationSample = () => {
  const files = [
    {
      id: "uploaded-file-1",
      name: "file 1.png",
      size: 141,
      progress: 41,
      status: "success",
      type: "image/png",
    },
    {
      id: "uploaded-file-2",
      name: "file 2.png",
      size: 875,
      progress: 456,
      status: "progress",
      type: "image/png",
    },
    {
      id: "uploaded-file-3",
      name: "file 3.png",
      size: 1075,
      progress: 41,
      status: "fail",
      type: "image/png",
      errorMessage: "The file exceeds the maximum upload size",
    },
    {
      id: "uploaded-file-4",
      name: "A very very very long file name.png",
      size: 1075,
      progress: 1075,
      status: "fail",
      type: "image/png",
      errorMessage: "File type not allowed for upload",
    },
  ];

  const [list, setList] = useState(files);

  return (
    <HvFileUploader
      id="automationfileuploader1"
      acceptedFiles={["jpg", "jpeg", "png"]}
      maxFileSize={2 * 1000 ** 2}
      fileList={list}
      onFilesAdded={(newFiles) => {
        newFiles.forEach((newFile) => addFile(newFile, setList));
      }}
      onFileRemoved={(removedFile) => {
        removeFile(removedFile, setList);
      }}
    />
  );
};
