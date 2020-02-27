import React, { useState } from "react";
import FileUploader from "@hv/uikit-react-core/dist/FileUploader";

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

    // other needed fields can be added, like the file URL in the server
    // where the file was uploaded, etc.

    clearUploadSimulationHandler(file);
  }

  // the new state must always be a new list, so it must be cloned
  // otherwise the list elements changes wouldn't be detected
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

  // we're adding the new file to the top of the list
  // dependending on the use case, we could also add to the botton,
  // order them alphabetically, etc.
  setList(previousList => [newFile, ...previousList]);
}

const removeFile = (fileToRemove, setList) => {
  clearInterval(uploadHandlers[fileToRemove.id]);
  delete uploadHandlers[fileToRemove.id];

  // the filename isn't necessarly unique (e.g. the user can add two different files
  // from different folders with the same), so an individual ID is created in each file
  setList(previousList =>
    previousList.filter(file => file.id !== fileToRemove.id)
  );
};

const Sample = () => {
  const [list, setList] = useState([]);

  return (
    <FileUploader
      id="fileuploader1"
      multiple={false}
      acceptedFiles={["jpg", "jpeg", "png"]}
      maxFileSize={1 * 1000 * 1000}
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
