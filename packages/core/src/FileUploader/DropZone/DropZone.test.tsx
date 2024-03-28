import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { HvDropZone, HvDropZoneProps } from "./DropZone";

const props: HvDropZoneProps = {
  onFilesAdded: vi.fn(),
  labels: {
    dropzone: "Label",
    sizeWarning: "Max. file size:",
    drag: "Drag and drop or",
    selectFiles: "Select files",
    dropFiles: "Drop files here",
    fileSizeError: "The file exceeds the maximum upload size",
    fileTypeError: "File type not allowed for upload",
  },
  accept: ".jpg",
  maxFileSize: 1,
};

describe("DropZone", () => {
  it("should render drop zone input and labels", () => {
    render(<HvDropZone {...props} />);

    expect(screen.getByText("Label", { selector: "label" })).toBeVisible();
    expect(
      screen.getByText("Max. file size: 1.00B (.jpg)", { selector: "label" }),
    ).toBeVisible();
    expect(screen.getByText("Drag and drop or")).toBeVisible();
    expect(screen.getByText("Select files")).toBeVisible();
    expect(
      screen.getByLabelText("Label", { selector: "input" }),
    ).toBeInTheDocument();
  });
});
