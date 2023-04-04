import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HvFileUploader, HvFileUploaderProps } from "./FileUploader";
import { HvFileData } from "./File";

const fileList: HvFileData[] = [
  {
    id: "1",
    name: "Screenshot 2019-12-05 at 17.15.43.png",
    size: 14100000,
    type: "image/png",
  },
  {
    id: "2",
    name: "Screenshot 2019-12-05 at 12.03.13.png",
    size: 875000,
    type: "image/png",
  },
] as HvFileData[];

const baseProps: HvFileUploaderProps = {
  fileList,
  acceptedFiles: ["jpeg"],
  maxFileSize: 12,
};

const Main = (props: HvFileUploaderProps) => (
  <HvFileUploader onFilesAdded={() => {}} onFileRemoved={() => {}} {...props} />
);

describe("FileUploader", () => {
  it("should be defined", () => {
    const { container } = render(<Main {...baseProps} />);

    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<Main {...baseProps} />);

    expect(container).toMatchSnapshot();
  });

  it("should render the file list", () => {
    const { getByRole, queryAllByRole } = render(<Main {...baseProps} />);

    expect(getByRole("list")).toBeVisible();
    expect(queryAllByRole("listitem").length).toBe(2);
  });

  it("should render the dropzone", () => {
    const { getByRole } = render(<Main {...baseProps} />);

    const dropZone = getByRole("button", { name: /Label/ });

    expect(dropZone).toBeVisible();
  });

  it("should call file upload callback", () => {
    const onFilesAddedMock = vi.fn();

    const { getByRole } = render(
      <Main {...baseProps} onFilesAdded={onFilesAddedMock} />
    );

    const dropZone = getByRole("button", { name: /Label/ });

    fireEvent.change(dropZone.querySelector("input") as Element, {});

    expect(onFilesAddedMock).toHaveBeenCalled();
  });

  it("should display incorrect file type warning", () => {
    const { queryAllByRole } = render(
      <Main
        {...baseProps}
        fileList={
          [
            {
              id: "3",
              status: "fail",
              errorMessage: "File type not allowed for upload",
              name: "somefile.jpeg",
              size: 141,
              type: "image/jpeg",
            },
          ] as HvFileData[]
        }
        acceptedFiles={["png"]}
        maxFileSize={1}
      />
    );

    const files = queryAllByRole("listitem");

    expect(
      within(files[0]).getByText(/File type not allowed for upload/)
    ).toBeVisible();
  });

  it("should display incorrect file size warning", () => {
    const { queryAllByRole } = render(
      <Main
        {...baseProps}
        fileList={
          [
            {
              id: "4",
              status: "fail",
              errorMessage: "The file exceeds the maximum upload size",
              name: "somefile.jpeg",
              size: 141,
              type: "image/jpeg",
            },
          ] as HvFileData[]
        }
        acceptedFiles={["png"]}
        maxFileSize={5 * 1000}
      />
    );

    const files = queryAllByRole("listitem");

    expect(
      within(files[0]).getByText(/The file exceeds the maximum upload size/)
    ).toBeVisible();
  });
});
