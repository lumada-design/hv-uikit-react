import { StandardProps } from "@material-ui/core";
import { HvTypographyProps } from "../../../Typography";

export type HvLabelProps = StandardProps<HvTypographyProps, HvLabelClassKey>

export type HvLabelClassKey = "root";

export default function HvUserPreferencesGroup(props: HvLabelProps): JSX.Element | null;
