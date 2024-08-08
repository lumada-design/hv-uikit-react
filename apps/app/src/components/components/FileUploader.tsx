import { useState } from "react";
import {
  HvDialog,
  HvDialogContent,
  HvDialogTitle,
  HvFileData,
  HvFileUploader,
  HvFileUploaderPreview,
} from "@hitachivantara/uikit-react-core";
import { Code, DocWord } from "@hitachivantara/uikit-react-icons";

const uploadHandlers = new Map();

function clearUploadSimulationHandler(file: HvFileData) {
  clearInterval(uploadHandlers.get(file));
  uploadHandlers.delete(file);
}

const simulateUploadStep = (
  file: HvFileData,
  onProgress: (progress: number) => void,
  onComplete: () => void,
  uploadSpeed: number,
) => {
  const progress =
    file.progress != null && file.size != null
      ? Math.min(file.progress + uploadSpeed / 4, file.size)
      : 0;

  onProgress(progress);

  if (file.size === progress) {
    clearUploadSimulationHandler(file);

    onComplete();
  }
};

export const simulateUpload = (
  file: HvFileData,
  onProgress: (progress: number) => void,
  onComplete: () => void,
  uploadSpeed = 20000 /* bits per second */,
) => {
  uploadHandlers.set(
    file,
    setInterval(() => {
      simulateUploadStep(file, onProgress, onComplete, uploadSpeed);
    }, 250),
  );
};

export const cancelUpload = (file: HvFileData) => {
  clearUploadSimulationHandler(file);
};

export const FileUploader = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const openDialog = (url: string, title: string) => {
    setPreviewUrl(url);
    setPreviewTitle(title);
    setOpen(true);
  };

  const [list, setList] = useState<HvFileData[]>([
    {
      id: "1",
      name: "already_here.jpg",
      size: 5000,
      status: "success",
      preview: (
        <HvFileUploaderPreview
          aria-label="Open the bigger preview"
          onClick={() =>
            openDialog("https://i.imgur.com/YcVYmM0.jpg", "already_here.jpg")
          }
        >
          <img
            alt="Small preview of the uploaded file"
            src="https://i.imgur.com/YcVYmM0.jpg"
          />
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
  ] as HvFileData[]);

  const addFile = (file: HvFileData) => {
    const newFile = file;

    // See https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#using_object_urls
    // specially to understand the need to explicitly call URL.revokeObjectURL() in Single Page Applications.
    const url = URL.createObjectURL(file as any);

    newFile.preview = (
      <HvFileUploaderPreview
        onClick={() => openDialog(url, file.name || "")}
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

          // The file preview could be set here instead
          // using a server side URL, for instance

          setList((previousList) => [...previousList]);
        },
      );
    }

    setList((previousList) => [newFile, ...previousList]);
  };

  const removeFile = (fileToRemove: HvFileData) => {
    if (fileToRemove.status === "progress") {
      cancelUpload(fileToRemove);
    }

    setList((previousList) =>
      previousList.filter((file) => file !== fileToRemove),
    );
  };

  return (
    <>
      <HvFileUploader
        acceptedFiles={["image/*"]}
        labels={{
          sizeWarning: "Maximum file size:",
          acceptedFiles: "Pick an image",
        }}
        fileList={list}
        onFilesAdded={(newFiles) => {
          newFiles.forEach((newFile) => addFile(newFile));
        }}
        onFileRemoved={(removedFile) => {
          removeFile(removedFile);
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
