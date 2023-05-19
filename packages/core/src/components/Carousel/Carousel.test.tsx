/* eslint-env jest */

import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { HvCarousel, HvCarouselSlide } from ".";

Element.prototype.scrollIntoView = vi.fn();

const setup = ({ title = "TITLE", numImages = 10, onChange = () => {} }) => {
  return render(
    <HvCarousel
      title={title}
      onChange={onChange}
      renderThumbnail={(i) => <img src={`/image-${i}`} alt={`label-${i}`} />}
    >
      {Array.from(Array(numImages), (el, i) => (
        <HvCarouselSlide src={`/image-${i}`} alt={`label-${i}`} />
      ))}
    </HvCarousel>
  );
};

describe("<HvCarousel>", () => {
  it("renders the general structure", () => {
    const title = "MY_TITLE";
    const numImages = 10;

    setup({ title, numImages });

    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(numImages * 2); // images + thumbnails

    const prevButton = screen.getByRole("button", { name: "Backwards" });
    expect(prevButton).toBeInTheDocument();
    const nextButton = screen.getByRole("button", { name: "Forwards" });
    expect(nextButton).toBeInTheDocument();

    expect(screen.getByText(`1 / ${numImages}`)).toBeInTheDocument();
  });

  it("switches images on navigation button click", () => {
    const numImages = 10;
    const mockChange = vi.fn();

    setup({ numImages, onChange: mockChange });

    const prevButton = screen.getByRole("button", { name: "Backwards" });
    const nextButton = screen.getByRole("button", { name: "Forwards" });

    expect(screen.getByText(`1 / ${numImages}`)).toBeInTheDocument();
    expect(mockChange).toHaveBeenCalledTimes(0);

    fireEvent.click(nextButton);
    expect(screen.getByText(`2 / ${numImages}`)).toBeInTheDocument();
    expect(mockChange).toHaveBeenCalledTimes(1);

    fireEvent.click(prevButton);
    expect(screen.getByText(`1 / ${numImages}`)).toBeInTheDocument();
    expect(mockChange).toHaveBeenCalledTimes(2);
  });

  it("switches images on thumbnail click", () => {
    const numImages = 10;
    const mockChange = vi.fn();

    setup({ numImages, onChange: mockChange });

    const thumbnail4 = screen.getByRole("button", { name: "label-3" });
    fireEvent.click(thumbnail4);

    expect(screen.getByText(`4 / ${numImages}`)).toBeInTheDocument();
    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(mockChange).toHaveBeenCalledWith(3);
  });
});
