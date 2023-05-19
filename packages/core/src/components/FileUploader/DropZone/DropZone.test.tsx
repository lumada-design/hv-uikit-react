import { render } from "@testing-library/react";
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
  it("should be defined", () => {
    const { container } = render(<HvDropZone id="dropzone-test" {...props} />);

    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvDropZone id="dropzone-test" {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("should render correctly when disabled", () => {
    const { container } = render(
      <HvDropZone id="dropzone-test" disabled multiple {...props} />
    );

    expect(container).toMatchSnapshot();
  });
});
