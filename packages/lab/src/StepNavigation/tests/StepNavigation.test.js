/* eslint-env jest */

import React, { useMemo, useState } from "react";

import { render, screen, queryHelpers, within, waitForElementToBeRemoved } from "testing-utils";
import userEvent from "@testing-library/user-event";

import { HvProvider, hvTheme } from "@hitachivantara/uikit-react-core";

import { HvStepNavigation } from "../..";
import { getColor } from "../DefaultNavigation/utils";
import { defaultColor, disabledColor, dotSizes } from "../SimpleNavigation/utils";
import { SEPARATOR_WIDTH, TITLE_WIDTH } from "../utils";

const mockMedia = (breakpoint) => {
  const queryToMatch = hvTheme.breakpoints.up(breakpoint).replace(/^@media( ?)/m, "");
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query === queryToMatch,
    removeListener: jest.fn(),
    addListener: jest.fn(),
  }));
};

// mocked data
const states = ["Completed", "Pending", "Failed", "Current", "Disabled"];
const mockedSteps = states.map((state, index) => ({
  title: `${index + 1} Step`,
  state,
}));
//

const getFeedbackMessage = (selected) => `You clicked on '${selected}' step`;

const NavigationWithFeedback = (props = { type: "Default" }) => {
  const [selected, setSelected] = useState();
  const feedbackMessage = useMemo(() => getFeedbackMessage(selected), [selected]);

  // create a step for each state
  const steps = mockedSteps.map(({ state, ...step }) => ({
    state,
    ...step,
    onClick: () => setSelected(state),
  }));

  return (
    <>
      <HvStepNavigation steps={steps} {...props} />
      {selected && <div>{feedbackMessage}</div>}
    </>
  );
};

const testTitles = (type, hasTitles, width, state, title) => {
  // does not have any step title showing on screen
  if (!hasTitles) {
    expect(screen.queryByText(title)).not.toBeInTheDocument();
  } else {
    // find step title
    const titleElement = screen.getByText(title);
    // test title class
    expect(titleElement).toHaveClass(
      state === "Disabled" && type === "Default"
        ? "HvTypography-disabledText"
        : "HvTypography-highlightText"
    );
    if (hasTitles && !width) {
      expect(titleElement).toHaveStyle({
        width: `${TITLE_WIDTH}px`,
      });
    }
  }
};

const testStepContainer = (type, stepElement, stepSize, breakpoint, state, color) => {
  // test step color with state
  const stepSizeKey = stepSize ?? (["xs", "sm"].includes(breakpoint) ? "SM" : "MD");
  // test size & color
  if (type === "Default") {
    const container = queryHelpers.queryByAttribute(
      "class",
      stepElement,
      (content) =>
        content.includes(`HvAvatar-${stepSizeKey}`) && content.includes(`HvStep-${stepSizeKey}`)
    );
    expect(container).toBeTruthy();
    expect(container).toHaveStyle({
      "background-color": color,
    });
  } else {
    const classAttr = stepElement.getAttribute("class");
    expect(classAttr).toContain("HvDot-root");
    const expectedSize = dotSizes[stepSizeKey] * (state === "Current" ? 1.5 : 1);
    expect(stepElement).toHaveStyle({
      height: `${expectedSize}px`,
      width: `${expectedSize}px`,
      "background-color": color,
    });
  }
  // test enabled/disabled step
  if (["Current", "Disabled"].includes(state)) {
    expect(stepElement).toBeDisabled();
  } else {
    expect(stepElement).toBeEnabled();
  }
};

const testSeparator = (type, hasTitles, width, title, index, color) => {
  if (index < mockedSteps.length - 1) {
    const separator = screen.getByLabelText(`separator-${title}`);
    expect(separator).toHaveStyle({
      "background-color": color,
      height: `${type === "Default" ? 3 : 2}px`,
      ...(!hasTitles && !width && { width: `${SEPARATOR_WIDTH}px` }),
    });
  } else {
    expect(screen.queryByLabelText(`separator-${title}`)).not.toBeInTheDocument();
  }
};

