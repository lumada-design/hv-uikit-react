import { CardMediaProps, StandardProps } from "@material-ui/core";

export interface HvCardMediaProps extends StandardProps<CardMediaProps, HvCardMediaClassKey> {
  /**
   *  Used to define a string that labels the current element.
   */
  mediaAriaLabel?: string;
  /**
   *  Establishes relationships between objects and their label(s), and its value should be one or more element IDs.
   */
  mediaAriaLabelledBy?: string;
  /**
   *  Used to indicate the IDs of the elements that describe the object.
   */
  mediaAriaDescribedBy?: string;
  /**
   *  The title of the media.
   */
  mediaTitle?: string;
  /**
   *  The path to the image to show in the media slot.
   */
  mediaPath?: string;
  /**
   *  The height necessary to adjust the media container to the image.
   */
  mediaHeight?: number;
  /**
   *  The function that will be executed when this section is clicked.
   */
  onClickAction?: (event: MouseEvent) => void;
}

export type HvCardMediaClassKey = "mediaContainer" | "media";

export default function HvCardMedia(props: HvCardMediaProps): JSX.Element | null;
