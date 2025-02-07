import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { HvSimpleGrid } from "packages/core";
import { Disabled as AccordionDisabledStory } from "packages/core/src/Accordion/Accordion.stories";
import { Test as AvatarTestStory } from "packages/core/src/Avatar/Avatar.stories";
import { Test as AvatarGroupTestStory } from "packages/core/src/AvatarGroup/stories/AvatarGroup.stories";
import { Test as BadgeTestStory } from "packages/core/src/Badge/Badge.stories";
import { Variants as BannerVariantsStory } from "packages/core/src/Banner/Banner.stories";
import { Test as ButtonTestStory } from "packages/core/src/Button/Button.stories";
import { Variants as CardVariantsStory } from "packages/core/src/Card/Card.stories";
import { Test as CheckBoxTestStory } from "packages/core/src/CheckBox/CheckBox.stories";
import { Variants as CheckBoxGroupVariantsStory } from "packages/core/src/CheckBoxGroup/CheckBoxGroup.stories";
import { Main as ContainerMainStory } from "packages/core/src/Container/Container.stories";
import { Test as DatePickerTestStory } from "packages/core/src/DatePicker/DatePicker.stories";
import { Main as DotPaginationMainStory } from "packages/core/src/DotPagination/DotPagination.stories";
import { Test as DropdownTestStory } from "packages/core/src/Dropdown/stories/Dropdown.stories";
import { Main as DropDownMenuMainStory } from "packages/core/src/DropDownMenu/DropDownMenu.stories";
import {
  Minimal as EmptyStateMinimalStory,
  WithAction as EmptyStateWithActionStory,
} from "packages/core/src/EmptyState/EmptyState.stories";
import { TheDesignSystemColumns as GridTheDesignSystemColumnsStory } from "packages/core/src/Grid/Grid.stories";
import { Variants as IconButtonVariantsStory } from "packages/core/src/IconButton/IconButton.stories";
import { Test as InlineEditorTestStory } from "packages/core/src/InlineEditor/InlineEditor.stories";
import { Test as InputTestStory } from "packages/core/src/Input/Input.stories";
import { Main as KpiMainStory } from "packages/core/src/Kpi/Kpi.stories";
import { WithIcons as ListContainerWithIconsStory } from "packages/core/src/ListContainer/ListContainer.stories";
import { Variants as LoadingVariantsStory } from "packages/core/src/Loading/Loading.stories";
import { Test as MultiButtonTestStory } from "packages/core/src/MultiButton/stories/MultiButton.stories";
import { Main as OverflowTooltipMainStory } from "packages/core/src/OverflowTooltip/OverflowTooltip.stories";
import { Main as PaginationMainStory } from "packages/core/src/Pagination/Pagination.stories";
import { Main as PanelMainStory } from "packages/core/src/Panel/Panel.stories";
import { Variants as ProgressBarVariantsStory } from "packages/core/src/ProgressBar/ProgressBar.stories";
import { Test as RadioTestStory } from "packages/core/src/Radio/Radio.stories";
import {
  Horizontal as RadioGroupHorizontalStory,
  Variants as RadioGroupVariantsStory,
} from "packages/core/src/RadioGroup/RadioGroup.stories";
import { Main as ScrollToHorizontalMainStory } from "packages/core/src/ScrollToHorizontal/ScrollToHorizontal.stories";
import { Main as ScrollToVerticalMainStory } from "packages/core/src/ScrollToVertical/ScrollToVertical.stories";
import { Test as SelectTestStory } from "packages/core/src/Select/Select.stories";
import { Variants as SelectionListVariantsStory } from "packages/core/src/SelectionList/SelectionList.stories";
import { Main as SimpleGridMainStory } from "packages/core/src/SimpleGrid/SimpleGrid.stories";
import { Variants as SkeletonVariantsStory } from "packages/core/src/Skeleton/Skeleton.stories";
import {
  RangeVariants as SliderRangeVariantsStory,
  Variants as SliderVariantsStory,
} from "packages/core/src/Slider/Slider.stories";
import { Variants as SnackbarVariantsStory } from "packages/core/src/Snackbar/Snackbar.stories";
import { Test as StackTestStory } from "packages/core/src/Stack/Stack.stories";
import { Variants as SwitchVariantsStory } from "packages/core/src/Switch/Switch.stories";
import { Test as TabsTestStory } from "packages/core/src/Tabs/Tabs.stories";
import { Test as TagTestStory } from "packages/core/src/Tag/stories/Tag.stories";
import { Variants as TagsInputVariantsStory } from "packages/core/src/TagsInput/TagsInput.stories";
import { Variants as TextAreaVariantsStory } from "packages/core/src/TextArea/TextArea.stories";
import { Multiple as ToggleButtonMultipleStory } from "packages/core/src/ToggleButton/ToggleButton.stories";
import { Test as TypographyTestStory } from "packages/core/src/Typography/Typography.stories";

