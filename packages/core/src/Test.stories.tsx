import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { HvSimpleGrid } from "@hitachivantara/uikit-react-core";

import { Disabled as AccordionDisabledStory } from "./Accordion/Accordion.stories";
import { Main as ActionBarMainStory } from "./ActionBar/ActionBar.stories";
import {
  Main as AppSwitcherMainStory,
  ManyEntries as AppSwitcherManyEntriesStory,
} from "./AppSwitcher/AppSwitcher.stories";
import { Test as AvatarTestStory } from "./Avatar/Avatar.stories";
import { Test as AvatarGroupTestStory } from "./AvatarGroup/stories/AvatarGroup.stories";
import { Test as BadgeTestStory } from "./Badge/Badge.stories";
import { Variants as BannerVariantsStory } from "./Banner/Banner.stories";
import { Test as BreadCrumbTestStory } from "./BreadCrumb/BreadCrumb.stories";
import { Test as BulkActionsTestStory } from "./BulkActions/BulkActions.stories";
import { Test as ButtonTestStory } from "./Button/Button.stories";
import { Variants as CardVariantsStory } from "./Card/Card.stories";
import {
  Actions as CarouselActionsStory,
  Embedded as CarouselEmbeddedStory,
} from "./Carousel/Carousel.stories";
import { Test as CheckBoxTestStory } from "./CheckBox/CheckBox.stories";
import { Variants as CheckBoxGroupVariantsStory } from "./CheckBoxGroup/CheckBoxGroup.stories";
import { Test as ColorPickerTestStory } from "./ColorPicker/ColorPicker.stories";
import { Test as DatePickerTestStory } from "./DatePicker/DatePicker.stories";
import { Main as DotPaginationMainStory } from "./DotPagination/DotPagination.stories";
import { Test as DropdownTestStory } from "./Dropdown/stories/Dropdown.stories";
import { Main as DropDownMenuMainStory } from "./DropDownMenu/DropDownMenu.stories";
import {
  Minimal as EmptyStateMinimalStory,
  WithAction as EmptyStateWithActionStory,
} from "./EmptyState/EmptyState.stories";
import { WithPreviewThumbnails as FileUploaderWithPreviewThumbnailsStory } from "./FileUploader/FileUploader.stories";
import { CustomLabels as FooterCustomLabelsStory } from "./Footer/Footer.stories";
import { Test as GlobalActionsTestStory } from "./GlobalActions/GlobalActions.stories";
import { Test as HeaderTestStory } from "./Header/Header.stories";
import { Variants as IconButtonVariantsStory } from "./IconButton/IconButton.stories";
import { Test as InlineEditorTestStory } from "./InlineEditor/InlineEditor.stories";
import { Variants as InputVariantsStory } from "./Input/Input.stories";
import { WithIcons as ListContainerWithIconsStory } from "./ListContainer/ListContainer.stories";
import { Variants as LoadingVariantsStory } from "./Loading/Loading.stories";
import { Test as MultiButtonTestStory } from "./MultiButton/stories/MultiButton.stories";
import { Main as PaginationMainStory } from "./Pagination/Pagination.stories";
import { Determinate as ProgressBarDeterminateStory } from "./ProgressBar/ProgressBar.stories";
import { Test as RadioTestStory } from "./Radio/Radio.stories";
import {
  Horizontal as RadioGroupHorizontalStory,
  Variants as RadioGroupVariantsStory,
} from "./RadioGroup/RadioGroup.stories";
import { Test as SectionTestStory } from "./Section/Section.stories";
import { Test as SelectTestStory } from "./Select/Select.stories";
import { Variants as SelectionListVariantsStory } from "./SelectionList/SelectionList.stories";
import { Variants as SkeletonVariantsStory } from "./Skeleton/Skeleton.stories";
import {
  RangeVariants as SliderRangeVariantsStory,
  Variants as SliderVariantsStory,
} from "./Slider/Slider.stories";
import { Variants as SnackbarVariantsStory } from "./Snackbar/Snackbar.stories";
import { Variants as SwitchVariantsStory } from "./Switch/Switch.stories";
import { Test as TabsTestStory } from "./Tabs/Tabs.stories";
import { Test as TagTestStory } from "./Tag/stories/Tag.stories";
import { Variants as TagsInputVariantsStory } from "./TagsInput/TagsInput.stories";
import { Variants as TextAreaVariantsStory } from "./TextArea/TextArea.stories";
import { Multiple as ToggleButtonMultipleStory } from "./ToggleButton/ToggleButton.stories";
import { setupChromatic } from ".storybook/setupChromatic";

