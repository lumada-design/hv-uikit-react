import { useState } from "react";
import { css } from "@emotion/css";
import { Decorator, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { HvButton } from "@hitachivantara/uikit-react-core";
import { HvLineChart } from "@hitachivantara/uikit-react-viz";

const decorator: Decorator = (Story) => (
  <div
    className={css({
      height: 500,
      padding: 20,
    })}
  >
    {Story()}
  </div>
);

export default {
  title: "Tests/Visualizations",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false, delay: 5000 },
    eyes: { include: true, waitBeforeCapture: 5000 },
  },
  decorators: [decorator],
};

/** This tests if the horizontal slider resets when removed */
export const SliderReset: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hideBtn = canvas.getByRole("button", { name: "Hide" });
    await userEvent.click(hideBtn);
    const showBtn = canvas.getByRole("button", { name: "Show" });
    expect(showBtn).toBeInTheDocument();
  },
  render: () => {
    const [show, setShow] = useState(true);

    return (
      <>
        <HvButton onClick={() => setShow((prev) => !prev)}>
          {show ? "Hide" : "Show"}
        </HvButton>
        <HvLineChart
          data={{
            Month: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            "Sales Target": [
              5929, 2393, 1590, 7817, 4749, 1702, 2381, 2909, 6732, 3098, 2119,
              2146,
            ],
          }}
          groupBy="Month"
          measures="Sales Target"
          onOptionChange={(option) => {
            if (show) {
              option.dataZoom = [
                { ...option.dataZoom[0], end: 80, start: 50 }, // Setting data zoom because it was not possible through "play"
                option.dataZoom[1],
              ];
            }
            return option;
          }}
          horizontalRangeSlider={{ show }}
        />
      </>
    );
  },
};
