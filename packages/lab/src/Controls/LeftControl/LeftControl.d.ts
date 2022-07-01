import { StandardProps } from "@material-ui/core";
import { HvInputProps } from "@hitachivantara/uikit-react-core";

export type HvLeftControlClassKey = "root";

export interface HvLeftControlProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvLeftControlClassKey> {
  /** Children to be rendered. */
  id?: string;
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * if `true` the hide sort by dropdown is not rendered
   */
  hideSearch?: boolean;
  /**
   * placeholder of the input
   */
  placeholder?: string;
  /**
   * Callback called when a search action occurs
   */
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  /**
   * Extra props passed to input
   */
  searchProps?: HvInputProps;
}

export default function HvLeftControl(props: HvLeftControlProps): JSX.Element | null;