const meta: Meta = {
  title: "Components/Test",
};
export default meta;

export const Test: StoryObj = {
  parameters: {
    a11y: {
      config: {
        rules: [
          // TODO: review aria-haspopup on a role-less element
          { id: "aria-valid-attr-value", enabled: false },
        ],
      },
    },
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
  },
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
              {AccordionDisabledStory.render?.(
                AccordionDisabledStory.args as any,
                context,
              )}
              {DotPaginationMainStory.render?.(
                DotPaginationMainStory.args as any,
                context,
              )}
              {DropDownMenuMainStory.render?.(
                DropDownMenuMainStory.args as any,
                context,
              )}
            </div>
            <div>
              {EmptyStateMinimalStory.render?.(
                EmptyStateMinimalStory.args as any,
                context,
              )}
              {EmptyStateWithActionStory.render?.(
                EmptyStateWithActionStory.args as any,
                context,
              )}
            </div>
          </div>
          {CheckBoxGroupVariantsStory.render?.(
            CheckBoxGroupVariantsStory.args as any,
            context,
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {InputVariantsStory.render?.(
              InputVariantsStory.args as any,
              context,
            )}
          </div>
        </HvSimpleGrid>
        <HvSimpleGrid
          cols={3}
          style={{ alignItems: "start", justifyContent: "start" }}
        >
          {BannerVariantsStory.render?.(
            BannerVariantsStory.args as any,
            context,
          )}
        </HvSimpleGrid>
      </div>
      {DropdownTestStory.render?.(DropdownTestStory.args as any, context)}
    </div>
  ),
};

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
  },
  render: (args, context: any) => (
    <>
      {ButtonTestStory.render?.(ButtonTestStory.args as any, context)}
      <br />
      <HvSimpleGrid
        cols={2}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        {CardVariantsStory.render?.(CardVariantsStory.args as any, context)}
        <div style={{ display: "flex" }}>
          {AvatarGroupTestStory.render?.(
            AvatarGroupTestStory.args as any,
            context,
          )}
          {BadgeTestStory.render?.(BadgeTestStory.args as any, context)}
          {AvatarTestStory.render?.(AvatarTestStory.args as any, context)}
        </div>
      </HvSimpleGrid>
      <br />
      <HvSimpleGrid cols={5}>
        {SnackbarVariantsStory.render?.(
          SnackbarVariantsStory.args as any,
          context,
        )}
      </HvSimpleGrid>
    </>
  ),
};

