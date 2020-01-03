/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from "react";
import FileUploader from "@hv/uikit-react-core/dist/FileUploader";

const filterNewFiles = (files, list) => {
  return files.filter(
    file => !list.find(listFile => listFile.name === file.name)
  );
};

const files = [
  {
    name: "file 1.png",
    size: 141,
    progress: 41,
    status:"success",
    type: "image/png"
  },
  {
    name: "file 2.png",
    size: 875,
    progress: 456,
    status:"progress",
    type: "image/png"
  },
  {
    name: "file 3.png",
    size: 1075,
    progress: 41,
    status:"fail",
    type: "image/png",
    errorMessage:"The file exceeds the maximum upload size"
  },
  {
    name: "A very very very long file name.png",
    size: 1075,
    progress: 1075,
    status:"fail",
    type: "image/png",
    errorMessage:"File type not allowed for upload"
  }
];

const simulateUpload = (files, setList, times = 0) => {
  const list = files.map(file => {
    const hasUploaded = file.status === "success";
    const hasFailed = file.status === "fail";

    const progress = file.size * times || null;
    const status = hasFailed
      ? "fail"
      : file.size != progress
      ? "progress"
      : "success";

    file.progress = hasUploaded ? file.size : progress;
    file.status = hasUploaded ? "success" : status;

    return file;
  });

  setList(list);

  if (times < 1)
    setTimeout(() => {
      simulateUpload(files, setList, Number(times.toFixed(1)) + 0.1);
    }, 250);
};

const removeFromList = (list, fileToRemove) => {
  return list.filter(file => file.name !== fileToRemove.name);
};

const Sample = () => {
  const [list, setList] = useState(files);

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
      maxFileSize={2 * 1000 ** 2}
    />
  );
};

export default <Sample />;