import { renderStory } from "./utils";
import { setupChromatic } from ".storybook/setupChromatic";

/** Visual tests for components from the Core package */
const meta: Meta = {
  title: "Tests/Components",
};
export default meta;

/**
 * Visual tests for:
 * - Accordion
 * - Dot pagination
 * - Dropdown menu
 * - Empty state
 * - Input
 * - Checkbox group
 * - Banner
 * - Dropdown
 */
export const Test: StoryObj = {
  parameters: {
    ...setupChromatic(
      [
        "DS3 dawn",
        "DS3 wicked",
        "DS5 dawn",
        "DS5 wicked",
        "Pentaho+ dawn",
        "Pentaho+ wicked",
      ],
      5000,
    ),
    docs: { disable: true },
    a11y: {
      disable: true,
    },
  },
  tags: ["skipTestRunner"],
  play: async ({ canvasElement }) => {
    // Accordion disabled story
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "System" });
    await userEvent.click(button);
  },
  render: (args, context: any) => (
    <div style={{ display: "flex", gap: 5 }}>
      <div>
        <HvSimpleGrid
          cols={3}
          style={{ alignItems: "start", justifyContent: "start" }}
        >
          <div>
            <div style={{ display: "flex", height: 180 }}>
              {renderStory(AccordionDisabledStory, context)}
              {renderStory(DotPaginationMainStory, context)}
              {renderStory(DropDownMenuMainStory, context)}
            </div>
            <div>
              {renderStory(EmptyStateMinimalStory, context)}
              {renderStory(EmptyStateWithActionStory, context)}
            </div>
          </div>
          {renderStory(CheckBoxGroupVariantsStory, context)}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {renderStory(InputTestStory, context)}
          </div>
        </HvSimpleGrid>
        <HvSimpleGrid
          cols={3}
          style={{ alignItems: "start", justifyContent: "start" }}
        >
          {renderStory(BannerVariantsStory, context)}
        </HvSimpleGrid>
      </div>
      {renderStory(DropdownTestStory, context)}
    </div>
  ),
};

/**
 * Visual tests for:
 * - Button
 * - Card
 * - Badge
 * - Avatar
 * - Avatar group
 * - Snackbar
 */
export const Test2: StoryObj = {
  parameters: {
    ...setupChromatic(
      [
        "DS3 dawn",
        "DS3 wicked",
        "DS5 dawn",
        "DS5 wicked",
        "Pentaho+ dawn",
        "Pentaho+ wicked",
      ],
      5000,
    ),
    docs: { disable: true },
    a11y: {
      disable: true,
    },
  },
  tags: ["skipTestRunner"],
  render: (args, context: any) => (
    <>
      {renderStory(ButtonTestStory, context)}
      <br />
      <HvSimpleGrid
        cols={2}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        {renderStory(CardVariantsStory, context)}
        <div style={{ display: "flex" }}>
          {renderStory(AvatarGroupTestStory, context)}
          {renderStory(BadgeTestStory, context)}
          {renderStory(AvatarTestStory, context)}
        </div>
      </HvSimpleGrid>
      <br />
      <HvSimpleGrid cols={5}>
        {renderStory(SnackbarVariantsStory, context)}
      </HvSimpleGrid>
    </>
  ),
};

/**
 * Visual tests for:
 * - Inline editor
 * - Date picker
 * - List container
 * - Loading
 * - Skeleton
 * - Switch
 * - Selection list
 * - Progress bar
 */
export const Test3: StoryObj = {
  parameters: {
    ...setupChromatic(
      [
        "DS3 dawn",
        "DS3 wicked",
        "DS5 dawn",
        "DS5 wicked",
        "Pentaho+ dawn",
        "Pentaho+ wicked",
      ],
      5000,
    ),
    docs: { disable: true },
    a11y: {
      disable: true,
    },
  },
  tags: ["skipTestRunner"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /october/i }));
    const inlineEditors = canvas.getAllByRole("button", { name: /very very/i });
    await userEvent.click(inlineEditors[10]);
    await userEvent.hover(inlineEditors[11]);
  },
  render: (args, context: any) => (
    <>
      {renderStory(InlineEditorTestStory, context)}
      <br />
      <div style={{ display: "flex" }}>
        <div style={{ width: 1200 }}>
          {renderStory(DatePickerTestStory, context)}
        </div>
        <HvSimpleGrid
          cols={1}
          style={{ alignItems: "start", justifyContent: "start" }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {renderStory(ListContainerWithIconsStory, context)}
            <div>
              {renderStory(LoadingVariantsStory, context)}
              <br />
              {renderStory(SkeletonVariantsStory, context)}
            </div>
            <div>{renderStory(SwitchVariantsStory, context)}</div>
          </div>
          {renderStory(SelectionListVariantsStory, context)}
          {renderStory(ProgressBarVariantsStory, context)}
        </HvSimpleGrid>
      </div>
    </>
  ),
};

