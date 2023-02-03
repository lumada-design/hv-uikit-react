import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvFileData } from "../File";
import { HvFileList } from "./FileList";

const Main = () => (
  <HvFileList
    id="list"
    list={
      [
        {
          id: "1",
          errorMessage: "File type not allowed for upload",
          status: "fail",
          name: "Screenshot 2019-12-05 at 17.15.43.png",
          size: 14106,
        },
        {
          id: "2",
          errorMessage: "File type not allowed for upload",
          status: "fail",
          name: "Screenshot 2019-12-05 at 12.03.13.png",
          size: 875,
        },
      ] as HvFileData[]
    }
    removeFileButtonLabel="removeFileButtonLabel"
    onFileRemoved={() => {}}
  />
);

describe("FileList", () => {
  it("should be defined", () => {
    const { container } = render(<Main />);

    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<Main />);

    expect(container).toMatchSnapshot();
  });

  it("should render the list with items", () => {
    const { container, queryAllByRole } = render(<Main />);

    expect(container).toBeVisible();

    const lists = queryAllByRole("listitem");

    expect(lists.length).toBe(2);
  });
});
