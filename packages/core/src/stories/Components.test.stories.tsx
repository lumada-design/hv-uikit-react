import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import { Disabled as AccordionDisabledStory } from "../Accordion/Accordion.stories";
import { Main as ActionBarMainStory } from "../ActionBar/ActionBar.stories";
import {
  Main as AppSwitcherMainStory,
  ManyEntries as AppSwitcherManyEntriesStory,
} from "../AppSwitcher/AppSwitcher.stories";
import { Test as AvatarTestStory } from "../Avatar/Avatar.stories";
import { Test as AvatarGroupTestStory } from "../AvatarGroup/stories/AvatarGroup.stories";
import { Test as BadgeTestStory } from "../Badge/Badge.stories";
import { Variants as BannerVariantsStory } from "../Banner/Banner.stories";
import { Test as BreadCrumbTestStory } from "../BreadCrumb/BreadCrumb.stories";
import { Test as BulkActionsTestStory } from "../BulkActions/BulkActions.stories";
import { Test as ButtonTestStory } from "../Button/Button.stories";
import { Variants as CardVariantsStory } from "../Card/Card.stories";
import {
  Actions as CarouselActionsStory,
  Embedded as CarouselEmbeddedStory,
} from "../Carousel/Carousel.stories";
import { Test as CheckBoxTestStory } from "../CheckBox/CheckBox.stories";
import { Variants as CheckBoxGroupVariantsStory } from "../CheckBoxGroup/CheckBoxGroup.stories";
import { Test as ColorPickerTestStory } from "../ColorPicker/ColorPicker.stories";
import { Main as ContainerMainStory } from "../Container/Container.stories";
import { Main as DotPaginationMainStory } from "../DotPagination/DotPagination.stories";
import {
  MultiSelection as DropdownMultiSelectionStory,
  Variants as DropdownVariantsStory,
} from "../Dropdown/stories/Dropdown.stories";
import { Main as DropDownMenuMainStory } from "../DropDownMenu/DropDownMenu.stories";
import {
  Minimal as EmptyStateMinimalStory,
  WithAction as EmptyStateWithActionStory,
} from "../EmptyState/EmptyState.stories";
import { WithPreviewThumbnails as FileUploaderWithPreviewThumbnailsStory } from "../FileUploader/FileUploader.stories";
import { CustomLabels as FooterCustomLabelsStory } from "../Footer/Footer.stories";
import { Test as GlobalActionsTestStory } from "../GlobalActions/GlobalActions.stories";
import { TheDesignSystemColumns as GridTheDesignSystemColumnsStory } from "../Grid/Grid.stories";
import { Test as HeaderTestStory } from "../Header/Header.stories";
import { Variants as IconButtonVariantsStory } from "../IconButton/IconButton.stories";
import { Test as InlineEditorTestStory } from "../InlineEditor/InlineEditor.stories";
import { Test as InputTestStory } from "../Input/Input.stories";
import { Main as KpiMainStory } from "../Kpi/Kpi.stories";
import { WithIcons as ListContainerWithIconsStory } from "../ListContainer/ListContainer.stories";
import { Variants as LoadingVariantsStory } from "../Loading/Loading.stories";
import { Test as MultiButtonTestStory } from "../MultiButton/stories/MultiButton.stories";
import { Main as OverflowTooltipMainStory } from "../OverflowTooltip/OverflowTooltip.stories";
import { Main as PaginationMainStory } from "../Pagination/Pagination.stories";
import { Main as PanelMainStory } from "../Panel/Panel.stories";
import { Variants as ProgressBarVariantsStory } from "../ProgressBar/ProgressBar.stories";
import { Test as RadioTestStory } from "../Radio/Radio.stories";
import {
  Horizontal as RadioGroupHorizontalStory,
  Variants as RadioGroupVariantsStory,
} from "../RadioGroup/RadioGroup.stories";
import { Main as ScrollToHorizontalMainStory } from "../ScrollToHorizontal/ScrollToHorizontal.stories";
import { Main as ScrollToVerticalMainStory } from "../ScrollToVertical/ScrollToVertical.stories";
import { Test as SectionTestStory } from "../Section/Section.stories";
import { Test as SelectTestStory } from "../Select/Select.stories";
import { Variants as SelectionListVariantsStory } from "../SelectionList/SelectionList.stories";
import { HvSimpleGrid } from "../SimpleGrid";
import { Main as SimpleGridMainStory } from "../SimpleGrid/SimpleGrid.stories";
import { Variants as SkeletonVariantsStory } from "../Skeleton/Skeleton.stories";
import { RangeVariants as SliderRangeVariantsStory } from "../Slider/Slider.stories";
import { Variants as SnackbarVariantsStory } from "../Snackbar/Snackbar.stories";
import { Test as StackTestStory } from "../Stack/Stack.stories";
import { Variants as SwitchVariantsStory } from "../Switch/Switch.stories";
import { Test as TabsTestStory } from "../Tabs/Tabs.stories";
import { Test as TagTestStory } from "../Tag/stories/Tag.stories";
import { Variants as TagsInputVariantsStory } from "../TagsInput/TagsInput.stories";
import { Variants as TextAreaVariantsStory } from "../TextArea/TextArea.stories";
import { Multiple as ToggleButtonMultipleStory } from "../ToggleButton/ToggleButton.stories";
import { Test as TypographyTestStory } from "../Typography/Typography.stories";
import { setupChromatic } from ".storybook/setupChromatic";
import { renderStory } from ".storybook/utils";

/** Visual tests for components from the Core package */
export default {
  title: "Tests/Components",
} satisfies Meta;

