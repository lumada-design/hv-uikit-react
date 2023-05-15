import { getClasses } from "@core/utils";

export interface HvTagsInputClasses {
  /** Styles applied to the input element. */
  input?: string;
  /** Styles applied to the list item gutters. */
  listItemGutters?: string;
  /** Styles applied to the list item element. */
  listItemRoot?: string;
  /** Styles applied to the root container of the textarea. */
  root?: string;
  /** Styles applies to the tag root. */
  chipRoot?: string;
  /** Style applied to the root when resizable is `true`. */
  disabled?: string;
  /** Style applied to the root when resizable is `true`. */
  resizable?: string;
  /** Style applied to the root when invalid. */
  invalid?: string;
  /** Styles applied to text area container that holds the label, description and counter. */
  labelContainer?: string;
  /** Styles applied to the label element. */
  label?: string;
  /** Styles applied to the label element. */
  description?: string;
  /** Style applied on the character counter. */
  characterCounter?: string;
  /** Styles applied to the tags list container element. */
  tagsList?: string;
  /** Styles applied to the tag input container element. */
  tagInputContainerRoot?: string;
  /** Styles applied to the tag input element. */
  tagInputRoot?: string;
  /** Styles applied to a tag element when selected */
  tagSelected?: string;
  /** Styles applied to the input element border. */
  tagInputBorderContainer?: string;
  /** Styles applied to the input element when focused. */
  tagInputRootFocused?: string;
  /** Styled applied to the input element when empty */
  tagInputRootEmpty?: string;
  /** Styles applied to the container when in single line mode. */
  singleLine?: string;
  /** Styles applied to the tags list when an error occurred. */
  error?: string;
  /** Styles applied to the input extension shown when the suggestions list is visible. */
  inputExtension?: string;
  /** Styles applied to the container of the suggestions list. */
  suggestionsContainer?: string;
  /** Styles applied to the suggestions list. */
  suggestionList?: string;
}

const classKeys: (keyof HvTagsInputClasses)[] = [
  "input",
  "listItemGutters",
  "listItemRoot",
  "root",
  "chipRoot",
  "disabled",
  "resizable",
  "invalid",
  "labelContainer",
  "label",
  "description",
  "characterCounter",
  "tagsList",
  "tagInputContainerRoot",
  "tagInputRoot",
  "tagSelected",
  "tagInputBorderContainer",
  "tagInputRootFocused",
  "tagInputRootEmpty",
  "singleLine",
  "error",
  "inputExtension",
  "suggestionsContainer",
  "suggestionList",
];

const tagsInputClasses = getClasses(classKeys, "HvTagsInput");

export default tagsInputClasses;
