/* eslint-env jest */

import React from "react";

import { render, screen, fireEvent } from "testing-utils";

import {
  Main,
  WithoutThumbnails,
  LowCardinality,
  ImageCarouselXS,
} from "../stories/ImageCarousel.stories";

describe("<HvImageCarousel>", () => {
  describe("sample snapshot testing", () => {
    it("Main", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });
    it("WithoutThumbnails", () => {
      const { container } = render(<WithoutThumbnails />);
      expect(container).toMatchSnapshot();
    });
    it("LowCardinality", () => {
      const { container } = render(<LowCardinality />);
      expect(container).toMatchSnapshot();
    });
    it("ImageCarouselXS", () => {
      const { container } = render(<ImageCarouselXS />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("general structure", () => {
    it("renders the image carousel as expected", () => {
      render(<Main />);
      const title = screen.getByText("Star Wars Characters");
      expect(title).toBeInTheDocument();
      const images = screen.getAllByRole("img");
      expect(images.length).toBe(10);
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBe(11);
      const numberImage = screen.getByText("1");
      expect(numberImage).toBeInTheDocument();
      const numberImages = screen.getByText(/9/);
      expect(numberImages).toBeInTheDocument();
    });
    it("renders WithoutThumbnails as expected", () => {
      render(<WithoutThumbnails />);
      const images = screen.getAllByRole("img");
      expect(images.length).toBe(1);
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBe(1);
      const numberImage = screen.getByText("1");
      expect(numberImage).toBeInTheDocument();
      const numberImages = screen.getByText(/9/);
      expect(numberImages).toBeInTheDocument();
    });
    it("renders the low cardinality image carousel", () => {
      render(<LowCardinality />);
      const title = screen.getByText("Landscapes");
      expect(title).toBeInTheDocument();
      const images = screen.getAllByRole("img");
      expect(images.length).toBe(11);
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBe(11);
      const circles = screen.getAllByTitle(/Circle/);
      expect(circles.length).toBe(10);
    });
    it("renders image carousel xs", () => {
      render(<ImageCarouselXS />);
      const images = screen.getAllByRole("img");
      expect(images.length).toBe(10);
    });
  });

  describe("interactions", () => {
    describe("Main", () => {
      it("able to switch image with the buttons", async () => {
        render(<Main />);
        let image1 = screen.getAllByAltText(/DarthVader/);
        expect(image1.length).toBe(2);
        let image2 = screen.getAllByAltText(/Yoda/);
        expect(image2.length).toBe(2);
        let selImage = screen.getByText("1");
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(11);
        fireEvent.click(buttons[0]);
        image1 = await screen.findAllByAltText(/DarthVader/);
        expect(image2.length).toBe(2);
        image2 = await screen.findAllByAltText(/Yoda/);
        expect(image2.length).toBe(2);
        selImage = screen.getByText("9");
        expect(selImage).toBeInTheDocument();
        fireEvent.click(buttons[1]);
        image1 = await screen.findAllByAltText(/DarthVader/);
        expect(image2.length).toBe(2);
        image2 = await screen.findAllByAltText(/Yoda/);
        expect(image2.length).toBe(2);
        selImage = screen.getByText("1");
        expect(selImage).toBeInTheDocument();
      });
    });
    describe("WithoutThumbnails", () => {
      it("able to switch images with the buttons", async () => {
        render(<WithoutThumbnails />);
        const img = screen.getAllByRole("img");
        expect(img.length).toBe(1);
        let selImage = screen.getByText("1");
        expect(selImage).toBeInTheDocument();
        let buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(1);
        fireEvent.click(buttons[0]);
        buttons = await screen.findAllByRole("button");
        expect(buttons.length).toBe(2);
        selImage = screen.getByText("2");
        expect(selImage).toBeInTheDocument();
        fireEvent.click(buttons[0]);
        buttons = await screen.findAllByRole("button");
        expect(buttons.length).toBe(1);
        selImage = screen.getByText("1");
        expect(selImage).toBeInTheDocument();
      });
    });
    describe("Low Cardinality", () => {
      it("able to switch image", async () => {
        render(<LowCardinality />);
        let circles = screen.getAllByTitle(/Circle/);
        expect(circles[0].title).toBe("BigCircle 0");
        expect(circles[1].title).toBe("Circle 1");
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(11);
        fireEvent.click(buttons[2]);
        circles = screen.getAllByTitle(/Circle/);
        expect(circles[0].title).toBe("Circle 0");
        expect(circles[1].title).toBe("BigCircle 1");
      });
    });
  });
});
