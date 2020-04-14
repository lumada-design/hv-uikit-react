import React, { FormEvent } from "react";
import { CardProps, StandardProps } from "@material-ui/core";
import { HvCardFooterCommonProps } from "./Footer";
import { HvCheckBoxProps } from "../Selectors/CheckBox";
import { HvSemanticColorKeys } from "..";

export interface HvCardProps
  extends StandardProps<CardProps, HvCardClassKey>,
    HvCardFooterCommonProps {
  /**
   * Extra properties to be passed element used to represent the clickable default card.
   */
  cardButtonProps?: Object;
  /**
   * Extra properties to be passed element used to represent the default header card.
   */
  headerProps?: Object;
  /**
   * Extra properties to be passed element used to represent the default media element.
   */
  mediaProps?: Object;
  /**
   * Extra properties to be passed element used to represent the default footer card.
   */
  footerProps?: Object;
  /**
   * Extra properties to be passed element used to represent the default content card.
   */
  contentProps?: Object;
  /**
   *  The renderable content inside the title slot of the header.
   */
  headerTitle?: React.ReactNode;
  /**
   *  The renderable content inside the subheader slot of the header.
   */
  subheader?: React.ReactNode;
  /**
   *  The renderable content inside the icon slot of the header.
   */
  icon?: React.ReactNode;
  /**
   *  The renderable content inside the body of the card.
   */
  innerCardContent?: React.ReactNode;
  /**
   *  The path to the image to show in the media slot.
   */
  mediaPath?: string;
  /**
   *  The title of the media.
   */
  mediaTitle?: string;
  /**
   *  The height necessary to adjust the media container to the image.
   */
  mediaHeight?: number;
  /**
   *  Used to define a string that labels the media element.
   */
  mediaAriaLabel?: string;
  /**
   *  Establishes relationships between the media and it's label(s), its value should be one or more element IDs.
   */
  mediaAriaLabelledBy?: string;
  /**
   *  Used to indicate the IDs of the elements that describe the media element.
   */
  mediaAriaDescribedBy?: string;
  /**
   *  The border color at the top of the card. Must be one of palette semantic colors. To set another color, the borderTop should be override.
   */
  semantic?: "sema0" | HvSemanticColorKeys;
  /**
   *  Removes the header for the default card.
   */
  noHeader?: boolean;
  /**
   *  Removes the footer for the default card.
   */
  noFooter?: boolean;
  /**
   *  allows selecting on click action.
   *  only works for the default card.
   */
  selectOnClickAction?: boolean;
  /**
   *  The function that will be executed when the card is selected.
   */
  onChange?: (event: FormEvent<HTMLDivElement>) => void | undefined;
  /**
   * If `true` the checkbox is selected, if set to `false` the checkbox is not selected.
   * note: if this value is specified the state of the checkbox must be managed
   */
  checked?: boolean;
  /**
   * Properties to be passed onto the checkbox component, the values of the object are equivalent to the
   * HvCheckbox API.
   */
  checkBoxProps?: HvCheckBoxProps;
}

export type HvCardClassKey =
  | HvSemanticColorKeys
  | "root"
  | "cardContainer"
  | "cardContainerSelected"
  | "sema0"
  | "semanticSelected"
  | "semanticContainer"
  | "cardOutLine"
  | "upperAreaReference"
  | "upperAreaSelectable"
  | "selectable"
  | "selected";

export default function HvCard(props: HvCardProps): JSX.Element | null;