export const Test3: StoryObj = {
  parameters: {
    a11y: {
      config: {
        rules: [
          // TODO: review aria-haspopup on a role-less element
          { id: "aria-valid-attr-value", enabled: false },
        ],
      },
    },
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
  },
  render: (args, context: any) => (
    <>
      {InlineEditorTestStory.render?.(
        InlineEditorTestStory.args as any,
        context,
      )}
      <br />
      <div style={{ display: "flex" }}>
        <div style={{ width: 1200 }}>
          {DatePickerTestStory.render?.(
            DatePickerTestStory.args as any,
            context,
          )}
        </div>
        <HvSimpleGrid
          cols={1}
          style={{ alignItems: "start", justifyContent: "start" }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {ListContainerWithIconsStory.render?.(
              ListContainerWithIconsStory.args as any,
              context,
            )}
            <div>
              {LoadingVariantsStory.render?.(
                LoadingVariantsStory.args as any,
                context,
              )}
              <br />
              {SkeletonVariantsStory.render?.(
                SkeletonVariantsStory.args as any,
                context,
              )}
            </div>
            <div>
              {SwitchVariantsStory.render?.(
                SwitchVariantsStory.args as any,
                context,
              )}
            </div>
          </div>
          {SelectionListVariantsStory.render?.(
            SelectionListVariantsStory.args as any,
            context,
          )}
          {ProgressBarDeterminateStory.render?.(
            ProgressBarDeterminateStory.args as any,
            context,
          )}
        </HvSimpleGrid>
      </div>
    </>
  ),
};

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
  },
  render: (args, context: any) => (
    <>
      <HvSimpleGrid
        cols={4}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {RadioGroupVariantsStory.render?.(
            RadioGroupVariantsStory.args as any,
            context,
          )}
          {RadioGroupHorizontalStory.render?.(
            RadioGroupHorizontalStory.args as any,
            context,
          )}
          {RadioTestStory.render?.(RadioTestStory.args as any, context)}
        </div>
        <div style={{ height: 360 }}>
          {SelectTestStory.render?.(SelectTestStory.args as any, context)}
        </div>
        <div>
          {SliderRangeVariantsStory.render?.(
            SliderRangeVariantsStory.args as any,
            context,
          )}
        </div>
        <div>
          {SliderVariantsStory.render?.(
            SliderVariantsStory.args as any,
            context,
          )}
        </div>
      </HvSimpleGrid>
      <br />
      {MultiButtonTestStory.render?.(MultiButtonTestStory.args as any, context)}
      <br />
      {TabsTestStory.render?.(TabsTestStory.args as any, context)}
    </>
  ),
};

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
  },
  render: (args, context: any) => (
    <>
      {CheckBoxTestStory.render?.(CheckBoxTestStory.args as any, context)}
      {TagTestStory.render?.(TagTestStory.args as any, context)}
      <HvSimpleGrid
        cols={3}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        {TagsInputVariantsStory.render?.(
          TagsInputVariantsStory.args as any,
          context,
        )}
        <div>
          {TextAreaVariantsStory.render?.(
            TextAreaVariantsStory.args as any,
            context,
          )}
          {IconButtonVariantsStory.render?.(
            IconButtonVariantsStory.args as any,
            context,
          )}
          {ToggleButtonMultipleStory.render?.(
            ToggleButtonMultipleStory.args as any,
            context,
          )}
        </div>
        {PaginationMainStory.render?.(PaginationMainStory.args as any, context)}
      </HvSimpleGrid>
    </>
  ),
};

export const Test6: StoryObj = {
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
  },
  render: (args, context: any) => (
    <>
      <HvSimpleGrid
        cols={3}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        {AppSwitcherMainStory.render?.(
          AppSwitcherMainStory.args as any,
          context,
        )}
        {AppSwitcherManyEntriesStory.render?.(
          AppSwitcherManyEntriesStory.args as any,
          context,
        )}
        {FileUploaderWithPreviewThumbnailsStory.render?.(
          FileUploaderWithPreviewThumbnailsStory.args as any,
          context,
        )}
      </HvSimpleGrid>
      <HvSimpleGrid
        cols={2}
        style={{
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        {BreadCrumbTestStory.render?.(BreadCrumbTestStory.args as any, context)}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {ActionBarMainStory.render?.(ActionBarMainStory.args as any, context)}
          {FooterCustomLabelsStory.render?.(
            FooterCustomLabelsStory.args as any,
            context,
          )}
          {GlobalActionsTestStory.render?.(
            GlobalActionsTestStory.args as any,
            context,
          )}
        </div>
      </HvSimpleGrid>
      <HvSimpleGrid
        cols={2}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        {BulkActionsTestStory.render?.(
          BulkActionsTestStory.args as any,
          context,
        )}
        {HeaderTestStory.render?.(HeaderTestStory.args as any, context)}
      </HvSimpleGrid>
    </>
  ),
};

export const Test7: StoryObj = {
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
  },
  render: (args, context: any) => (
    <>
      <HvSimpleGrid
        cols={2}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          {CarouselEmbeddedStory.render?.(
            CarouselEmbeddedStory.args as any,
            context,
          )}
          <div style={{ width: 650 }}>
            {CarouselActionsStory.render?.(
              CarouselActionsStory.args as any,
              context,
            )}
          </div>
        </div>
        {ColorPickerTestStory.render?.(
          ColorPickerTestStory.args as any,
          context,
        )}
      </HvSimpleGrid>
      <br />
      <br />
      <br />
      <HvSimpleGrid
        cols={4}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        {SectionTestStory.render?.(SectionTestStory.args as any, context)}
      </HvSimpleGrid>
    </>
  ),
};
