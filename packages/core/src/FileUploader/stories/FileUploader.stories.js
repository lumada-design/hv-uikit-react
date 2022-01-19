import React, { useState } from "react";

import { Code, DocWord } from "@hv/uikit-react-icons";

import {
  HvFileUploader,
  HvFileUploaderPreview,
  HvDialog,
  HvDialogTitle,
  HvDialogContent,
} from "../..";

import { simulateUpload, cancelUpload } from "./simulator";

import rainbow from "./rainbow.jpg";

export default {
  title: "Forms/File Uploader",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvFileUploader } from "@hv/uikit-react-core"',

    dsVersion: "3.4.0",
  },
  component: HvFileUploader,
  subcomponents: { HvFileUploaderPreview },
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

export const WithPreviewThumbnails = () => {
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");

  const openDialog = (url, title) => {
    setPreviewUrl(url);
    setPreviewTitle(title);
    setOpen(true);
  };

  function addFile(file, setList) {
    const newFile = file;

    // see https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#using_object_urls
    // specially to understand the need to explicitly call URL.revokeObjectURL() in Single Page Applications.
    const url = URL.createObjectURL(file);

    newFile.preview = (
      <HvFileUploaderPreview
        onClick={() => openDialog(url, file.name)}
        onUnload={() => {
          URL.revokeObjectURL(url);
        }}
        aria-label={`Open preview of ${file.name}`}
      >
        <img alt={`Thumbnail of ${file.name}`} src={url} />
      </HvFileUploaderPreview>
    );

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

          // the file preview could be set here instead
          // using a server side URL, for instance

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

  const [list, setList] = useState([
    {
      id: "1",
      name: "already_here.jpg",
      size: 5000,
      status: "success",
      preview: (
        <HvFileUploaderPreview
          aria-label="Open the bigger preview"
          onClick={() => openDialog(rainbow, "already_here.jpg")}
        >
          <img alt="Small preview of the uploaded file" src={rainbow} />
        </HvFileUploaderPreview>
      ),
    },
    {
      id: "2",
      name: "code.yaml",
      size: 200,
      status: "success",
      preview: <Code />,
    },
    {
      id: "3",
      name: "letter.docx",
      size: 2000,
      status: "success",
      preview: (
        <HvFileUploaderPreview
          aria-label="Open preview of the document (not!)"
          onClick={() => {}}
          disableOverlay
        >
          <DocWord />
        </HvFileUploaderPreview>
      ),
    },
  ]);

  return (
    <>
      <HvFileUploader
        acceptedFiles={["image/*"]}
        labels={{ sizeWarning: "Maximum file size:", acceptedFiles: "Pick an image" }}
        fileList={list}
        onFilesAdded={(newFiles) => {
          newFiles.forEach((newFile) => addFile(newFile, setList));
        }}
        onFileRemoved={(removedFile) => {
          removeFile(removedFile, setList);
        }}
      />
      <HvDialog open={open} onClose={() => setOpen(false)}>
        <HvDialogTitle>{previewTitle}</HvDialogTitle>
        <HvDialogContent>
          <img
            alt="Preview of the uploaded file"
            src={previewUrl}
            style={{ maxWidth: "100%", maxHeight: "70vh" }}
          />
        </HvDialogContent>
      </HvDialog>
    </>
  );
};

WithPreviewThumbnails.parameters = {
  docs: {
    description: {
      story:
        "Each item can display a small preview of the uploaded file, like an image thumbnail or an icon representing the file type. " +
        "A bigger preview might be presented in a modal when clicking it.<br>" +
        "The preview can be any node/component. Accessibility must be addressed, e.g. by setting the thumbnail's `alt` property " +
        "and the button's `aria-label`.<br><br>" +
        "When displaying client side previews using `URL.createObjectURL()`, don't forget to clean them using `URL.revokeObjectURL()` " +
        "to avoid memory leaks. See [Using object URLs](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#using_object_urls).<br><br>" +
        "The `HvFileUploaderPreview` component is available to facilitate the styling of the button (when clickable) and the detection of image unloading.",
    },
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
};
