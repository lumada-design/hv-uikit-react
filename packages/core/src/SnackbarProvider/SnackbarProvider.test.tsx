import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SnackbarProvider } from "./SnackbarProvider.stories";

describe("HvSnackbarProvider", () => {
  describe("interactions", () => {
    it("renders the default snackbar", async () => {
      const buttonText = "default";
      const defaultSnackbar = "This is a snackbar.";
      const { getByRole, findByText, findAllByText, queryByText } = render(
        <SnackbarProvider />
      );

      const snackbarSpawner = getByRole("button", { name: buttonText });
      expect(snackbarSpawner).toBeInTheDocument();
      let snackbar = queryByText(defaultSnackbar);
      expect(snackbar).not.toBeInTheDocument();
      fireEvent.click(snackbarSpawner);
      snackbar = await findByText(defaultSnackbar);
      expect(snackbar).toBeInTheDocument();
      fireEvent.click(snackbarSpawner);
      fireEvent.click(snackbarSpawner);
      fireEvent.click(snackbarSpawner);
      fireEvent.click(snackbarSpawner);
      const snackbars = await findAllByText(defaultSnackbar);
      expect(snackbars.length).toBe(5);
    });
    it("renders the success snackbar", async () => {
      const buttonText = "success";
      const defaultSnackbar = "This is a success message.";
      const { getByRole, findByText, findAllByText, queryByText } = render(
        <SnackbarProvider />
      );

      const snackbarSpawner = getByRole("button", { name: buttonText });
      expect(snackbarSpawner).toBeInTheDocument();
      let snackbar = queryByText(defaultSnackbar);
      expect(snackbar).not.toBeInTheDocument();
      fireEvent.click(snackbarSpawner);
      snackbar = await findByText(defaultSnackbar);
      expect(snackbar).toBeInTheDocument();
      fireEvent.click(snackbarSpawner);
      fireEvent.click(snackbarSpawner);
      fireEvent.click(snackbarSpawner);
      fireEvent.click(snackbarSpawner);
      const snackbars = await findAllByText(defaultSnackbar);
      expect(snackbars.length).toBe(5);
    });
    it("renders the warning snackbar", async () => {
      const buttonText = "warning";
      const defaultSnackbar = "This is a warning message.";
      const { getByRole, findByText, findAllByText, queryByText } = render(
        <SnackbarProvider />
      );

      const snackbarSpawner = getByRole("button", { name: buttonText });
      expect(snackbarSpawner).toBeInTheDocument();
      let snackbar = queryByText(defaultSnackbar);
      expect(snackbar).not.toBeInTheDocument();
      fireEvent.click(snackbarSpawner);
      snackbar = await findByText(defaultSnackbar);
      expect(snackbar).toBeInTheDocument();
      fireEvent.click(snackbarSpawner);
      fireEvent.click(snackbarSpawner);
      fireEvent.click(snackbarSpawner);
      fireEvent.click(snackbarSpawner);
      const snackbars = await findAllByText(defaultSnackbar);
      expect(snackbars.length).toBe(5);
    });
    it("renders the error snackbar", async () => {
      const buttonText = "error";
      const defaultSnackbar = "This is an error message.";
      const { getByRole, findByText, findAllByText, queryByText } = render(
        <SnackbarProvider />
      );

      const snackbarSpawner = getByRole("button", { name: buttonText });
      expect(snackbarSpawner).toBeInTheDocument();
      let snackbar = queryByText(defaultSnackbar);
      expect(snackbar).not.toBeInTheDocument();
      fireEvent.click(snackbarSpawner);
      snackbar = await findByText(defaultSnackbar);
      expect(snackbar).toBeInTheDocument();
      fireEvent.click(snackbarSpawner);
      fireEvent.click(snackbarSpawner);
      fireEvent.click(snackbarSpawner);
      fireEvent.click(snackbarSpawner);
      const snackbars = await findAllByText(defaultSnackbar);
      expect(snackbars.length).toBe(5);
    });
  });
});
