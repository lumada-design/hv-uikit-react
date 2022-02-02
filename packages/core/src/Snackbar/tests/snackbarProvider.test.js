/* eslint-env jest */

import React from "react";

import userEvent from "@testing-library/user-event";

import { render } from "testing-utils";

import { SnackbarProvider } from "../stories/SnackbarProvider.stories";

describe("HvSnackbarProvider", () => {
  describe("interactions", () => {
    it("renders the default snackbar", async () => {
      const buttonText = "default";
      const defaultSnackbar = "This is a snackbar.";
      const { getByRole, findByText, findAllByText, queryByText } = render(<SnackbarProvider />);

      const snackbarSpawner = getByRole("button", { name: buttonText });
      expect(snackbarSpawner).toBeInTheDocument();
      let snackbar = queryByText(defaultSnackbar);
      expect(snackbar).not.toBeInTheDocument();
      userEvent.click(snackbarSpawner);
      snackbar = await findByText(defaultSnackbar);
      expect(snackbar).toBeInTheDocument();
      userEvent.click(snackbarSpawner);
      userEvent.click(snackbarSpawner);
      userEvent.click(snackbarSpawner);
      userEvent.click(snackbarSpawner);
      const snackbars = await findAllByText(defaultSnackbar);
      expect(snackbars.length).toBe(5);
    });
    it("renders the success snackbar", async () => {
      const buttonText = "success";
      const defaultSnackbar = "This is a success message.";
      const { getByRole, findByText, findAllByText, queryByText } = render(<SnackbarProvider />);

      const snackbarSpawner = getByRole("button", { name: buttonText });
      expect(snackbarSpawner).toBeInTheDocument();
      let snackbar = queryByText(defaultSnackbar);
      expect(snackbar).not.toBeInTheDocument();
      userEvent.click(snackbarSpawner);
      snackbar = await findByText(defaultSnackbar);
      expect(snackbar).toBeInTheDocument();
      userEvent.click(snackbarSpawner);
      userEvent.click(snackbarSpawner);
      userEvent.click(snackbarSpawner);
      userEvent.click(snackbarSpawner);
      const snackbars = await findAllByText(defaultSnackbar);
      expect(snackbars.length).toBe(5);
    });
    it("renders the error snackbar", async () => {
      const buttonText = "error";
      const defaultSnackbar = "This is an error message.";
      const { getByRole, findByText, findAllByText, queryByText } = render(<SnackbarProvider />);

      const snackbarSpawner = getByRole("button", { name: buttonText });
      expect(snackbarSpawner).toBeInTheDocument();
      let snackbar = queryByText(defaultSnackbar);
      expect(snackbar).not.toBeInTheDocument();
      userEvent.click(snackbarSpawner);
      snackbar = await findByText(defaultSnackbar);
      expect(snackbar).toBeInTheDocument();
      userEvent.click(snackbarSpawner);
      userEvent.click(snackbarSpawner);
      userEvent.click(snackbarSpawner);
      userEvent.click(snackbarSpawner);
      const snackbars = await findAllByText(defaultSnackbar);
      expect(snackbars.length).toBe(5);
    });
  });
});
