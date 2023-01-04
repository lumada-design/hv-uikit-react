import { render } from "@testing-library/react";
import { Typography } from "components";
import { describe, expect, it } from "vitest";
import { Card, CardContent, CardHeader, CardMedia } from "./";

describe("Card", () => {
  it("should be defined", () => {
    const { container } = render(<Card />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<Card />);
    expect(container).toMatchSnapshot();
  });

  it("should render header", () => {
    const { container, getByText } = render(
      <Card>
        <CardHeader title="mockTitle" subheader="mockSubtitle" />
      </Card>
    );
    expect(getByText("mockTitle")).toBeInTheDocument();
    expect(getByText("mockSubtitle")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should render image", () => {
    const mockImg = "";
    const { container, getByRole } = render(
      <Card>
        <CardMedia
          component="img"
          // @ts-ignore
          alt="mockImg"
          image={mockImg}
        />
      </Card>
    );
    expect(getByRole("img", { name: /mockImg/ })).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should render content", () => {
    const { container, getByText } = render(
      <Card>
        <CardContent>
          <Typography variant="label">mockCardContent</Typography>
        </CardContent>
      </Card>
    );
    expect(getByText("mockCardContent")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should render all the compoents", () => {
    const mockImg = "";
    const { container, getByText, getByRole } = render(
      <Card>
        <CardHeader title="mockTitle" subheader="mockSubtitle" />
        <CardMedia
          component="img"
          // @ts-ignore
          alt="mockImg"
          image={mockImg}
        />
        <CardContent>
          <Typography variant="label">mockCardContent</Typography>
        </CardContent>
      </Card>
    );
    expect(getByText("mockTitle")).toBeInTheDocument();
    expect(getByText("mockSubtitle")).toBeInTheDocument();
    expect(getByRole("img", { name: /mockImg/ })).toBeInTheDocument();
    expect(getByText("mockCardContent")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
