import React from "react";
import { render, screen } from "testing-utils";
import { HvConfusionMatrix } from "../..";

describe("<HvConfusionMatrix />", () => {
  it("should render the confusion matrix", async () => {
    const categories = ["Beaver", "Lion", "Seal", "Dog"];
    const z = [
      [95, 10, 6, 2],
      [15, 97, 12, 9],
      [1, 8, 100, 13],
      [20, 40, 16, 90],
    ];
    render(
      <HvConfusionMatrix
        data={[
          {
            x: categories,
            y: categories,
            z,
          },
        ]}
      />
    );
    await screen.findByText("Predicted Label");
    expect(screen.getByText("True Label")).toBeInTheDocument();
    z.forEach((line) => {
      line.forEach((value) => {
        expect(screen.getByText(value)).toBeInTheDocument();
      });
    });
    categories.forEach((category) => {
      expect(screen.getAllByText(category)).toHaveLength(2);
    });
  });
});
