/* eslint-env jest */
import React from "react";

import userEvent from "@testing-library/user-event";

import { render } from "testing-utils";
import { HvTag, HvTypography } from "../..";

import { Main, WithDeleteAction, CategoricalTags } from "../stories/Tag.stories";

describe("<Tag />", () => {
  describe("Simple Tags", () => {
    it("should match snapshot", () => {
      const { container } = render(<Main />);
      expect(container).toBeDefined();
    });

    it("should correctly render component elements", () => {
      const { getByText } = render(<Main />);

      expect(getByText("Informational")).toBeInTheDocument();
      expect(getByText("Success")).toBeInTheDocument();
      expect(getByText("Warning")).toBeInTheDocument();
      expect(getByText("Error")).toBeInTheDocument();
    });
  });

  describe("Tags with delete action", () => {
    it("should match snapshot", () => {
      const { container } = render(<WithDeleteAction />);
      expect(container).toBeDefined();
    });

    it("should correctly render component", () => {
      const { getAllByRole } = render(<WithDeleteAction />);

      expect(getAllByRole("button").length).toBeGreaterThan(0);
    });

    it("should correctly render component elements", () => {
      const { getByText } = render(<WithDeleteAction />);

      // expect(getAllByRole("button").length).toBe(4);
      const primaryButton = getByText("Informational");
      expect(primaryButton).toBeInTheDocument();
      const successButton = getByText("Success");
      expect(successButton).toBeInTheDocument();
      const warningButton = getByText("Warning");
      expect(warningButton).toBeInTheDocument();
      const errorButton = getByText("Error");
      expect(errorButton).toBeInTheDocument();
    });

    it("triggers the provided delete action", () => {
      const onClickSpy = jest.fn();

      const textElement = (tagLabel) => {
        const TagText = <HvTypography variant="normalText">{tagLabel}</HvTypography>;

        return TagText;
      };

      const TagsWithDeletion = () => (
        <div
          style={{
            width: "600px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <HvTag label={textElement("Informational")} onDelete={onClickSpy} />
          <HvTag label={textElement("Success")} backgroundColor="sema8" onDelete={onClickSpy} />
          <HvTag label={textElement("Warning")} backgroundColor="sema9" onDelete={onClickSpy} />
          <HvTag label={textElement("Error")} backgroundColor="sema20" onDelete={onClickSpy} />
        </div>
      );

      const { getAllByRole } = render(<TagsWithDeletion />);

      const clickableButtons = getAllByRole("button");

      expect(clickableButtons.length).toBe(4);

      userEvent.click(clickableButtons[3]);
      userEvent.click(clickableButtons[0]);

      expect(onClickSpy).toHaveBeenCalledTimes(2);

      userEvent.click(clickableButtons[2]);
      userEvent.click(clickableButtons[1]);

      expect(onClickSpy).toHaveBeenCalledTimes(4);
    });
  });

  describe("Disabled Tags with delete action", () => {
    it("does not trigger the provided delete action when disabled", () => {
      const onClickSpy = jest.fn();

      const textElement = (tagLabel) => {
        const TagText = <HvTypography variant="normalText">{tagLabel}</HvTypography>;

        return TagText;
      };

      const TagsWithDeletion = () => (
        <div
          style={{
            width: "600px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <HvTag label={textElement("Informational")} onDelete={onClickSpy} disabled />
          <HvTag
            label={textElement("Success")}
            backgroundColor="sema8"
            onDelete={onClickSpy}
            disabled
          />
          <HvTag
            label={textElement("Warning")}
            backgroundColor="sema9"
            onDelete={onClickSpy}
            disabled
          />
          <HvTag
            label={textElement("Error")}
            backgroundColor="sema20"
            onDelete={onClickSpy}
            disabled
          />
        </div>
      );

      const { getAllByRole } = render(<TagsWithDeletion />);

      const clickableButtons = getAllByRole("button");

      expect(clickableButtons.length).toBe(4);

      userEvent.click(clickableButtons[3]);
      userEvent.click(clickableButtons[0]);

      expect(onClickSpy).toHaveBeenCalledTimes(0);

      userEvent.click(clickableButtons[2]);
      userEvent.click(clickableButtons[1]);

      expect(onClickSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe("Categorical Tags", () => {
    describe("Categorical Tags Rendering", () => {
      it("should match snapshot", () => {
        const { container } = render(<CategoricalTags />);
        expect(container).toBeDefined();
      });

      it("should correctly render component", () => {
        const { getAllByRole } = render(<CategoricalTags />);

        expect(getAllByRole("button").length).toBeGreaterThan(0);
      });

      it("should correctly render component elements", () => {
        const { getAllByRole, getByText } = render(<CategoricalTags />);

        expect(getAllByRole("button").length).toBe(5);
        expect(getByText("Feat")).toBeInTheDocument();
        expect(getByText("Docs")).toBeInTheDocument();
        expect(getByText("Fix")).toBeInTheDocument();
        expect(getByText("New")).toBeInTheDocument();
        expect(getByText("Deprecated")).toBeInTheDocument();
      });
    });

    describe("Categorical Tags With Actions", () => {
      it("trigger the provided action", () => {
        const textElement = (tagLabel) => {
          const TagText = <HvTypography variant="normalText">{tagLabel}</HvTypography>;

          return TagText;
        };

        const onClickSpy = jest.fn();

        const CategoricalTagsWithAction = () => (
          <>
            <HvTag label={textElement("Feat")} onClick={onClickSpy} type="categorical" />
            <HvTag
              label={textElement("Docs")}
              onClick={onClickSpy}
              type="categorical"
              backgroundColor="cviz2"
            />
            <HvTag
              label={textElement("Fix")}
              onClick={onClickSpy}
              type="categorical"
              backgroundColor="cviz3"
            />
            <HvTag
              label={textElement("New")}
              onClick={onClickSpy}
              type="categorical"
              backgroundColor="cviz4"
            />
            <HvTag
              label={textElement("Deprecated")}
              onClick={onClickSpy}
              type="categorical"
              backgroundColor="cviz5"
            />
          </>
        );

        const { getAllByRole } = render(<CategoricalTagsWithAction />);

        const clickableButtons = getAllByRole("button");

        expect(clickableButtons.length).toBe(5);

        userEvent.click(clickableButtons[3]);
        userEvent.click(clickableButtons[0]);

        expect(onClickSpy).toHaveBeenCalledTimes(2);

        userEvent.click(clickableButtons[2]);
        userEvent.click(clickableButtons[1]);

        expect(onClickSpy).toHaveBeenCalledTimes(4);

        // the last item does not have an action attributed to it,
        // and as such should not trigger an action
        userEvent.click(clickableButtons[4]);
        expect(onClickSpy).toHaveBeenCalledTimes(5);
      });
    });
  });
});
