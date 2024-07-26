import { render, screen } from "@testing-library/react";

import { HvCard } from "./Card";
import { HvCardMedia } from "./CardMedia";

describe("HvCard", () => {
  it("renders the content", () => {
    render(<HvCard>This is a card</HvCard>);
    expect(screen.getByText("This is a card")).toBeInTheDocument();
  });

  it("renders the Card as a custom component", () => {
    render(<HvCard component="button">This is a card</HvCard>);
    expect(
      screen.getByRole("button", { name: "This is a card" }),
    ).toBeInTheDocument();
  });

  it("renders an image in the Card", () => {
    render(
      <HvCard>
        <HvCardMedia
          src="https://venturesailholidays.com/wp-content/uploads/Alrgave-Portugal.jpg"
          alt="image"
        />
      </HvCard>,
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
