import { Meta, StoryObj } from "@storybook/react";
import { HvSimpleGrid } from "packages/core";
import { Main as ActionBarMainStory } from "packages/core/src/ActionBar/ActionBar.stories";
import {
  Main as AppSwitcherMainStory,
  ManyEntries as AppSwitcherManyEntriesStory,
} from "packages/core/src/AppSwitcher/AppSwitcher.stories";
import { Test as BreadCrumbTestStory } from "packages/core/src/BreadCrumb/BreadCrumb.stories";
import { Test as BulkActionsTestStory } from "packages/core/src/BulkActions/BulkActions.stories";
import {
  Actions as CarouselActionsStory,
  Embedded as CarouselEmbeddedStory,
} from "packages/core/src/Carousel/Carousel.stories";
import { Test as ColorPickerTestStory } from "packages/core/src/ColorPicker/ColorPicker.stories";
import { WithPreviewThumbnails as FileUploaderWithPreviewThumbnailsStory } from "packages/core/src/FileUploader/FileUploader.stories";
import { CustomLabels as FooterCustomLabelsStory } from "packages/core/src/Footer/Footer.stories";
import { Test as GlobalActionsTestStory } from "packages/core/src/GlobalActions/GlobalActions.stories";
import { Test as HeaderTestStory } from "packages/core/src/Header/Header.stories";
import { Test as SectionTestStory } from "packages/core/src/Section/Section.stories";

import { renderStory } from "./utils";
import { setupChromatic } from ".storybook/setupChromatic";

/** Visual tests for widgets from the Core package */
const meta: Meta = {
  title: "Tests/Widgets",
};
export default meta;

/**
 * Visual tests for:
 * - App switcher
 * - Breadcrumb
 * - Action bar
 * - Footer
 * - File uploaded
 * - Global actions
 * - Header
 * - Bulk actions
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
  render: (args, context: any) => (
    <>
      <HvSimpleGrid
        cols={3}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        {renderStory(AppSwitcherMainStory, context)}
        {renderStory(AppSwitcherManyEntriesStory, context)}
        {renderStory(FileUploaderWithPreviewThumbnailsStory, context)}
      </HvSimpleGrid>
      <HvSimpleGrid
        cols={2}
        style={{
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        {renderStory(BreadCrumbTestStory, context)}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {renderStory(ActionBarMainStory, context)}
          {renderStory(FooterCustomLabelsStory, context)}
          {renderStory(GlobalActionsTestStory, context)}
        </div>
      </HvSimpleGrid>
      <HvSimpleGrid
        cols={2}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        {renderStory(BulkActionsTestStory, context)}
        {renderStory(HeaderTestStory, context)}
      </HvSimpleGrid>
    </>
  ),
};

/**
 * Visual tests for:
 * - Carousel
 * - Section
 * - Color picker
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
      <HvSimpleGrid
        cols={2}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          {renderStory(CarouselEmbeddedStory, context)}
          <div style={{ width: 650 }}>
            {renderStory(CarouselActionsStory, context)}
          </div>
        </div>
        {renderStory(ColorPickerTestStory, context)}
      </HvSimpleGrid>
      <br />
      <br />
      <br />
      <HvSimpleGrid
        cols={4}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        {renderStory(SectionTestStory, context)}
      </HvSimpleGrid>
    </>
  ),
};
