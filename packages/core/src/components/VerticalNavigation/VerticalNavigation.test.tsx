import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { useMemo, useState } from "react";
import { LogOut, User } from "@hitachivantara/uikit-react-icons";
import userEvent from "@testing-library/user-event";
import {
  HvVerticalNavigation,
  HvVerticalNavigationAction,
  HvVerticalNavigationActions,
  HvVerticalNavigationHeader,
  HvVerticalNavigationTree,
} from "components";

const Sample = ({ collapsedMode }: { collapsedMode?: "simple" | "icon" }) => {
  const navigationData = useMemo(
    () => [
      { id: "00", label: "Overview" },
      { id: "01", label: "Analytics", selectable: false },
      {
        id: "02",
        label: "Storage",
        data: [
          {
            id: "02-01",
            label: "Cloud",
            data: [
              {
                id: "02-01-01",
                label: "Servers",
                href: "https://www.hitachivantara.com/en-us/news.html",
              },
              {
                id: "02-01-02",
                label: "HCP Anywhere",
                href: "/?path=/story/structure-vertical-navigation--main",
              },
              {
                id: "02-01-03",
                label: "This Computer",
                disabled: true,
              },
            ],
          },
        ],
      },
      {
        id: "03",
        label: "Administration",
        data: [
          {
            id: "03-01",
            label: "Rest API",
            data: [
              {
                id: "03-01-01",
                label: "Log Bundle",
              },
            ],
          },
        ],
      },
    ],
    []
  );

  const [value, setValue] = useState("00");

  const [show, setShow] = useState(true);

  const handleExpand = () => {
    setShow(!show);
  };
  return (
    <div style={{ display: "flex", width: 220, height: 530 }}>
      <HvVerticalNavigation id="sample1" collapsedMode={collapsedMode}>
        <HvVerticalNavigationHeader
          title="Menu"
          onClick={handleExpand}
          buttonProps={{
            "aria-label": "collapseButton",
            "aria-expanded": show,
          }}
        />
        <HvVerticalNavigationTree
          aria-label="Example 1 navigation"
          collapsible
          selected={value}
          onChange={(event, data) => {
            console.log(data);
            if (data.id === "02-01-01") {
              event.preventDefault();
              event.stopPropagation();
            }
            setValue(data.id);
          }}
          data={navigationData}
        />
        <HvVerticalNavigationActions>
          <HvVerticalNavigationAction label="Profile" icon={<User />} />
          <HvVerticalNavigationAction label="Logout" icon={<LogOut />} />
        </HvVerticalNavigationActions>
      </HvVerticalNavigation>
    </div>
  );
};

describe("VerticalNavigation", () => {
  it("should be defined", () => {
    const { container } = render(<Sample />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<Sample />);
    expect(container).toMatchSnapshot();
  });

  it("should collapsed", async () => {
    const { getByRole, getByLabelText } = render(
      <Sample collapsedMode="simple" />
    );

    const collapseButton = getByRole("button", { name: "collapseButton" });
    expect(collapseButton).toBeInTheDocument();
    expect(collapseButton).toHaveAttribute("aria-expanded", "true");

    const nav = getByLabelText("Example 1 navigation");
    expect(nav).toHaveStyle(`display : block`);

    await userEvent.click(collapseButton);

    expect(collapseButton).toHaveAttribute("aria-expanded", "false");
    expect(nav).not.toHaveStyle(`display : none`);
  });

  it("should have icons", async () => {
    const { getByRole, getByLabelText } = render(
      <Sample collapsedMode="icon" />
    );

    const collapseButton = getByRole("button", { name: "collapseButton" });
    expect(collapseButton).toBeInTheDocument();
    expect(collapseButton).toHaveAttribute("aria-expanded", "true");

    const nav = getByLabelText("Example 1 navigation");
    expect(nav).toHaveStyle(`display : block`);

    await userEvent.click(collapseButton);

    expect(collapseButton).toHaveAttribute("aria-expanded", "false");
    expect(nav).toHaveStyle(`display : block`);
  });

  it("should not have icons", () => {});
});