/**
 * Visual tests for:
 * - Radio group
 * - Radio
 * - Select
 * - Slider
 * - Tabs
 * - Multibutton
 */
export const Test4: StoryObj = {
  parameters: {
    ...setupChromatic(
      [
        "DS3 dawn",
        "DS3 wicked",
        "DS5 dawn",
        "DS5 wicked",
        "Pentaho+ dawn",
        "Pentaho+ wicked",
      ],
      5000,
    ),
    docs: { disable: true },
    a11y: {
      disable: true,
    },
  },
  tags: ["skipTestRunner"],
  render: (args, context: any) => (
    <>
      <HvSimpleGrid
        cols={4}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {renderStory(RadioGroupVariantsStory, context)}
          {renderStory(RadioGroupHorizontalStory, context)}
          {renderStory(RadioTestStory, context)}
        </div>
        <div style={{ height: 360 }}>
          {renderStory(SelectTestStory, context)}
        </div>
        <div>{renderStory(SliderRangeVariantsStory, context)}</div>
        <div>{renderStory(SliderVariantsStory, context)}</div>
      </HvSimpleGrid>
      <br />
      {renderStory(MultiButtonTestStory, context)}
      <br />
      {renderStory(TabsTestStory, context)}
    </>
  ),
};

/**
 * Visual tests for:
 * - Checkbox
 * - Tag
 * - Tags input
 * - Text area
 * - Icon button
 * - Toggle button
 * - Pagination
 */
export const Test5: StoryObj = {
  parameters: {
    ...setupChromatic(
      [
        "DS3 dawn",
        "DS3 wicked",
        "DS5 dawn",
        "DS5 wicked",
        "Pentaho+ dawn",
        "Pentaho+ wicked",
      ],
      5000,
    ),
    docs: { disable: true },
    a11y: {
      disable: true,
    },
  },
  tags: ["skipTestRunner"],
  render: (args, context: any) => (
    <>
      {renderStory(CheckBoxTestStory, context)}
      {renderStory(TagTestStory, context)}
      <HvSimpleGrid
        cols={3}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        {renderStory(TagsInputVariantsStory, context)}
        <div>
          {renderStory(TextAreaVariantsStory, context)}
          {renderStory(IconButtonVariantsStory, context)}
          {renderStory(ToggleButtonMultipleStory, context)}
        </div>
        {renderStory(PaginationMainStory, context)}
      </HvSimpleGrid>
    </>
  ),
};

/**
 * Visual tests for:
 * - Overflow tooltip
 * - Grid
 * - Stack
 * - Container
 * - Kpi
 * - Panel
 * - Simple grid
 * Note: only tested in DS5 as they are structural components or basic components reused throughout other components
 */
export const Test6: StoryObj = {
  parameters: {
    ...setupChromatic(["DS5 dawn"], 5000),
    docs: { disable: true },
    a11y: {
      disable: true,
    },
  },
  tags: ["skipTestRunner"],
  render: (args, context: any) => (
    <>
      <HvSimpleGrid
        cols={2}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        <div
          style={{
            height: 150,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          {renderStory(OverflowTooltipMainStory, context)}
        </div>
        {renderStory(GridTheDesignSystemColumnsStory, context)}
        {renderStory(StackTestStory, context)}
      </HvSimpleGrid>
      <br />
      <HvSimpleGrid
        cols={4}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        {renderStory(ContainerMainStory, context)}
        {renderStory(KpiMainStory, context)}
        {renderStory(PanelMainStory, context)}
        {renderStory(SimpleGridMainStory, context)}
      </HvSimpleGrid>
    </>
  ),
};

/**
 * Visual tests for:
 * - Typography
 * - Scroll to
 * Note: only tested in DS5 as they are structural components or basic components reused throughout other components
 */
export const Test7: StoryObj = {
  parameters: {
    ...setupChromatic(),
    docs: { disable: true },
    a11y: {
      disable: true,
    },
  },
  tags: ["skipTestRunner"],
  render: (args, context: any) => (
    <>
      {renderStory(TypographyTestStory, context)}
      <HvSimpleGrid
        cols={2}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        {renderStory(ScrollToHorizontalMainStory, context)}
        {renderStory(ScrollToVerticalMainStory, context)}
      </HvSimpleGrid>
    </>
  ),
};
