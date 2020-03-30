import { CardMediaProps, StandardProps } from "@material-ui/core";

export interface HvCardMediaProps extends StandardProps<CardMediaProps, HvCardMediaClassKey> {
  /**
   * Extra properties passed to the media element.
   */
  mediaProps?: object;
  /**
   *  The title of the media.
   */
  title?: string;
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

export type HvCardMediaClassKey = "root" | "media";

export default function HvCardMedia(props: HvCardMediaProps): JSX.Element | null;