/** Basic inputs */
export const TestInputs: StoryObj = {
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
    const inlineEditors = canvas.getAllByRole("button", { name: /very very/i });
    await userEvent.click(inlineEditors[10]);
    await userEvent.hover(inlineEditors[11]);
  },
  render: (args, context: any) => (
    <div className="grid gap-xs">
      <div className="flex gap-xs">
        <div className="grid grid-cols-2 gap-xs w-440px">
          {renderStory(InputTestStory, context)}
        </div>
        <div className="grid gap-xs w-160px [&>*]:w-160px">
          {renderStory(TextAreaVariantsStory, context)}
        </div>
        <div className="grid gap-xs w-120px">
          {renderStory(CheckBoxGroupVariantsStory, context)}
        </div>
        <div className="grid gap-xs w-120px">
          {renderStory(RadioGroupVariantsStory, context)}
        </div>
        <div className="grid w-160px">
          {renderStory(CheckBoxTestStory, context)}
        </div>
        <div className="grid gap-sm w-120px">
          <div className="flex w-full flex-wrap">
            {renderStory(RadioTestStory, context)}
          </div>
          {renderStory(SwitchVariantsStory, context)}
        </div>
        <div className="grid gap-xs flex-1">
          {renderStory(SliderRangeVariantsStory, context)}
        </div>
      </div>
      <div className="flex gap-sm w-full flex-wrap [&>*]:w-220px">
        {renderStory(TagsInputVariantsStory, context)}
      </div>
      <div>{renderStory(RadioGroupHorizontalStory, context)}</div>
      <div>{renderStory(InlineEditorTestStory, context)}</div>
    </div>
  ),
};

/** Inputs that have popups */
export const TestPopups: StoryObj = {
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
    <div className="flex gap-sm">
      <div className="flex flex-col gap-xs w-240px">
        {renderStory(SelectTestStory, context)}
      </div>
      <div className="w-240px">
        {renderStory(DropdownVariantsStory, context)}
        {DropdownMultiSelectionStory.render?.({ expanded: true }, context)}
      </div>
      <div>
        {renderStory(OverflowTooltipMainStory, context)}
        <div className="flex gap-xs mt-70px">
          {renderStory(ColorPickerTestStory, context)}
        </div>
      </div>
      <div className="grid gap-xs flex-1">
        {renderStory(SnackbarVariantsStory, context)}
      </div>
    </div>
  ),
};

/** Components that are mostly buttons/actions or containers for actions */
export const TestButtons: StoryObj = {
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
    <div className="grid gap-md">
      <div>{renderStory(ButtonTestStory, context)}</div>
      <div className="flex gap-sm">
        <div>{renderStory(ToggleButtonMultipleStory, context)}</div>
        <div>{renderStory(IconButtonVariantsStory, context)}</div>
      </div>
      <div>{renderStory(MultiButtonTestStory, context)}</div>
      <div>{renderStory(TagTestStory, context)}</div>
      <div className="grid grid-cols-3 gap-sm">
        {renderStory(GlobalActionsTestStory, context)}
        {renderStory(BulkActionsTestStory, context)}
      </div>
      <div>{renderStory(ActionBarMainStory, context)}</div>
      <div>{renderStory(TabsTestStory, context)}</div>
      <div>{renderStory(PaginationMainStory, context)}</div>
      <div>{renderStory(DotPaginationMainStory, context)}</div>
    </div>
  ),
};

/** Surfaces and other containers */
export const TestSurfaces: StoryObj = {
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
    <div className="flex gap-sm">
      <div className="w-340px">{renderStory(CardVariantsStory, context)}</div>
      <div className="flex flex-col gap-xs w-340px">
        {renderStory(SectionTestStory, context)}
      </div>
      <div className="flex flex-col gap-xs flex-1">
        {renderStory(BannerVariantsStory, context)}
        {renderStory(FooterCustomLabelsStory, context)}
        {renderStory(HeaderTestStory, context)}
        <div className="grid grid-cols-2 gap-xs mt-48px">
          <div>{renderStory(TypographyTestStory, context)}</div>
        </div>
      </div>
    </div>
  ),
};

/** Misc components */
export const TestOthers: StoryObj = {
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
    <div className="grid gap-xs">
      {renderStory(BreadCrumbTestStory, context)}

      {renderStory(ProgressBarVariantsStory, context)}
      {renderStory(LoadingVariantsStory, context)}
      {renderStory(SkeletonVariantsStory, context)}
      {renderStory(ScrollToHorizontalMainStory, context)}
      {renderStory(ScrollToVerticalMainStory, context)}
      {renderStory(ListContainerWithIconsStory, context)}
      {renderStory(SelectionListVariantsStory, context)}
      {renderStory(AccordionDisabledStory, context)}
      {renderStory(DropDownMenuMainStory, context)}
      {renderStory(EmptyStateMinimalStory, context)}
      {renderStory(EmptyStateWithActionStory, context)}
      {renderStory(AvatarGroupTestStory, context)}
      {renderStory(BadgeTestStory, context)}
      {renderStory(AvatarTestStory, context)}
      {renderStory(AppSwitcherMainStory, context)}
      {renderStory(AppSwitcherManyEntriesStory, context)}
      {renderStory(FileUploaderWithPreviewThumbnailsStory, context)}
      <div style={{ display: "flex", gap: 5 }}>
        {renderStory(CarouselEmbeddedStory, context)}
        <div style={{ width: 650 }}>
          {renderStory(CarouselActionsStory, context)}
        </div>
      </div>
    </div>
  ),
};

/** Structural components */
export const TestStructure: StoryObj = {
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
