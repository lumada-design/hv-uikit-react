/* eslint-env jest */

import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";

import { render, screen } from "testing-utils";
import { HvButton } from "@hitachivantara/uikit-react-core";

import { HvProgressBar } from "../..";

import { Main } from "../stories/ProgressBar.stories";

// eslint-disable-next-line react/prop-types
const ProgressBarSimulator = ({ inc, error, undeterminate, arialabel }) => {
  const [value, setValue] = useState(0);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (value === 100 || (error && value === error)) {
        clearInterval(interval);
      } else if (run) setValue(inc);
    }, 50);
    return () => clearInterval(interval);
  }, [inc, value, run, error]);

  const reset = () => {
    setValue(0);
  };

  const start = () => {
    setRun(true);
  };

  return (
    <div style={{ width: 400 }}>
      <HvProgressBar
        value={value}
        error={value === error}
        undeterminate={undeterminate}
        aria-label={arialabel}
      />
      <div>
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
      const { container, findByRole, findByText } = render(<HvProgressBar value={100} />);

      const progressBar = await findByRole("progressbar");
      await findByText("100%");
      expect(progressBar).toHaveAttribute("aria-valuenow", "100");
      expect(container).toBeInTheDocument();
    });

    it("zero progress bar", async () => {
      const { container, findByRole, findByText } = render(<HvProgressBar value={0} />);
      const progressBar = await findByRole("progressbar");
      await findByText("0%");
      expect(progressBar).toHaveAttribute("aria-valuenow", "0");

      expect(container).toBeInTheDocument();
    });

    it("middle progress bar", async () => {
      const { container, findByRole, findByText } = render(<HvProgressBar value={50} />);
      const progressBar = await findByRole("progressbar");
      await findByText("50%");
      expect(progressBar).toHaveAttribute("aria-valuenow", "50");

      expect(container).toBeInTheDocument();
    });

    it("out of bounds progress bar (up)", async () => {
      const { container, findByRole, findByText } = render(<HvProgressBar value={200} />);
      const progressBar = await findByRole("progressbar");
      await findByText("100%");
      expect(progressBar).toHaveAttribute("aria-valuenow", "100");

      expect(container).toBeInTheDocument();
    });

    it("out of bounds progress bar (down)", async () => {
      const { container, findByRole, findByText } = render(<HvProgressBar value={-200} />);
      const progressBar = await findByRole("progressbar");
      await findByText("0%");
      expect(progressBar).toHaveAttribute("aria-valuenow", "0");

      expect(container).toBeInTheDocument();
    });

    it("error", async () => {
      const { container, findByRole, findByText } = render(<HvProgressBar value={-200} />);
      const progressBar = await findByRole("progressbar");
      await findByText("0%");
      expect(progressBar).toHaveAttribute("aria-valuenow", "0");

      expect(container).toBeInTheDocument();
    });
  });

  describe("Static Undeterminate Value Tests", () => {
    it("completed progress bar", async () => {
      const { container, findByRole, getByText } = render(
        <HvProgressBar value={100} undeterminate />
      );

      const progressBar = await findByRole("progressbar");

      expect(() => getByText("100%")).toThrow("Unable to find an element");

      expect(progressBar).toHaveAttribute("aria-valuenow", "100");

      expect(container).toBeInTheDocument();
    });

    it("zero progress bar", async () => {
      const { container, findByRole } = render(<HvProgressBar value={0} undeterminate />);
      const progressBar = await findByRole("progressbar");

      expect(progressBar).toHaveAttribute("aria-valuenow", "0");

      expect(container).toBeInTheDocument();
    });

    it("middle progress bar", async () => {
      const { container, findByRole } = render(<HvProgressBar value={50} undeterminate />);
      const progressBar = await findByRole("progressbar");

      expect(progressBar).toHaveAttribute("aria-valuenow", "50");

      expect(container).toBeInTheDocument();
    });

    it("out of bounds progress bar (up)", async () => {
      const { container, findByRole } = render(<HvProgressBar value={200} undeterminate />);
      const progressBar = await findByRole("progressbar");

      expect(progressBar).toHaveAttribute("aria-valuenow", "100");

      expect(container).toBeInTheDocument();
    });

    it("out of bounds progress bar (down)", async () => {
      const { container, findByRole } = render(<HvProgressBar value={-200} undeterminate />);
      const progressBar = await findByRole("progressbar");

      expect(progressBar).toHaveAttribute("aria-valuenow", "0");

      expect(container).toBeInTheDocument();
    });

    it("error", async () => {
      const { container, findByRole } = render(<HvProgressBar value={-200} undeterminate />);
      const progressBar = await findByRole("progressbar");

      expect(progressBar).toHaveAttribute("aria-valuenow", "0");

      expect(container).toBeInTheDocument();
    });
  });

  describe("Aria Label", () => {
    it("check aria label", async () => {
      const { container, findByRole, getByLabelText } = render(
        <HvProgressBar value={100} aria-label="My Aria Label" />
      );
      await findByRole("progressbar");
      // eslint-disable-next-line no-unused-vars
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
