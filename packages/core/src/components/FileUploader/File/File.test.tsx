import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { HvFile, HvFileData, HvFileProps } from "./File";

const dataFail: HvFileData = {
  name: "somefile.png",
  size: 875,
  errorMessage: "File type not allowed for upload",
  progress: 25,
  status: "fail",
} as HvFileData;

const dataSuccess: HvFileData = {
  name: "somefile.png",
  size: 875,
  errorMessage: "File type not allowed for upload",
  progress: 25,
  status: "success",
} as HvFileData;

const Main = (props: HvFileProps) => (
  <HvFile
    onFileRemoved={() => {}}
    removeFileButtonLabel="removeFileButtonLabel"
    {...props}
  />
);

describe("File", () => {
  it("should be defined", () => {
    const { getByRole } = render(<Main data={dataSuccess} />);

    const file = getByRole("listitem");

    expect(file).toBeDefined();
  });

  it("should render correctly success status", () => {
    const { getByRole } = render(<Main data={dataSuccess} />);

    const file = getByRole("listitem");

    expect(file).toBeVisible();

    expect(file).toMatchSnapshot();
  });

  it("should render correctly fail status", () => {
    const { getByRole } = render(<Main data={dataFail} />);

    const file = getByRole("listitem");

    expect(file).toBeVisible();

    expect(file).toMatchSnapshot();
  });

  it("should call the delete file callback", async () => {
    const onClickMock = vi.fn();

    const { getByRole } = render(
      <Main data={dataSuccess} onFileRemoved={onClickMock} />
    );

    const fileButton = getByRole("button");

    await userEvent.click(fileButton);

    expect(onClickMock).toHaveBeenCalled();
  });
});