const testCenario = async (
  componentProps = {
    type: "Default",
    showTitles: undefined,
    stepSize: undefined,
    width: undefined,
  },
  breakpoint = "lg"
) => {
  mockMedia(breakpoint);
  render(
    <HvProvider disableCssBaseline>
      <NavigationWithFeedback aria-label="test-component" {...componentProps} />
    </HvProvider>
  );

  const { type, showTitles, stepSize, width } = componentProps;

  const hasTitles = showTitles ?? !["xs", "sm"].includes(breakpoint);

  if (width?.[breakpoint]) {
    const container = screen.getByLabelText("test-component");
    const nav = within(container).getByRole("navigation");
    const next = hvTheme.breakpoints.keys.find((_, index, self) =>
      index - 1 >= 0 ? self[index - 1] === breakpoint : false
    );
    expect(nav).toHaveStyle({
      width: `${Math.min(width?.[breakpoint], hvTheme.breakpoints.values?.[next] ?? width)}px`,
    });
  }

  const getStateColor = (state) =>
    ({
      Default: getColor(state, hvTheme),
      Simple: state === "Disabled" ? disabledColor(hvTheme) : defaultColor(hvTheme),
    }[type]);

  // test every step of each state (colors, titles)
  mockedSteps.forEach(({ state, title }, index) => {
    // find step button
    const stepElement = screen.getByRole("button", { name: `step-${title}` });
    // get color
    const color = getStateColor(state);
    // test step colors and disabled/enabled
    testStepContainer(type, stepElement, stepSize, breakpoint, state, color);
    // test separator
    const separatorColor = state === "Current" ? getStateColor("Disabled") : color;
    testSeparator(type, hasTitles, width, title, index, separatorColor);
    // test title
    const titleText = { Default: title, Simple: `${index + 1}. ${title}` }[type];
    testTitles(type, hasTitles, width, state, titleText);
  });

  const isEnabled = (state) => !["Current", "Disabled"].includes(state);

  //* ***************************************************/
  let { state, title } = mockedSteps[0];
  // does not have any step title showing on screen
  if (!hasTitles) {
    userEvent.hover(screen.getByLabelText(`step-container-${title}`));
    const tooltip = await screen.findByRole("tooltip");
    within(tooltip).getByText(`1. ${title}`);
    userEvent.unhover(screen.getByLabelText(`step-container-${title}`));
    await waitForElementToBeRemoved(() => screen.queryByRole("tooltip"));
  }
  // test feedback when step is clicked (filtered only by enabled buttons)
  if (isEnabled(state)) {
    userEvent.click(screen.getByRole("button", { name: `step-${title}` }), undefined, {
      skipHover: true,
    });
    // wait for the feedback message
    await screen.findByText(getFeedbackMessage(state));
  }

  //* ***************************************************/
  state = mockedSteps[1].state;
  title = mockedSteps[1].title;
  // does not have any step title showing on screen
  if (!hasTitles) {
    userEvent.hover(screen.getByLabelText(`step-container-${title}`));
    const tooltip = await screen.findByRole("tooltip");
    within(tooltip).getByText(`2. ${title}`);
    userEvent.unhover(screen.getByLabelText(`step-container-${title}`));
    await waitForElementToBeRemoved(() => screen.queryByRole("tooltip"));
  }
  // test feedback when step is clicked (filtered only by enabled buttons)
  if (isEnabled(state)) {
    userEvent.click(screen.getByRole("button", { name: `step-${title}` }), undefined, {
      skipHover: true,
    });
    // wait for the feedback message
    await screen.findByText(getFeedbackMessage(state));
  }

  //* ***************************************************/
  state = mockedSteps[2].state;
  title = mockedSteps[2].title;
  // does not have any step title showing on screen
  if (!hasTitles) {
    userEvent.hover(screen.getByLabelText(`step-container-${title}`));
    const tooltip = await screen.findByRole("tooltip");
    within(tooltip).getByText(`3. ${title}`);
    userEvent.unhover(screen.getByLabelText(`step-container-${title}`));
    await waitForElementToBeRemoved(() => screen.queryByRole("tooltip"));
  }
  // test feedback when step is clicked (filtered only by enabled buttons)
  if (isEnabled(state)) {
    userEvent.click(screen.getByRole("button", { name: `step-${title}` }), undefined, {
      skipHover: true,
    });
    // wait for the feedback message
    await screen.findByText(getFeedbackMessage(state));
  }

  //* ***************************************************/
  state = mockedSteps[3].state;
  title = mockedSteps[3].title;
  // does not have any step title showing on screen
  if (!hasTitles) {
    userEvent.hover(screen.getByLabelText(`step-container-${title}`));
    const tooltip = await screen.findByRole("tooltip");
    within(tooltip).getByText(`4. ${title}`);
    userEvent.unhover(screen.getByLabelText(`step-container-${title}`));
    await waitForElementToBeRemoved(() => screen.queryByRole("tooltip"));
  }
  // test feedback when step is clicked (filtered only by enabled buttons)
  if (isEnabled(state)) {
    userEvent.click(screen.getByRole("button", { name: `step-${title}` }), undefined, {
      skipHover: true,
    });
    // wait for the feedback message
    await screen.findByText(getFeedbackMessage(state));
  }

  //* ***************************************************/
  state = mockedSteps[4].state;
  title = mockedSteps[4].title;
  // does not have any step title showing on screen
  if (!hasTitles) {
    userEvent.hover(screen.getByLabelText(`step-container-${title}`));
    const tooltip = await screen.findByRole("tooltip");
    within(tooltip).getByText(`5. ${title}`);
    userEvent.unhover(screen.getByLabelText(`step-container-${title}`));
    await waitForElementToBeRemoved(() => screen.queryByRole("tooltip"));
  }
  // test feedback when step is clicked (filtered only by enabled buttons)
  if (isEnabled(state)) {
    userEvent.click(screen.getByRole("button", { name: `step-${title}` }), undefined, {
      skipHover: true,
    });
    // wait for the feedback message
    await screen.findByText(getFeedbackMessage(state));
  }
};

jest.setTimeout(30000);

describe("Step Navigation: render component with all of step states", () => {
  it.each([
    // test breakpoints
    [{ type: "Default" }, "lg"],
    [{ type: "Simple" }, "lg"],
    [{ type: "Default" }, "md"],
    [{ type: "Simple" }, "md"],
    [{ type: "Default" }, "sm"],
    [{ type: "Simple" }, "sm"],
    // test showTitles
    [{ type: "Default", showTitles: false }, "lg"],
    [{ type: "Simple", showTitles: false }, "lg"],
    // test stepSize
    [{ type: "Default", stepSize: "XS" }, "md"],
    [{ type: "Simple", stepSize: "LG" }, "md"],
    // test width & showTitles
    [{ type: "Default", showTitles: true, width: { sm: 959 } }, "sm"],
    [{ type: "Simple", showTitles: true, width: { sm: 961 } }, "sm"], // max is 960px on 'sm' breakpoint
  ])("%p | '%s' breakpoint", async (componentProps, breakpoint) => {
    await testCenario(componentProps, breakpoint);
  });
});
