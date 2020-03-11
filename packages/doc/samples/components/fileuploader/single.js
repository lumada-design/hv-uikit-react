import React, { useState } from "react";
import FileUploader from "@hv/uikit-react-core/dist/FileUploader";

const filterNewFiles = (files, list) =>
  files.filter(file => !list.find(listFile => listFile.name === file.name));

const simulateUpload = (files, setList, times = 0) => {
  const list = files.map(file => {
    const hasUploaded = file.status === "success";
    const hasFailed = file.status === "fail";

    const progress = file.size * times || null;

    let status;

    if (hasFailed) status = "fail";
    else status = file.size !== progress ? "progress" : "success";

    return {
      progress: hasUploaded ? file.size : progress,
      status: hasUploaded ? "success" : status
    };
  });

  setList(list);

  if (times < 1)
    setTimeout(() => {
      simulateUpload(files, setList, Number(times.toFixed(1)) + 0.1);
    }, 250);
};

const removeFromList = (list, fileToRemove) => list.filter(file => file.name !== fileToRemove.name);

const Sample = () => {
  const [list, setList] = useState([]);

  return (
    <FileUploader
      fileList={list}
      onFilesAdded={files => {
        const newFiles = filterNewFiles(files, list);
        simulateUpload([...newFiles, ...list], setList);
      }}
      onFileRemoved={file => {
        const newList = removeFromList(list, file);
        setList(newList);
      }}
      acceptedFiles={["jpg", "jpeg", "png"]}
      maxFileSize={1 * 1000 * 1000}
      multiple={false}
      disabled={list.length === 1}
    />
  );
};

export default <Sample />;
