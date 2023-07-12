import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LogIn } from "@hitachivantara/uikit-react-icons";
import { HvAvatar } from "./Avatar";

describe("Avatar", () => {
  it("renders the text", () => {
    render(<HvAvatar>AB</HvAvatar>);

    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    render(
      <HvAvatar>
        <LogIn aria-label="login" />
      </HvAvatar>
    );

    expect(screen.getByLabelText("login")).toBeInTheDocument();
  });
});
