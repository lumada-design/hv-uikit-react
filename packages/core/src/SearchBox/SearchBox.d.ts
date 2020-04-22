import { StandardProps } from "@material-ui/core";
import { HvInputProps } from "../Input";

export interface HvSearchBoxProps
  extends StandardProps<HvInputProps, HvSearchBoxClassKey, "onSubmit" | "onChange"> {
  /**
   * The function that will be executed on Enter, allows checking the value state,
   * it receives the value or event+value.
   */
  onSubmit?: (event: Event, value: string) => void;
  /**
   * The function that will be executed when the searchbox changes,
   * it receives the searchbox value
   */
  onChange?: (event: Event, value: string) => void;
}

export type HvSearchBoxClassKey = "root";

export default function HvSearchBox(props: HvSearchBoxProps): JSX.Element | null;
