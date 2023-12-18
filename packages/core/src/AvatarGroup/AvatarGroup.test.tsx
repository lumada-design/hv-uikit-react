import { render, screen } from "@testing-library/react";

import { LogIn } from "@hitachivantara/uikit-react-icons";

import { HvAvatarGroup } from "./AvatarGroup";

import { HvAvatar } from "../Avatar/Avatar";

describe("HvAvatarGroup", () => {
  it("renders without crashing", () => {
    render(<HvAvatarGroup />);
  });

  it("renders the correct number of avatars", () => {
    render(
      <HvAvatarGroup>
        <HvAvatar>
          <LogIn role="img" aria-label="login" />
        </HvAvatar>
        <HvAvatar>
          <LogIn role="img" aria-label="login" />
        </HvAvatar>
        <HvAvatar>
          <LogIn role="img" aria-label="login" />
        </HvAvatar>
      </HvAvatarGroup>
    );

    const renderedAvatars = screen.getAllByRole("img");
    expect(renderedAvatars).toHaveLength(3);
  });

  it("renders the correct number of avatars when `maxVisible` is set", () => {
    render(
      <HvAvatarGroup maxVisible={1}>
        <HvAvatar>
          <LogIn role="img" aria-label="login" />
        </HvAvatar>
        <HvAvatar>
          <LogIn role="img" aria-label="login" />
        </HvAvatar>
        <HvAvatar>
          <LogIn role="img" aria-label="login" />
        </HvAvatar>
      </HvAvatarGroup>
    );

    const renderedAvatars = screen.getAllByRole("img");
    expect(renderedAvatars).toHaveLength(1);
  });

  it("renders overflow avatar when number of avatars exceeds maxVisible", () => {
    render(
      <HvAvatarGroup maxVisible={2}>
        <HvAvatar>
          <LogIn role="img" aria-label="login" />
        </HvAvatar>
        <HvAvatar>
          <LogIn role="img" aria-label="login" />
        </HvAvatar>
        <HvAvatar>
          <LogIn role="img" aria-label="login" />
        </HvAvatar>
      </HvAvatarGroup>
    );

    const overflowAvatar = screen.getByText("+1");
    expect(overflowAvatar).toBeInTheDocument();
  });
});
