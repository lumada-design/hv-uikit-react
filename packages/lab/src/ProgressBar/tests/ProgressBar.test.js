/* eslint-env jest */

import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";

import { render, screen } from "testing-utils";
import { HvButton } from "@hitachivantara/uikit-react-core";

import { HvProgressBar } from "../..";

import { Main } from "../stories/ProgressBar.stories";

// eslint-disable-next-line react/prop-types
const ProgressBarSimulator = ({ inc, error, undeterminate, ariaLabel, ariaLive }) => {
  const [status, setStatus] = useState("inProgress");
  const [value, setValue] = useState(0);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (value === 100) {
        setRun(false);
        clearInterval(interval);
        setStatus("completed");
      } else if (error && value === error) {
        clearInterval(interval);
        setStatus("error");
      } else if (run) setValue(inc);
    }, 5);
    return () => clearInterval(interval);
  }, [inc, value, run, error]);

  const reset = () => {
    setValue(0);
    setStatus("inProgress");
  };

  const start = () => {
    setRun(true);
  };

  return (
    <div style={{ width: 400 }}>
      <HvProgressBar
        value={value}
        status={status}
        undeterminate={undeterminate}
        ariaProps={{
          "aria-label": ariaLabel,
          "aria-busy": false,
          "aria-live": ariaLive,
        }}
      />
      <div style={{ marginTop: 10 }}>
        <HvButton onClick={start}>Start</HvButton>
        <HvButton style={{ marginLeft: 10 }} onClick={reset}>
          Reset
        </HvButton>
      </div>
    </div>
  );
};

