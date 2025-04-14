import { Button } from "@mui/material";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import renderTestProvider from "../tests/testUtils";
import { useBannerContext } from "./BannerProvider";

vi.mock("uuid", () => ({
  v4: vi.fn(() => "mocked-uuid"), // Replace 'mocked-uuid' with the desired mock UUID
}));

const TestComponent = () => {
  const { show } = useBannerContext();

  return (
    <div>
      <Button
        onClick={() =>
          show({
            type: "banner",
            variant: "default",
            message: "Lorem Ipsum",
          })
        }
      >
        Add Banner
      </Button>
    </div>
  );
};

describe("BannerProvider", () => {
  it("should show and dismiss the banner correctly", async () => {
    const user = userEvent.setup();
    const { queryByText, getByText, getByRole } = await renderTestProvider(
      <TestComponent />,
      {
        menu: [
          {
            label: "Menu 1",
            target: "/menu1",
          },
        ],
      },
    );

    expect(queryByText("Lorem Ipsum")).not.toBeInTheDocument();

    const addBannerBtn = getByText("Add Banner");
    await user.click(addBannerBtn);

    expect(getByText("Lorem Ipsum")).toBeInTheDocument();

    const closeBannerBtn = getByRole("button", {
      name: "Close banner",
    });
    await user.click(closeBannerBtn);

    expect(queryByText("Lorem Ipsum")).not.toBeInTheDocument();
  });
});
