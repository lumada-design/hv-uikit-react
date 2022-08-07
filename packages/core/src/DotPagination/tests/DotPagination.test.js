/* eslint-env jest */

import userEvent from "@testing-library/user-event";
import React from "react";

import { render } from "testing-utils";

import HvDotPagination from "..";

import { Main } from "../stories/DotPagination.stories";

describe("DotPagination", () => {
  jest.setTimeout(30000);
  describe("sample snapshot testing", () => {
    it("Main", async () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("Static Values Test", () => {
    it("dot navigation on the first page", async () => {
      const { getByLabelText, findByRole } = render(
        <HvDotPagination
          page={0}
          pages={3}
          getItemAriaLabel={(pageNumber) => {
            switch (pageNumber) {
              case 0:
                return "first page button aria-label";
              case 2:
                return "last page button aria-label";
              default:
                return `${pageNumber + 1} page aria-label`;
            }
          }}
          role="navigation"
        />
      );

      const dotPagination = await findByRole("navigation");
      expect(dotPagination).toBeInTheDocument();

      // check if all buttons are present, have the right aria label and get their reference
      const radioBtn1 = getByLabelText("first page button aria-label");
      expect(radioBtn1).toBeInTheDocument();
      const radioBtn2 = getByLabelText("2 page aria-label");
      expect(radioBtn2).toBeInTheDocument();
      const radioBtn3 = getByLabelText("last page button aria-label");
      expect(radioBtn3).toBeInTheDocument();

      expect(radioBtn1).toBeChecked();
      expect(radioBtn2).not.toBeChecked();
      expect(radioBtn3).not.toBeChecked();
    });

    it("dot navigation on the second page", async () => {
      // eslint-disable-next-line no-unused-vars
      const { getByLabelText, findByRole } = render(
        <HvDotPagination
          page={1}
          pages={3}
          getItemAriaLabel={(pageNumber) => {
            switch (pageNumber) {
              case 0:
                return "first page button aria-label";
              case 2:
                return "last page button aria-label";
              default:
                return `${pageNumber + 1} page aria-label`;
            }
          }}
          role="navigation"
        />
      );

      const dotPagination = await findByRole("navigation");
      expect(dotPagination).toBeInTheDocument();

      // check if all buttons are present, have the right aria label and get their reference
      const radioBtn1 = getByLabelText("first page button aria-label");
      expect(radioBtn1).toBeInTheDocument();
      const radioBtn2 = getByLabelText("2 page aria-label");
      expect(radioBtn2).toBeInTheDocument();
      const radioBtn3 = getByLabelText("last page button aria-label");
      expect(radioBtn3).toBeInTheDocument();

      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).toBeChecked();
      expect(radioBtn3).not.toBeChecked();
    });

    it("dot navigation on the last page", async () => {
      // eslint-disable-next-line no-unused-vars
      const { getByLabelText, findByRole } = render(
        <HvDotPagination
          page={2}
          pages={3}
          getItemAriaLabel={(pageNumber) => {
            switch (pageNumber) {
              case 0:
                return "first page button aria-label";
              case 2:
                return "last page button aria-label";
              default:
                return `${pageNumber + 1} page aria-label`;
            }
          }}
          role="navigation"
        />
      );

      const dotPagination = await findByRole("navigation");
      expect(dotPagination).toBeInTheDocument();

      // check if all buttons are present, have the right aria label and get their reference
      const radioBtn1 = getByLabelText("first page button aria-label");
      expect(radioBtn1).toBeInTheDocument();
      const radioBtn2 = getByLabelText("2 page aria-label");
      expect(radioBtn2).toBeInTheDocument();
      const radioBtn3 = getByLabelText("last page button aria-label");
      expect(radioBtn3).toBeInTheDocument();

      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).not.toBeChecked();
      expect(radioBtn3).toBeChecked();
    });
  });

  describe("Dynamic Values Test", () => {
    it("dot navigation on all pages", async () => {
      // eslint-disable-next-line no-unused-vars
      const { getByLabelText, findByRole, findByText } = render(<Main />);

      const dotPagination = await findByRole("navigation");
      expect(dotPagination).toBeInTheDocument();

      // check if all buttons are present, have the right aria label and get their reference
      const radioBtn1 = getByLabelText("first page button aria-label");
      expect(radioBtn1).toBeInTheDocument();
      const radioBtn2 = getByLabelText("2 page aria-label");
      expect(radioBtn2).toBeInTheDocument();
      const radioBtn3 = getByLabelText("3 page aria-label");
      expect(radioBtn3).toBeInTheDocument();
      const radioBtn4 = getByLabelText("4 page aria-label");
      expect(radioBtn4).toBeInTheDocument();
      const radioBtn5 = getByLabelText("last page button aria-label");
      expect(radioBtn5).toBeInTheDocument();

      userEvent.click(radioBtn1);
      await findByText("This is page 1");
      expect(radioBtn1).toBeChecked();
      expect(radioBtn2).not.toBeChecked();
      expect(radioBtn3).not.toBeChecked();
      expect(radioBtn4).not.toBeChecked();
      expect(radioBtn5).not.toBeChecked();

      userEvent.click(radioBtn2);
      await findByText("And this is page 2");
      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).toBeChecked();
      expect(radioBtn3).not.toBeChecked();
      expect(radioBtn4).not.toBeChecked();
      expect(radioBtn5).not.toBeChecked();

      userEvent.click(radioBtn3);
      await findByText("This is page 3");
      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).not.toBeChecked();
      expect(radioBtn3).toBeChecked();
      expect(radioBtn4).not.toBeChecked();
      expect(radioBtn5).not.toBeChecked();

      userEvent.click(radioBtn4);
      await findByText("This is page 4");
      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).not.toBeChecked();
      expect(radioBtn3).not.toBeChecked();
      expect(radioBtn4).toBeChecked();
      expect(radioBtn5).not.toBeChecked();

      userEvent.click(radioBtn5);
      await findByText("And finally, this is page 5");
      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).not.toBeChecked();
      expect(radioBtn3).not.toBeChecked();
      expect(radioBtn4).not.toBeChecked();
      expect(radioBtn5).toBeChecked();
    });
  });
});