describe("ProgressBar", () => {
  jest.setTimeout(30000);
  it("General", async () => {
    const { container } = render(<Main />);

    expect(container).toMatchSnapshot();
  });

  describe("Static Determinate Value Tests", () => {
    it("completed progress bar", async () => {
      const { container, findByRole, findByText, getByLabelText } = render(
        <HvProgressBar
          value={100}
          ariaProps={{
            "aria-label": "My Aria Label",
            "aria-busy": false,
            "aria-live": "polite",
          }}
        />
      );

      const progressBar = await findByRole("progressbar");
      await findByText("100%");
      expect(progressBar).toHaveAttribute("aria-valuenow", "100");

      const bar = getByLabelText("My Aria Label");
      expect(bar).toBeInTheDocument();
      expect(bar).not.toHaveClass(
        "HvProgressBar-progressBarLabel HvProgressBar-progressBarLabelHidden"
      );

      expect(container).toBeInTheDocument();
    });

    it("zero progress bar", async () => {
      const { container, findByRole, findByText, getByLabelText } = render(
        <HvProgressBar
          value={0}
          ariaProps={{
            "aria-label": "My Aria Label",
            "aria-busy": false,
            "aria-live": "polite",
          }}
        />
      );
      const progressBar = await findByRole("progressbar");
      await findByText("0%");
      expect(progressBar).toHaveAttribute("aria-valuenow", "0");

      const bar = getByLabelText("My Aria Label");
      expect(bar).toBeInTheDocument();
      expect(bar).not.toHaveClass(
        "HvProgressBar-progressBarLabel HvProgressBar-progressBarLabelHidden"
      );

      expect(container).toBeInTheDocument();
    });

    it("middle progress bar", async () => {
      const { container, findByRole, findByText, getByLabelText } = render(
        <HvProgressBar
          value={50}
          ariaProps={{
            "aria-label": "My Aria Label",
            "aria-busy": false,
            "aria-live": "polite",
          }}
        />
      );
      const progressBar = await findByRole("progressbar");
      await findByText("50%");
      expect(progressBar).toHaveAttribute("aria-valuenow", "50");

      const bar = getByLabelText("My Aria Label");
      expect(bar).toBeInTheDocument();
      expect(bar).not.toHaveClass(
        "HvProgressBar-progressBarLabel HvProgressBar-progressBarLabelHidden"
      );

      expect(container).toBeInTheDocument();
    });

    it("out of bounds progress bar (up)", async () => {
      const { container, findByRole, findByText, getByLabelText } = render(
        <HvProgressBar
          value={200}
          ariaProps={{
            "aria-label": "My Aria Label",
            "aria-busy": false,
            "aria-live": "polite",
          }}
        />
      );
      const progressBar = await findByRole("progressbar");
      await findByText("100%");
      expect(progressBar).toHaveAttribute("aria-valuenow", "100");

      const bar = getByLabelText("My Aria Label");
      expect(bar).toBeInTheDocument();
      expect(bar).not.toHaveClass(
        "HvProgressBar-progressBarLabel HvProgressBar-progressBarLabelHidden"
      );

      expect(container).toBeInTheDocument();
    });

    it("out of bounds progress bar (down)", async () => {
      const { container, findByRole, findByText, getByLabelText } = render(
        <HvProgressBar
          value={-200}
          ariaProps={{
            "aria-label": "My Aria Label",
            "aria-busy": false,
            "aria-live": "polite",
          }}
        />
      );
      const progressBar = await findByRole("progressbar");
      await findByText("0%");
      expect(progressBar).toHaveAttribute("aria-valuenow", "0");

      const bar = getByLabelText("My Aria Label");
      expect(bar).toBeInTheDocument();
      expect(bar).not.toHaveClass(
        "HvProgressBar-progressBarLabel HvProgressBar-progressBarLabelHidden"
      );

      expect(container).toBeInTheDocument();
    });

    it("error", async () => {
      const { container, findByRole, findByText, getByLabelText } = render(
        <HvProgressBar
          value={-200}
          ariaProps={{
            "aria-label": "My Aria Label",
            "aria-busy": false,
            "aria-live": "polite",
          }}
        />
      );
      const progressBar = await findByRole("progressbar");
      await findByText("0%");
      expect(progressBar).toHaveAttribute("aria-valuenow", "0");

      const bar = getByLabelText("My Aria Label");
      expect(bar).toBeInTheDocument();
      expect(bar).not.toHaveClass(
        "HvProgressBar-progressBarLabel HvProgressBar-progressBarLabelHidden"
      );

      expect(container).toBeInTheDocument();
    });
  });

  describe("Static Undeterminate Value Tests", () => {
    it("completed progress bar", async () => {
      const { container, findByRole, getByLabelText } = render(
        <HvProgressBar
          value={100}
          undeterminate
          ariaProps={{
            "aria-label": "My Aria Label",
            "aria-busy": false,
            "aria-live": "polite",
          }}
        />
      );

      const progressBar = await findByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "100");

      const bar = getByLabelText("My Aria Label");
      expect(bar).toBeInTheDocument();
      expect(bar).toHaveClass(
        "HvProgressBar-progressBarLabel HvProgressBar-progressBarLabelHidden"
      );

      expect(container).toBeInTheDocument();
    });

    it("zero progress bar", async () => {
      const { container, findByRole, getByLabelText } = render(
        <HvProgressBar
          value={0}
          undeterminate
          ariaProps={{
            "aria-label": "My Aria Label",
            "aria-busy": false,
            "aria-live": "polite",
          }}
        />
      );

      const progressBar = await findByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "0");

      const bar = getByLabelText("My Aria Label");
      expect(bar).toBeInTheDocument();
      expect(bar).toHaveClass(
        "HvProgressBar-progressBarLabel HvProgressBar-progressBarLabelHidden"
      );

      expect(container).toBeInTheDocument();
    });

    it("middle progress bar", async () => {
      const { container, findByRole, getByLabelText } = render(
        <HvProgressBar
          value={50}
          undeterminate
          ariaProps={{
            "aria-label": "My Aria Label",
            "aria-busy": false,
            "aria-live": "polite",
          }}
        />
      );
      const progressBar = await findByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "50");

      const bar = getByLabelText("My Aria Label");
      expect(bar).toBeInTheDocument();
      expect(bar).toHaveClass(
        "HvProgressBar-progressBarLabel HvProgressBar-progressBarLabelHidden"
      );

      expect(container).toBeInTheDocument();
    });

    it("out of bounds progress bar (up)", async () => {
      const { container, findByRole, getByLabelText } = render(
        <HvProgressBar
          value={200}
          undeterminate
          ariaProps={{
            "aria-label": "My Aria Label",
            "aria-busy": false,
            "aria-live": "polite",
          }}
        />
      );
      const progressBar = await findByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "100");

      const bar = getByLabelText("My Aria Label");
      expect(bar).toBeInTheDocument();
      expect(bar).toHaveClass(
        "HvProgressBar-progressBarLabel HvProgressBar-progressBarLabelHidden"
      );

      expect(container).toBeInTheDocument();
    });

    it("out of bounds progress bar (down)", async () => {
      const { container, findByRole, getByLabelText } = render(
        <HvProgressBar
          value={-200}
          undeterminate
          ariaProps={{
            "aria-label": "My Aria Label",
            "aria-busy": false,
            "aria-live": "polite",
          }}
        />
      );
      const progressBar = await findByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "0");

      const bar = getByLabelText("My Aria Label");
      expect(bar).toBeInTheDocument();
      expect(bar).toHaveClass(
        "HvProgressBar-progressBarLabel HvProgressBar-progressBarLabelHidden"
      );

      expect(container).toBeInTheDocument();
    });

    it("error", async () => {
      const { container, findByRole, getByLabelText } = render(
        <HvProgressBar
          value={-200}
          undeterminate
          ariaProps={{
            "aria-label": "My Aria Label",
            "aria-busy": false,
            "aria-live": "polite",
          }}
        />
      );

      const progressBar = await findByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "0");

      const bar = getByLabelText("My Aria Label");
      expect(bar).toBeInTheDocument();
      expect(bar).toHaveClass(
        "HvProgressBar-progressBarLabel HvProgressBar-progressBarLabelHidden"
      );

      expect(container).toBeInTheDocument();
    });
  });

  describe("Aria Label", () => {
    it("check aria label", async () => {
      const { container, findByRole, getByLabelText } = render(
        <HvProgressBar
          value={100}
          ariaProps={{
            "aria-label": "My Aria Label",
            "aria-busy": false,
            "aria-live": "polite",
          }}
        />
      );
      await findByRole("progressbar");

      const bar = getByLabelText("My Aria Label");

      expect(bar).toBeInTheDocument();

      expect(container).toBeInTheDocument();
    });
  });

  describe("Dynamic Determinate Value Tests", () => {
    it("completed progress bar", async () => {
      const { container, findByRole, findByText } = render(
        <ProgressBarSimulator label={(v) => `${v}%`} inc={(v) => v + 75} arialabel="Progress Bar" />
      );
      const progressBar = await findByRole("progressbar");
      const button = screen.getByText("Start");
      await findByText("0%");
      expect(progressBar).toHaveAttribute("aria-valuenow", "0");

      userEvent.click(button);
      await findByText("100%");
      expect(progressBar).toHaveAttribute("aria-valuenow", "100");
      expect(container).toBeInTheDocument();
    });

    it("error progress bar", async () => {
      const { container, findByRole, findByText } = render(
        <ProgressBarSimulator
          label={(v) => `${v}%`}
          inc={(v) => v + 15}
          arialabel="Progress Bar"
          error={30}
        />
      );
      const progressBar = await findByRole("progressbar");
      const button = screen.getByText("Start");
      await findByText("0%");
      userEvent.click(button);
      await findByText("30%");
      expect(progressBar).toHaveAttribute("aria-valuenow", "30");
      expect(container).toBeInTheDocument();
    });
  });
});
