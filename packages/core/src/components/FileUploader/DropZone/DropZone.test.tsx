import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HvDropZone, HvDropZoneProps } from "./DropZone";

const props: HvDropZoneProps = {
  onFilesAdded: vi.fn(),
  labels: {
    dropzone: "Label",
    sizeWarning: "Max. file size:",
    acceptedFiles: "Accepted files:",
    drag: "Drag and drop or",
    selectFiles: "Select files",
    dropFiles: "Drop files here",
    fileSizeError: "The file exceeds the maximum upload size",
    fileTypeError: "File type not allowed for upload",
  },
  acceptedFiles: [],
  maxFileSize: 1,
};

describe("DropZone", () => {
  it("should render drop zone button and labels", () => {
    render(<HvDropZone {...props} />);

    expect(screen.getByText("Select files")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Drag and drop or Select files/i })
    ).toBeInTheDocument();
  });
});
