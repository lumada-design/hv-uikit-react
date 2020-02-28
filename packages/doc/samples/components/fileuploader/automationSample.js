import React, { useState } from "react";
import FileUploader from "@hv/uikit-react-core/dist/FileUploader";

const filterNewFiles = (files, list) => {
  return files.filter(
    file => !list.find(listFile => listFile.name === file.name)
  );
};

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

const uploadHandlers = {};

function clearUploadSimulationHandler(file) {
  clearInterval(uploadHandlers[file.id]);
  delete uploadHandlers[file.id];
}

const simulateUpload = (file, setList) => {
  const uploadSpeed = 20000; // bits per second

  file.progress = Math.min(file.progress + uploadSpeed / 4, file.size);

  if (file.size == file.progress) {
    file.status = "success";

    clearUploadSimulationHandler(file);
  }

  setList(previousList => [...previousList]);
};

function addFile(newFile, setList) {
  const hasFailed = newFile.status === "fail";

  if (!hasFailed) {
    newFile.status = "progress";
    newFile.progress = 0;

    uploadHandlers[newFile.id] = setInterval(() => {
      simulateUpload(newFile, setList);
    }, 250);
  }

  setList(previousList => [newFile, ...previousList]);
}

const removeFile = (fileToRemove, setList) => {
  clearInterval(uploadHandlers[fileToRemove.id]);
  delete uploadHandlers[fileToRemove.id];

  setList(previousList =>
    previousList.filter(file => file.id !== fileToRemove.id)
  );
};

const Sample = () => {
  const [list, setList] = useState(files);

  return (
    <FileUploader
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

export default <Sample />;
