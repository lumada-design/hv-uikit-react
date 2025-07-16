import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { HvDropdownMenu } from ".";
import { HvListValue } from "../List";

const dataList: HvListValue[] = [
  { id: "item1", label: "item1" },
  { id: "item2", label: "item2" },
  { id: "item3", label: "item3" },
];

describe("DropdownMenu", () => {
  it("renders the button", () => {
    render(<HvDropdownMenu dataList={[]} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("opens when clicked", async () => {
    render(<HvDropdownMenu dataList={dataList} />);

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "item1" })).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem").length).toBe(3);
  });
});
