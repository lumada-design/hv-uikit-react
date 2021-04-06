import React, { useState } from "react";

import { HvFileUploader } from "../..";

import { simulateUpload, cancelUpload } from "./simulator";

export default {
  title: "Forms/File Uploader",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvFileUploader } from "@hv/uikit-react-core"',

    dsVersion: "3.4.0",
  },
  component: HvFileUploader,
};

export const Main = () => {
  function addFile(file, setList) {
    const newFile = file;

    const hasFailed = file.status === "fail";

    if (!hasFailed) {
      newFile.status = "progress";
      newFile.progress = 0;

      simulateUpload(
        newFile,

        // onProgress:
        (progress) => {
          newFile.progress = progress;

          // the new state must always be a new list, so it must be cloned
          // otherwise the list elements changes wouldn't be detected
          setList((previousList) => [...previousList]);
        },

        // onComplete:
        () => {
          newFile.status = "success";

          setList((previousList) => [...previousList]);
        }
      );
    }

    // we're adding the new file to the top of the list
    // depending on the use case, we could also add to the bottom,
    // order them alphabetically, etc.
    setList((previousList) => [newFile, ...previousList]);
  }

  const removeFile = (fileToRemove, setList) => {
    if (fileToRemove.status === "progress") {
      cancelUpload(fileToRemove);
    }

    // if the file was already upload to a server,
    // it might be necessary to call an API to delete it there

    setList((previousList) => previousList.filter((file) => file !== fileToRemove));
  };

  const [list, setList] = useState([]);

  return (
    <HvFileUploader
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

export const Basic = () => {
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

  const [list, setList] = useState([]);

  return (
    <HvFileUploader
      id="fileuploader1"
      acceptedFiles={["jpg", "jpeg", "png"]}
      labels={{ sizeWarning: "Maximum file size:" }}
      maxFileSize={1 * 1000 ** 2}
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

Basic.parameters = {
  docs: {
    description: { story: "FileUploader default usage sample" },
  },
};

export const SingleUpload = () => {
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

  const [list, setList] = useState([]);

  return (
    <HvFileUploader
      fileList={list}
      onFilesAdded={(newFiles) => {
        newFiles.forEach((newFile) => addFile(newFile, setList));
      }}
      onFileRemoved={(removedFile) => {
        removeFile(removedFile, setList);
      }}
      acceptedFiles={["jpg", "jpeg", "png"]}
      maxFileSize={1 * 1000 ** 2}
      multiple={false}
      disabled={list.length === 1}
    />
  );
};

SingleUpload.parameters = {
  docs: {
    description: { story: "FileUploader which permits the upload of a single file at a time" },
  },
  pa11y: {
    ignore: [
      "region",
      // TODO: BUG When not provided with an ID the label isn't associated with the input
      // https://github.com/lumada-design/hv-uikit-react/issues/1694
      "label-title-only",
    ],
  },
};

export const CustomizedFileTypes = () => {
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

  const [list, setList] = useState([]);

  return (
    <HvFileUploader
      fileList={list}
      onFilesAdded={(newFiles) => {
        newFiles.forEach((newFile) => addFile(newFile, setList));
      }}
      onFileRemoved={(removedFile) => {
        removeFile(removedFile, setList);
      }}
      acceptedFiles={[
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ]}
      labels={{
        dropzone: "Upload your spreadsheets",
        acceptedFiles: "(excel files)",
      }}
    />
  );
};

CustomizedFileTypes.parameters = {
  docs: {
    description: {
      story: "FileUploader which restricts the upload to xls and xlsx files.",
    },
  },
  pa11y: {
    ignore: ["region"],
  },
};
